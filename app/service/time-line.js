

const Service = require('egg').Service;
const { Op } = require('sequelize');


class TimeLineService extends Service {

  async getTimeLineList({ dramaId, dramaChapterId }) {
    const ctx = this.ctx;
    const query = { raw: true, order: [['timetamp', 'ASC']] };
    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };
    if (dramaChapterId) {
      where.dramaChapterId = dramaChapterId;
    }
    query.where = where;
    const timeLineQueryList = await ctx.modelmysql.DramaTimeLine.findAll(query);
    return timeLineQueryList;
  }

  async createTimeLine(data) {
    const ctx = this.ctx;
    const query = { ...data };
    console.log(query, 'xxxxxxxxxxx');
    const timeLines = await ctx.modelmysql.DramaTimeLine.create(query);
    // const timeLine = await timeLines.update({ dramaTimeLineId: timeLines.dramaTimeLineId, timetamp: timeLines.dramaTimeLineId * 100 });
    return timeLines;
  }

  async updateTimeLine(data) {
    const ctx = this.ctx;
    const dramaTimeLineId = data.dramaTimeLineId;
    console.log(data, 'nnnnn');
    if (!dramaTimeLineId) {
      return false;
    }

    const timeLine = await ctx.modelmysql.DramaTimeLine.findByPk(dramaTimeLineId);
    if (!timeLine) {
      return false;
    }
    await timeLine.update(data);
    return timeLine;
  }


}

module.exports = TimeLineService;
