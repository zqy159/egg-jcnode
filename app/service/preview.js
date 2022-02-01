

const Service = require('egg').Service;
const { Op } = require('sequelize');
const constans = require('../constans/constans');
const lodash = require('lodash');

function groupByParent(list) {
  const groupByParentIdList = lodash.groupBy(list, 'parentId');
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

function groupConcat(chapterList, list) {
  const groupByChapterList = lodash.groupBy(list, 'dramaChapterId');
  const resultData = chapterList.map(item => {
    return {
      ...item,
      infoData: groupByChapterList[item.dramaChapterId] || [],
    };
  });
  return resultData;
}
class PrevicwService extends Service {

  async getUploadContent({ dramaId }) {
    const { ctx, service } = this;
    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };
    // 封页
    const drama = await ctx.modelmysql.Drama.findByPk(dramaId);
    // 目录

    const basicChapterList = await ctx.modelmysql.BasicDramaChapter.findAll({
      attributes: ['basicDramaChapterName', 'content'],
      where,
    });
    const roleList = await ctx.modelmysql.DramaRole.findAll({ attributes: ['dramaRoleName', 'dramaRoleId', 'sex', 'age', 'desc'], where });

    // 角色
    const chapterContentList = await ctx.modelmysql.DramaChapterContent.findAll({
      raw: true,
      where,
    });
    const list = lodash.groupBy(chapterContentList, 'roleId');

    const roleContentList = roleList.map(item => {
      return {
        name: item.dramaRoleName,
        // dataContent: groupByParent(list[item.dramaRoleId]),
        dataContent: constans.getRoleHtml({ role: item, chapterContentData: groupByParent(list[item.dramaRoleId]) }),
      };
    });


    // 章节内容列表
    const basicChapterContentList = basicChapterList.map(item => {
      return {
        name: item.basicDramaChapterName,
        dataContent: item.content,
      };
    });
    // 章节设计
    const query = {
      raw: true,
      where,
    };
    const dramaChapterList = await ctx.modelmysql.DramaChapter.findAll(query);
    const timeLineList = await ctx.modelmysql.DramaTimeLine.findAll(query);
    const materialList = await ctx.modelmysql.DramaMaterial.findAll(query);
    const timeLineData = groupByParent(groupConcat(dramaChapterList, timeLineList));
    const materialData = groupByParent(groupConcat(dramaChapterList, materialList));

    const previewAllData = [
      {
        name: '封页',
        dataContent: constans.coverPage(
          drama
        ),
      },
      {
        name: '目录',
        dataContent: constans.cataloguePage(
          { basicChapterList, roleList }
        ),
      },
      ...basicChapterContentList,
      {
        name: '章节设计',
        dataContent: constans.chapterDesign(
          { dramaChapterList }
        ),
      },
      ...roleContentList,
      {
        name: '时间线',
        dataContent: constans.getTimeLineHtml(
          { timeLineData }
        ),
      },
      {
        name: '素材',
        dataContent: constans.getMaterialHtml(
          { materialData }
        ),
      },
    ];
    return previewAllData;
  }
}

module.exports = PrevicwService;
