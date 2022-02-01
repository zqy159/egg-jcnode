

const validator = require('validator');
const Controller = require('egg').Controller;
const application = require('../extend/application');
// const omit = require('lodash/omit');

// const helper = require()

class ClueController extends Controller {
  async getCluePageList() {
    const { ctx, service } = this;
    const limit = ctx.helper.toInt(ctx.query.pageSize);
    const currentPage = ctx.helper.toInt(ctx.query.currentPage);
    const clueName = ctx.query.clueName;
    const clueTableList = await service.clue.getCluePageList({
      limit,
      currentPage,
      clueName,
    });
    if (!clueTableList) {
      ctx.body = application.responseError({
        message: '列表获取失败',
      });
    }
    ctx.body = application.responseSuccess({
      message: '列表获取成功',
      data: clueTableList,
    });
  }

  async saveClue() {
    const { ctx, service } = this;
    const { clueName, clueId, dramaChapterId, clueType, desc, parentId } = ctx.request.body;

    // 如果parentId存在则代表线索，不存在则代表线索组
    if (parentId) {
      if (!clueName || !clueId || !dramaChapterId || !clueType || !desc) {
        ctx.body = application.responseError({
          message: '参数错误',
        });
      }
    }

    let clue;
    if (clueId) {
      clue = await service.clue.updateClue(ctx.request.body);
    } else {
      clue = await service.clue.createClue(ctx.request.body);
    }

    if (!clue) {
      ctx.body = application.responseError({
        message: '保存失败',
      });
      return;
    }

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: clue,
    });
    return;
  }

  async getClueGroupList() {
    const { ctx, service } = this;
    const dramaId = ctx.query.dramaId;
    const dramaChapterId = ctx.query.dramaChapterId;
    const clueChapterList = await service.clue.getClueList(
      { dramaId, dramaChapterId, parentId: 0 }
    );

    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        ...clueChapterList,
      },
    });
  }

  async getClueListByGroupId() {
    const { ctx, service } = this;
    const dramaId = ctx.query.dramaId;
    const dramaChapterId = ctx.query.dramaChapterId;
    const parentId = ctx.query.parentId;
    const clueChapterList = await service.clue.getClueList(
      { dramaId, dramaChapterId, parentId }
    );
    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        ...clueChapterList,
      },
    });
  }

  async updateClueGroupState() {
    const { ctx, service } = this;
    const { clueId, state } =
      ctx.request.body;
    const clue = await service.clue.updateClueGroupState(
      { clueId, state }
    );
    if (!clue) {
      ctx.body = application.responseError({
        message: '更新失败',
      });
      return;
    }
    ctx.body = application.responseSuccess({
      message: '更新成功',
    });
  }

}

module.exports = ClueController;
