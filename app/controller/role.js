

const validator = require('validator');
const Controller = require('egg').Controller;
const application = require('../extend/application');
// const omit = require('lodash/omit');

// const helper = require()

class RoleController extends Controller {
  async getDramaRolePageList() {
    const { ctx, service } = this;
    const limit = ctx.helper.toInt(ctx.query.pageSize);
    const currentPage = ctx.helper.toInt(ctx.query.currentPage);
    const dramaRoleName = ctx.query.dramaRoleName;
    const dramaId = ctx.query.dramaId;
    if (!dramaId) {
      ctx.body = application.responseError({
        message: '剧本ID必须存在',
      });
      return;
    }
    const roleList = await service.role.getDramaRolePageList({
      ...ctx.query,
      limit,
      currentPage,
      dramaRoleName,
      dramaId,
    });

    if (!roleList) {
      ctx.body = application.responseError({
        message: '列表获取失败',
      });
      return;
    }
    ctx.body = application.responseSuccess({
      message: '列表获取成功',
      data: roleList,
    });
  }

  async getDramaRoleRelationList() {
    const { ctx, service } = this;
    const dramaId = ctx.query.dramaId;
    if (!dramaId) {
      ctx.body = application.responseError({
        message: '剧本ID必须存在',
      });
      return;
    }
    const roleRelationListQueryResult = await service.role.getDramaRoleRelationList({
      dramaId,
    });
    const roleRelationListJSON = JSON.parse(JSON.stringify(roleRelationListQueryResult));
    const roleRelationList = roleRelationListJSON && roleRelationListJSON.list || [];
    // const roleRelationIds = roleRelationList.map((item)=>{
    //   return item.dramaRoleId
    // })
    let roleRelationIds = roleRelationList.reduce((ids, item) => {
      ids.push(item.roleId);
      ids.push(item.roleRelationId);
      return ids;
    }, []);
    roleRelationIds = Array.from(new Set(roleRelationIds));
    const roleListQueryResult = await service.role.getDramaRolePageList({
      dramaId,
      raw: true,
      dramaRoleIds: roleRelationIds,
    });
    const roleList = roleListQueryResult.list;

    const roleRelationListRsp = [];
    roleRelationList.forEach(roleRelationItem => {
      const roleRelation = { ...roleRelationItem };
      roleList.forEach(roleItem => {
        if (roleRelationItem.roleId === roleItem.dramaRoleId) {
          roleRelation.roleName = roleItem.dramaRoleName;
        }
      });
      roleList.forEach(roleItem => {
        if (roleRelationItem.roleRelationId === roleItem.dramaRoleId) {
          roleRelation.roleRelationName = roleItem.dramaRoleName;
        }
      });
      roleRelationListRsp.push(roleRelation);
    });
    roleRelationListJSON.list = roleRelationListRsp;
    if (!roleRelationList) {
      ctx.body = application.responseError({
        message: '列表获取失败',
      });
      return;
    }
    ctx.body = application.responseSuccess({
      message: '列表获取成功',
      data: roleRelationListJSON,
    });
  }

  async saveDramaRole() {
    const { ctx, service } = this;
    const { dramaRoleId, dramaId, dramaRoleName, sex, roleType, age, desc } = ctx.request.body;
    if (!dramaId) {
      ctx.body = application.responseError({
        message: '剧本ID必须存在',
      });
      return;
    }
    let role;
    if (dramaRoleId) {
      role = await service.role.updateRole(ctx.request.body);
    } else {
      role = await service.role.createRole(ctx.request.body);
    }

    if (!role) {
      ctx.body = application.responseError({
        message: '保存失败',
      });
      return;
    }

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: role,
    });
    return;
  }

  async saveDramaRoleRelation() {
    const { ctx, service } = this;
    const { dramaRoleRelationId, dramaId } = ctx.request.body;
    if (!dramaId) {
      ctx.body = application.responseError({
        message: '剧本ID必须存在',
      });
      return;
    }
    let role;
    if (dramaRoleRelationId) {
      role = await service.role.updateDramaRoleRelation(ctx.request.body);
    } else {
      role = await service.role.createDramaRoleRelation(ctx.request.body);
    }

    if (!role) {
      ctx.body = application.responseError({
        message: '保存失败',
      });
      return;
    }

    ctx.body = application.responseSuccess({
      message: '保存成功',
      data: role,
    });
    return;
  }

  async updateDramaRoleState() {
    const { ctx, service } = this;
    const { dramaRoleId, state } =
      ctx.request.body;
    const role = await service.role.updateDramaRoleState(
      { dramaRoleId, state }
    );
    if (!role) {
      ctx.body = application.responseError({
        message: '更新失败',
      });
      return;
    }
    ctx.body = application.responseSuccess({
      message: '更新成功',
    });
  }

  async updateDramaRoleRelationState() {
    const { ctx, service } = this;
    const { dramaRoleRelationId, state } =
      ctx.request.body;
    const role = await service.role.updateDramaRoleRelationStateByPk(
      { dramaRoleRelationId, state }
    );
    if (!role) {
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

module.exports = RoleController;
