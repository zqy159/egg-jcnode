

const validator = require('validator');
const Controller = require('egg').Controller;
const application = require('../extend/application');
// const omit = require('lodash/omit');

// const helper = require()

class DramaController extends Controller {
  async getDramaList() {
    const { ctx, service } = this;
    const { user } = ctx.session;
    const limit = ctx.helper.toInt(ctx.query.pageSize);
    const currentPage = ctx.helper.toInt(ctx.query.currentPage);
    const dramaName = ctx.query.dramaName;
    const state = ctx.query.state;
    console.log(user.id, dramaName);
    const dramaTableList = await service.drama.getDramaList({
      limit,
      currentPage,
      dramaName,
      state,
      userId: user.id,
    });
    if (!dramaTableList) {
      ctx.body = application.responseSuccess({
        message: '列表获取失败',
      });
    }
    ctx.body = application.responseSuccess({
      message: '列表获取成功',
      data: dramaTableList,
    });
  }

  async getDramaDetail() {
    const { ctx, service } = this;
    const { user } = ctx.session;
    const { dramaId } = ctx.query;
    const dramaDetail = await service.drama.getDramaDetail({
      dramaId,
      userId: user.id,
    });
    ctx.body = application.responseSuccess({
      message: '列表获取成功',
      data: dramaDetail,
    });

  }

