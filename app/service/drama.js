

const Service = require('egg').Service;
const { Op } = require('sequelize');
const constans = require('../constans/constans');
const lodash = require('lodash');

class DramaService extends Service {

  async getDramaList({ currentPage, limit, dramaName, state, userId }) {
    const ctx = this.ctx;
    let query = { order: [['updatedAt', 'DESC']] };
    const offset = currentPage * limit;
    if (offset && limit) {
      query = Object.assign(query, { limit, offset });
    }
    const where = {
      state: state ? state : {
        [Op.ne]: 2,
      },
      userId,

    };
    if (dramaName) {
      where.dramaName = {
        [Op.like]: `%${dramaName}%`,
      };
    }
    query = Object.assign(query, { where });
    console.log(query);
    const dramaTableList = await ctx.modelmysql.Drama.findAndCountAll(query);
    if (!dramaTableList) {
      return false;
    }
    const { count, rows } = dramaTableList;

    return {
      total: count,
      list: rows,
    };
  }

  async getDramaDetail({ dramaId, userId }) {
    const ctx = this.ctx;
    let query = {};
    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
      userId,
    };

    query = Object.assign(query, { where });
    console.log(query);
    const drama = await ctx.modelmysql.Drama.findOne(query);
    console.log(drama, 'hhhh');
    return drama;
  }

  async getDramaBasicInfo(dramaId) {
    const ctx = this.ctx;
    if (!dramaId) {
      return false;
    }
    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };
    const drama = await ctx.modelmysql.Drama.findAll({ where });
    if (!drama || (Array.isArray(drama) && drama.length === 0)) {
      return false;
    }
    return drama;
  }
  async getAllDramaChapterList(dramaId, roleId) {
    const isEnable = await this.getDramaBasicInfo(dramaId);
    if (!isEnable) {
      return false;
    }
    const basicDramaChapterList = await this.getBasicDramaChapterList(dramaId);
    const dramaChapterList = await this.getDramaChapterList(dramaId, roleId);
    return {
      basicDramaChapterList,
      dramaChapterList,
    };
  }

  async createDrama(data) {
    const { dramaName } = data;
    if (!dramaName) {
      return false;
    }
    const ctx = this.ctx;
    const drama = await ctx.modelmysql.Drama.create(data);

    console.log(drama);
    const defaultRoleMap = constans.defaultRole();
    // 添加默认角色
    const bulkRoleQuery = defaultRoleMap.map(item => {
      return {
        dramaId: drama.dramaId,
        ...item,
      };
    });
    await ctx.modelmysql.DramaRole.bulkCreate(bulkRoleQuery);
    const query = {
      order: [['updatedAt', 'DESC']], where: {
        dramaId: drama.dramaId,
        state: {
          [Op.ne]: 2,
        },
      },
    };
    // 计算数量
    const roleNumber = await ctx.modelmysql.DramaRole.count(query);
    await drama.update({ dramaId: drama.dramaId, roleNum: roleNumber });

    return drama;
  }

  async updateDrama(data) {
    const ctx = this.ctx;
    const dramaId = data.dramaId;
    if (!dramaId) {
      return false;
    }
    const drama = await ctx.modelmysql.Drama.findByPk(dramaId);
    if (!drama) {
      return false;
    }
    await drama.update(data);
    return drama;
  }

  async updateDramaState({ dramaId, state }) {
    const ctx = this.ctx;
    if (!dramaId) {
      return false;
    }
    const drama = await ctx.modelmysql.Drama.findByPk(dramaId);
    if (!drama) {
      return false;
    }
    const query = { state };
    await drama.update(query);
    await ctx.modelmysql.BasicDramaChapter.update(query, {
      where: {
        dramaId,
      },
    });
    await ctx.modelmysql.DramaChapter.update(query, {
      where: {
        dramaId,
      },
    });
    await ctx.modelmysql.DramaChapterClue.update(query, {
      where: {
        dramaId,
      },
    });
    return drama;
  }

  async createDefaultBasicDramaChapter(dramaId) {
    const ctx = this.ctx;
    const defaultChapterMap = constans.basicDramaChapterEnum();

    const bulkCreateQuery = Object.entries(defaultChapterMap).map(item => {
      return {
        dramaId,
        defaultType: item[0],
        basicDramaChapterName: item[1],
      };
    });
    const createResult = await ctx.modelmysql.BasicDramaChapter.bulkCreate(bulkCreateQuery);
    return createResult;
  }

  async getBasicDramaChapterList(dramaId) {
    const ctx = this.ctx;
    let query = {};
    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };
    query = Object.assign(query, { where });
    const basicDramaChapterList = await ctx.modelmysql.BasicDramaChapter.findAll(query);
    return basicDramaChapterList;
  }
  async getBasicDramaChapterDetail(dramaId, basicDramaChapterId) {
    const ctx = this.ctx;
    let query = {};
    const where = {
      dramaId,
      basicDramaChapterId,
      state: {
        [Op.ne]: 2,
      },
    };
    query = Object.assign(query, { where });
    const basicDramaChapterDetail = await ctx.modelmysql.BasicDramaChapter.findOne(query);
    return basicDramaChapterDetail;
  }

  async createBasicDramaChapter(data) {
    const { dramaId } = data;
    if (!dramaId) {
      return false;
    }
    const ctx = this.ctx;
    const basicDramaChapter = await ctx.modelmysql.BasicDramaChapter.create(data);
    return basicDramaChapter;
  }

  async updateBasicDramaChapter(data) {
    const ctx = this.ctx;
    const basicDramaChapterId = data.basicDramaChapterId;
    if (!basicDramaChapterId) {
      return false;
    }
    const basicDramaChapter = await ctx.modelmysql.BasicDramaChapter.findByPk(basicDramaChapterId);
    if (!basicDramaChapter) {
      return false;
    }
    await basicDramaChapter.update(data);
    return basicDramaChapter;
  }

  async getDramaChapterList(dramaId, parentId) {
    const ctx = this.ctx;
    let query = { raw: true };
    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };
    if (parentId) {
      where[Op.or] = [{ parentId }, { dramaChapterId: parentId }];
    }
    query = Object.assign(query, { where });
    const dramaChapterQueryList = await ctx.modelmysql.DramaChapter.findAll(query);
    const groupByParentIdList = lodash.groupBy(dramaChapterQueryList, 'parentId');
    const baseList = groupByParentIdList['0'];
    const dramaChapterList = baseList && Array.isArray(baseList) && baseList.map(item => {
      if (groupByParentIdList[item.dramaChapterId]) {
        item.children = groupByParentIdList[item.dramaChapterId];
      } else {
        item.children = [];
      }
      return item;
    }) || [];
    return dramaChapterList;
  }

  async createDramaChapter(data) {
    const { dramaId } = data;
    if (!dramaId) {
      return false;
    }
    const ctx = this.ctx;
    const parentId = data.parentId || 0;
    const query = { ...data, parentId };
    const dramaChapter = await ctx.modelmysql.DramaChapter.create(query);

    return dramaChapter;
  }

  async updateDramaChapterNumber(dramaId) {
    const ctx = this.ctx;
    const query = {
      order: [['updatedAt', 'DESC']], where: {
        dramaId,
        state: {
          [Op.ne]: 2,
        },
      },
    };
    const chapterNumber = await ctx.modelmysql.DramaChapter.count(query);
    const drama = await this.service.drama.updateDrama({ dramaId, chapterNum: chapterNumber });
    return drama;
  }

  async createDramaChapterContent(data) {
    const { dramaId } = data;
    if (!dramaId) {
      return false;
    }
    const ctx = this.ctx;
    const parentId = data.parentId || 0;
    const query = { ...data, parentId };
    const dramaChapter = await ctx.modelmysql.DramaChapterContent.create(query);
    return dramaChapter;
  }

  async createDramaGroupChapter(data) {
    const { dramaId, dramaChapterName, parentId } = data;
    const ctx = this.ctx;
    if (!dramaId) {
      return false;
    }
    let query = { raw: false, order: [['updatedAt', 'DESC']] };
    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };
    query = Object.assign(query, { where });

    const roleList = await ctx.modelmysql.DramaRole.findAndCountAll(query);
    const chapterGroup = [];


    const chapterList = await ctx.modelmysql.DramaChapter.create({
      dramaId,
      dramaChapterName,
      parentId: parentId || 0,
    });
    roleList.rows.forEach(roleItem => [
      chapterGroup.push({
        dramaId,
        roleId: roleItem.dramaRoleId,
        dramaChapterName,
        content: '',
        parentId: parentId || 0,
        dramaChapterId: chapterList.dramaChapterId,
      }),
    ]);

    const chapterGroupList = await ctx.modelmysql.DramaChapterContent.bulkCreate(chapterGroup);

    // 更改剧本表内的章节数量
    await this.updateDramaChapterNumber(data.dramaId);
    return chapterGroupList;
  }
  async getDramaChapterDetail(dramaId, dramaChapterId, roleId, parentId) {
    const ctx = this.ctx;
    let query = {};
    const where = {
      dramaId,
      dramaChapterId,
      roleId,
      state: {
        [Op.ne]: 2,
      },
    };
    query = Object.assign(query, { where });

    const dramaChapterDetail = await ctx.modelmysql.DramaChapterContent.findOne(query);
    // console.log(dramaChapterDetail, 'mmmmmm');
    // if (!dramaChapterDetail) {
    //   await ctx.modelmysql.DramaChapterContent.create({
    //     dramaId,
    //     roleId,
    //     dramaChapterName: '新建章节',
    //     parentId: parentId || 0,
    //     dramaChapterId,
    //   });

    //   dramaChapterDetail = await ctx.modelmysql.DramaChapterContent.findOne(query);
    // }
    return dramaChapterDetail;
  }

  async updateDramaChapter(data) {
    const ctx = this.ctx;
    const { dramaChapterContentId, dramaChapterId, state, dramaChapterName } = data;

    let dramaChapter;
    if (!dramaChapterId) {
      return false;
    }
    if (state && state === 2 || dramaChapterName) {
      // 删除和更改名称
      dramaChapter = await ctx.modelmysql.DramaChapter.findByPk(dramaChapterId);
    } else {
      // 更改章节内容
      if (!dramaChapterContentId) {
        return false;
      }
      dramaChapter = await ctx.modelmysql.DramaChapterContent.findByPk(dramaChapterContentId);
    }

    if (!dramaChapter) {
      return false;
    }
    await dramaChapter.update(data);
    if (state && state === 2) {
      await this.updateDramaChapterNumber(data.dramaId);
    }
    return dramaChapter;
  }

}

module.exports = DramaService;
