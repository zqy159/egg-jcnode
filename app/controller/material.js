const Controller = require('egg').Controller;
const application = require('../extend/application');

class MaterialController extends Controller {
  async saveMaterial() {
    const { ctx, service } = this;
    const { dramaMaterialId } = ctx.request.body;

    // 如果parentId存在则代表线索，不存在则代表线索组
    let material;

    if (dramaMaterialId) {
      material = await service.material.updateMaterial(ctx.request.body);
    } else {
      material = await service.material.createMaterial(ctx.request.body);
    }

    if (!material) {
      ctx.body = application.responseError({
        message: '保存失败',
      });
      return;
    }

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: material,
    });
    return;
  }

  async getMaterialList() {
    const { ctx, service } = this;
    const dramaId = ctx.query.dramaId;
    const dramaChapterId = ctx.query.dramaChapterId;
    const materialList = await service.material.getMaterialList(
      { dramaId, dramaChapterId, parentId: 0 }
    );

    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        list: materialList,
      },
    });
  }
}

module.exports = MaterialController;