  async saveDarma() {
    const { ctx, service } = this;

    const { user } = ctx.session;

    const dramaId = ctx.request.body.dramaId;
    console.log(ctx.request.body.dramaName, 'ctx.request.body.dramaName');
    const dramaName = validator.trim(ctx.request.body.dramaName + '' || '');
    const parms = { ...ctx.request.body, userId: user.id };
    // console.log(user);
    // return;
    // const themeTag = validator.trim(ctx.request.body.themeTag || '');
    // const dramaTypeTag = validator.trim(ctx.request.body.dramaTypeTag || '');
    if (!dramaName) {
      ctx.body = application.responseError({
        message: '剧本名不存在',
      });
      return;
    }
    let drama;
    if (dramaId) {
      drama = await service.drama.updateDrama(parms);
    } else {

      drama = await service.drama.createDrama(parms);
      if (drama) {
        await service.drama.createDefaultBasicDramaChapter(drama.dramaId);
      }
    }

    if (!drama) {
      ctx.body = application.responseError({
        message: '保存失败',
      });
      return;
    }

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: drama,
    });
    return;
  }

  async updateDramaState() {
    const { ctx, service } = this;
    const dramaId = ctx.request.body.dramaId;
    const state = ctx.request.body.state;
    console.log(34234234234);
    if (!dramaId) {
      ctx.body = application.responseError({
        message: '剧本ID不存在',
      });
      return;
    }
    const result = await service.drama.updateDramaState({ dramaId, state });
    console.log(result, 324234234);
    ctx.body = application.responseSuccess({
      message: '更新成功',
    });
  }

  async getAllDramaChapterList() {
    const { ctx, service } = this;
    const { dramaId } = ctx.query;
    if (!dramaId) {
      ctx.body = application.responseError({
        message: '剧本ID不存在',
      });
      return;
    }
    const dramaChapterList = await service.drama.getAllDramaChapterList(
      dramaId
    );
    if (!dramaChapterList) {
      ctx.body = application.responseError({
        message: '列表获取失败',
      });
      return;
    }
    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        dramaId,
        ...dramaChapterList,
      },
    });
  }
  async getDramaBasicInfo() {
    const { ctx, service } = this;
    const dramaId = ctx.query.dramaId;
    const drama = await service.drama.getDramaBasicInfo(
      dramaId
    );
    if (!drama) {
      ctx.body = application.responseError({
        message: '当前剧本不存在',
      });
      return;
    }
    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        ...drama,
      },
    });
  }

  async getBasicDramaChapterList() {
    const { ctx, service } = this;
    const dramaId = ctx.query.dramaId;
    const dramaChapterList = await service.drama.getBasicDramaChapterList(
      dramaId
    );
    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        dramaId,
        ...dramaChapterList,
      },
    });
  }

  async getBasicDramaChapterDetail() {
    const { ctx, service } = this;
    const dramaId = ctx.query.dramaId;
    const basicDramaChapterId = ctx.query.basicDramaChapterId;
    const basicDramaChapterDetail = await service.drama.getBasicDramaChapterDetail(
      dramaId,
      basicDramaChapterId
    );
    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: basicDramaChapterDetail,
    });
  }

  async getDramaChapterDetail() {
    const { ctx, service } = this;
    const { dramaId, dramaChapterId, roleId, parentId } = ctx.query;

    const dramaChapterDetail = await service.drama.getDramaChapterDetail(
      dramaId,
      dramaChapterId,
      roleId,
      parentId
    );
    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: dramaChapterDetail,
    });
  }

  async getDramaChapterList() {
    const { ctx, service } = this;
    const { dramaId, parentId, roleId } = ctx.query;
    const dramaChapterList = await service.drama.getDramaChapterList(
      dramaId, roleId, parentId
    );

    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        dramaId,
        list: dramaChapterList,
      },
    });
  }
  async getDramaChapterMappingList() {
    const { ctx, service } = this;
    const { dramaId, parentId } = ctx.query;
    const dramaChapterMappingList = await service.drama.getDramaChapterMappingList(
      dramaId, parentId
    );

    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        dramaId,
        list: dramaChapterMappingList,
      },
    });
  }
  async saveBasicDramaChapter() {
    const { ctx, service } = this;
    const { basicDramaChapterId, dramaId, basicDramaChapterName } =
      ctx.request.body;
    const name = validator.trim(basicDramaChapterName + '' || '');
    if (!dramaId) {
      ctx.body = application.responseError({
        message: '剧本ID不存在',
      });
      return;
    }
    let basicDramaChapter;
    if (basicDramaChapterId) {
      basicDramaChapter = await service.drama.updateBasicDramaChapter(
        ctx.request.body
      );
    } else {
      if (!name) {
        ctx.body = application.responseError({
          message: '常规剧本名不存在',
        });
        return;
      }
      basicDramaChapter = await service.drama.createBasicDramaChapter(
        ctx.request.body
      );
    }

    if (!basicDramaChapter) {
      ctx.body = application.responseError({
        message: '保存失败',
      });
      return;
    }

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: basicDramaChapter,
    });
    return;
  }
  async saveDramaGroupChapter() {
    const { ctx, service } = this;
    const dramaGroupChapter = await service.drama.createDramaGroupChapter(ctx.request.body);

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: dramaGroupChapter,
    });
    return;

  }
  async saveDramaChapter() {
    const { ctx, service } = this;
    const { dramaChapterId, dramaId, dramaChapterName } =
      ctx.request.body;
    const name = validator.trim(dramaChapterName || '');
    if (!dramaId) {
      ctx.body = application.responseError({
        message: '剧本ID不存在',
      });
      return;
    }

    let dramaChapter;
    if (dramaChapterId) {
      dramaChapter = await service.drama.updateDramaChapter(ctx.request.body);
    } else {
      if (!name) {
        ctx.body = application.responseError({
          message: '章节剧本名不存在',
        });
        return;
      }
      dramaChapter = await service.drama.createDramaChapter(ctx.request.body);
    }

    if (!dramaChapter) {
      ctx.body = application.responseError({
        message: '保存失败',
      });
      return;
    }

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: dramaChapter,
    });
    return;
  }
  async uploadImage() {
    const { ctx } = this;
    // 启用service
    const file = ctx.request.files[0];
    console.log(ctx.request.files[0]);
    // ctx.body = {
    //   code: 0,
    //   data: [{
    //     name: file.filename,
    //     url: file.filepath,
    //   }],
    // };
  }


}

module.exports = DramaController;
