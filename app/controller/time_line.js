const Controller = require('egg').Controller;
const application = require('../extend/application');

class TimeLineController extends Controller {
  async saveTimeLine() {
    const { ctx, service } = this;
    const { dramaTimeLineId } = ctx.request.body;

    // 如果parentId存在则代表线索，不存在则代表线索组
    let timeLine;
    console.log(ctx.request.body, 'hhh');
    if (dramaTimeLineId) {
      timeLine = await service.timeLine.updateTimeLine(ctx.request.body);
    } else {
      timeLine = await service.timeLine.createTimeLine(ctx.request.body);
    }

    if (!timeLine) {
      ctx.body = application.responseError({
        message: '保存失败',
      });
      return;
    }

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: timeLine,
    });
    return;
  }

  async getTimeLineList() {
    const { ctx, service } = this;
    const dramaId = ctx.query.dramaId;
    const dramaChapterId = ctx.query.dramaChapterId;
    const timeLineList = await service.timeLine.getTimeLineList(
      { dramaId, dramaChapterId, parentId: 0 }
    );

    ctx.body = application.responseSuccess({
      message: '获取成功',
      data: {
        list: timeLineList,
      },
    });
  }
  async dragTimeLine() {
    const { ctx, service } = this;
    const draggableData = JSON.parse(ctx.request.body.draggableData);

    await service.timeLine.updateTimeLine({
      dramaTimeLineId: draggableData[0].id,
      timetamp: draggableData[0].timetamp,
    });
    await service.timeLine.updateTimeLine({
      dramaTimeLineId: draggableData[1].id,
      timetamp: draggableData[1].timetamp,
    });

    ctx.body = application.responseSuccess({
      message: '保存成功',
    });
  }


}

module.exports = TimeLineController;
