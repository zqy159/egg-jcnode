const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const htmlDocx = require('html-docx-js');
const pathUrl = 'itmap.top';
// const pathUrl = 'localhost:7001';
const compressing = require('compressing');
const resolve = dir => path.join(__dirname, '../public', dir);
const delFile = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      // console.log('删除成功');
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        delFile(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    // 保留目录
    // fs.rmdirSync(path);
  }
};
class UploadController extends Controller {
  async uploadImage() {
    const { ctx } = this;
    // 启用service
    const file = ctx.request.files[0];
    const files = fs.readFileSync(file.filepath);
    const target = path.join(
      this.config.baseDir,
      `app/public/uploadImage/${file.filename}`
    );
    fs.writeFileSync(target, files);
    fs.unlinkSync(file.filepath);
    ctx.body = {
      errno: 0,
      data: {
        name: file.filename,
        url: `https://${pathUrl}/static/uploadImage/${file.filename}`,
      },
    };
  }
  async uploadWord() {
    const { ctx } = this;
    const content = ctx.request.body.content;
    const t = new Date().getTime();
    const target = path.join(
      this.config.baseDir,
      `app/public/uploadWord/${'word' + t + '.docx'}`
    );

    const converted = htmlDocx.asBlob(content);
    fs.writeFileSync(target, converted);
    ctx.body = {
      code: 0,
      data: {
        url:
          `https://${pathUrl}/static/uploadWord/${'word' + t + '.docx'}?t=` +
          new Date().getTime(),
      },
    };
  }
  async uploadPreviewDocx() {
    const { ctx, service } = this;
    const { dramaId } = ctx.request.body;
    const uploadContentList = await service.preview.getUploadContent({ dramaId });
    delFile(path.join(this.config.baseDir, 'app/public/storageWorld'));
    uploadContentList.forEach(item => {
      const target = path.join(
        this.config.baseDir,
        `app/public/storageWorld/${item.name + '.docx'}`
      );
      const converted = htmlDocx.asBlob(item.dataContent);

      fs.writeFileSync(target, converted, err => { });
    });
    const t = new Date().getTime();
    await compressing.zip
      .compressDir(resolve('storageWorld/'), resolve(`worldZip/worldFile${t}.zip`))
      .then(() => {
        console.log(`Tip: 文件压缩成功，已压缩至【${resolve(`worldZip/worldFile${t}.zip`)}】`);
      })
      .catch(err => {
        console.log('Tip: 压缩报错');
        console.error(err);
      });

    ctx.body = {
      code: 0,
      data: {
        url:
          `https://${pathUrl}/static/worldZip/worldFile${t}.zip?t=${t}`,
      },
    };
  }
  async uploadPackage() {
    const { ctx } = this;
    const file = ctx.request.files[0];


    const files = fs.readFileSync(file.filepath);
    const target = path.join(
      this.config.baseDir,
      `app/public/uploadPackage/${file.filename}`
    );
    fs.writeFileSync(target, files);
    fs.unlinkSync(file.filepath);
    ctx.body = {
      code: 0,
      data: {
        url:
          `https://${pathUrl}/static/uploadPackage/${file.filename}?t=` +
          new Date().getTime(),
      },
    };
  }
}

module.exports = UploadController;
