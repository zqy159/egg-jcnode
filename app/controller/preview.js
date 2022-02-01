const application = require('../extend/application');
const Controller = require('egg').Controller;
const lodash = require('lodash');
const constans = require('../constans/constans');
const { Op } = require('sequelize');

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

class UserController extends Controller {
  async getAllPreviewContent() {
    const { ctx, service } = this;
    const { dramaId } = ctx.query;
    const dramaChapterList = await service.preview.getUploadContent({ dramaId });
    ctx.body = application.responseSuccess({
      message: '请求预览所有内容',
      data: dramaChapterList,
    });
  }
  async getPreview() {
    const { ctx, service } = this;
    const { state, dramaId } = ctx.query;

    const where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };

    // 封页
    if (state === '0') {
      const drama = await ctx.modelmysql.Drama.findByPk(dramaId);
      ctx.body = application.responseSuccess({
        message: '列表封页成功',
        data: constans.coverPage(
          drama
        ),
      });
      return;
    }
    // 目录
    if (state === '1') {
      const basicChapterList = await ctx.modelmysql.BasicDramaChapter.findAll({ attributes: ['basicDramaChapterName'], where });
      const roleList = await ctx.modelmysql.DramaRole.findAll({ attributes: ['dramaRoleName'], where });
      ctx.body = application.responseSuccess({
        message: '列表封页成功',
        data: constans.cataloguePage(
          { basicChapterList, roleList }
        ),
      });
    }

    // 章节设计
    if (state === '2') {
      const dramaChapterList = await service.drama.getDramaChapterList(dramaId);
      ctx.body = application.responseSuccess({
        message: '列表封页成功',
        // data: dramaChapterList,
        data: constans.chapterDesign(
          { dramaChapterList }
        ),
      });
    }
    // 时间线
    if (state === '3') {
      const query = {
        raw: true,
        where,
      };
      const dramaChapterList = await ctx.modelmysql.DramaChapter.findAll(query);
      const timeLineList = await ctx.modelmysql.DramaTimeLine.findAll(query);
      const timeLineData = groupByParent(groupConcat(dramaChapterList, timeLineList));
      ctx.body = application.responseSuccess({
        message: '列表封页成功',
        // data: timeLineData,
        data: constans.getTimeLineHtml(
          { timeLineData }
        ),
      });
    }
    // 获取素材
    if (state === '5') {
      const query = {
        raw: true,
        where,
      };
      const dramaChapterList = await ctx.modelmysql.DramaChapter.findAll(query);
      const materialList = await ctx.modelmysql.DramaMaterial.findAll(query);
      const materialData = groupByParent(groupConcat(dramaChapterList, materialList));

      ctx.body = application.responseSuccess({
        message: '列表封页成功',
        // data: list,
        data: constans.getMaterialHtml(
          { materialData }
        ),
      });
    }

    // 获取角色对应的章节信息
    if (state === '4') {
      const roleId = ctx.query.roleId;
      if (roleId) {
        const query = {
          raw: true,
          where,
        };
        const chapterContentList = await ctx.modelmysql.DramaChapterContent.findAll(query);
        const roleContentList = lodash.groupBy(chapterContentList, 'roleId')[roleId];

        const chapterContentData = groupByParent(roleContentList);
        const role = await ctx.modelmysql.DramaRole.findByPk(roleId);

        ctx.body = application.responseSuccess({
          message: '列表封页成功',
          // data: chapterContentData,
          data: constans.getRoleHtml(
            { role, chapterContentData }
          ),
        });
      }

    }


  }
}

module.exports = UserController;
