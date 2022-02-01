

const Service = require('egg').Service;
const { Op } = require('sequelize');
const lodash = require('lodash');


class ClueService extends Service {

  async getCluePageList({ currentPage, limit, clueName }) {
    const ctx = this.ctx;
    let query = { order: [['updatedAt', 'DESC']] };
    const offset = currentPage * limit;
    if (offset && limit) {
      query = Object.assign(query, { limit, offset });
    }
    const where = {
      state: {
        [Op.ne]: 2,
      },
    };
    if (clueName) {
      where.clueName = {
        [Op.like]: `%${clueName}%`,
      };
    }
    query = Object.assign(query, { where });
    const clueTableList = await ctx.modelmysql.DramaChapterClue.findAndCountAll(query);
    if (!clueTableList) {
      return false;
    }
    const { count, rows } = clueTableList;

    return {
      total: count,
      list: rows,
    };
  }


  async createClue(data) {
    const ctx = this.ctx;
    const parentId = data.parentId || 0;
    const query = { ...data, parentId };
    const clue = await ctx.modelmysql.DramaChapterClue.create(query);
    return clue;
  }

  async updateClue(data) {
    const ctx = this.ctx;
    const clueId = data.clueId;
    if (!clueId) {
      return false;
    }
    const clue = await ctx.modelmysql.DramaChapterClue.findByPk(clueId);
    if (!clue) {
      return false;
    }
    await clue.update(data);
    return clue;
  }


  async getClueList({ dramaId, dramaChapterId, parentId }) {
    const ctx = this.ctx;
    const query = { raw: true };
    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };
    if (dramaChapterId) {
      where.dramaChapterId = dramaChapterId;
    }
    if (parentId) {
      where[Op.or] = [{ parentId }, { clueId: parentId }];
    }
    query.where = where;
    const clueGroupQueryList = await ctx.modelmysql.DramaChapterClue.findAll(query);
    const groupByParentIdList = lodash.groupBy(clueGroupQueryList, 'parentId');
    const baseList = groupByParentIdList['0'];
    const clueGroupList = baseList && Array.isArray(baseList) && baseList.map(item => {
      if (groupByParentIdList[item.clueId]) {
        item.children = groupByParentIdList[item.clueId];
      } else {
        item.children = [];
      }
      return item;
    }) || [];
    return clueGroupList;
  }


  async updateClueGroupState({ clueId, state }) {
    const ctx = this.ctx;
    if (!clueId) {
      return false;
    }
    const clue = await ctx.modelmysql.DramaChapterClue.findByPk(clueId);
    if (!clue) {
      return false;
    }
    await clue.update({ state });
    if (clue.parentId === 0) {
      await ctx.modelmysql.DramaChapterClue.update({ state }, {
        where: {
          parentId: clueId,
        },
      });
    }
    return clue;
  }
}

module.exports = ClueService;
