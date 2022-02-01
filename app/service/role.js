

const Service = require('egg').Service;
const { Op } = require('sequelize');
const lodash = require('lodash');


class RoleService extends Service {

  async getDramaRolePageList({ currentPage, limit, dramaRoleName, dramaRoleIds, dramaId, raw = false }) {
    const ctx = this.ctx;
    if (!dramaId) {
      return false;
    }
    let query = { raw, order: [['updatedAt', 'DESC']] };
    const offset = currentPage * limit;
    if (offset && limit) {
      query = Object.assign(query, { limit, offset });
    }
    let where = {
      dramaId,
      state: {
        [Op.ne]: 2,
      },
    };
    if (dramaRoleIds && Array.isArray(dramaRoleIds)) {
      const queryRoleIds = {
        dramaRoleId: {
          [Op.in]: dramaRoleIds,
        },
      };
      where = Object.assign(where, queryRoleIds);
    }
    if (dramaRoleName) {
      const queryRoleIds = {
        clueName: {
          [Op.like]: `%${dramaRoleName}%`,
        },
      };
      where = Object.assign(where, queryRoleIds);
    }
    query = Object.assign(query, { where });
    const roleList = await ctx.modelmysql.DramaRole.findAndCountAll(query);
    if (!roleList) {
      return false;
    }
    const { count, rows } = roleList;

    return {
      total: count,
      list: rows,
    };
  }


  async getDramaRoleRelationList({ dramaId }) {
    const ctx = this.ctx;
    if (!dramaId) {
      return false;
    }
    const query = {
      order: [['updatedAt', 'DESC']], where: {
        dramaId,
        state: {
          [Op.ne]: 2,
        },
      },
    };
    const roleList = await ctx.modelmysql.DramaRoleRelation.findAndCountAll(query);
    if (!roleList) {
      return false;
    }
    const { count, rows } = roleList;

    return {
      total: count,
      list: rows,
    };
  }

  async createRole(data) {
    const ctx = this.ctx;
    const parentId = data.parentId || 0;
    const query = { ...data, parentId };
    const clue = await ctx.modelmysql.DramaRole.create(query);
    // 更改剧本表内的角色数量
    await this.updateDramaRoleNumber(data.dramaId);
    return clue;
  }

  async updateRole(data) {
    const ctx = this.ctx;
    const dramaRoleId = data.dramaRoleId;
    if (!dramaRoleId) {
      return false;
    }
    const role = await ctx.modelmysql.DramaRole.findByPk(dramaRoleId);
    if (!role) {
      return false;
    }
    await role.update(data);
    if (data.state === 2) {
      await this.updateDramaRoleNumber(data.dramaId);
    }
    return role;
  }

  async updateDramaRoleNumber(dramaId) {
    const ctx = this.ctx;
    const query = {
      order: [['updatedAt', 'DESC']], where: {
        dramaId,
        state: {
          [Op.ne]: 2,
        },
      },
    };
    const roleNumber = await ctx.modelmysql.DramaRole.count(query);

    const drama = await ctx.service.drama.updateDrama({ dramaId, roleNum: roleNumber });
    return drama;
  }

  async createDramaRoleRelation(data) {
    const ctx = this.ctx;
    const query = { ...data };
    const clue = await ctx.modelmysql.DramaRoleRelation.create(query);
    return clue;
  }

  async updateDramaRoleRelation(data) {
    const ctx = this.ctx;
    const dramaRoleRelationId = data.dramaRoleRelationId;
    if (!dramaRoleRelationId) {
      return false;
    }
    const role = await ctx.modelmysql.DramaRoleRelation.findByPk(dramaRoleRelationId);
    if (!role) {
      return false;
    }
    await role.update(data);
    return role;
  }

  async updateDramaRoleState({ dramaRoleId, state }) {
    const ctx = this.ctx;
    if (!dramaRoleId) {
      return false;
    }
    const role = await ctx.modelmysql.DramaRole.findByPk(dramaRoleId);
    if (!role) {
      return false;
    }
    await role.update({ state });
    await this.updateDramaRoleRelationStateByDramaRoleId({ dramaRoleId, state });
    return role;
  }

  async updateDramaRoleRelationStateByDramaRoleId({ dramaRoleId, state }) {
    const ctx = this.ctx;
    if (!dramaRoleId) {
      return false;
    }
    const query = {
      where: {
        [Op.or]: [{ roleId: dramaRoleId }, { roleRelationId: dramaRoleId }],
      },
    };
    const role = await ctx.modelmysql.DramaRoleRelation.update({ state }, query);
    if (!role) {
      return false;
    }
    return role;
  }

  async updateDramaRoleRelationStateByPk({ dramaRoleRelationId, state }) {
    const ctx = this.ctx;
    if (!dramaRoleRelationId) {
      return false;
    }
    const roleRelation = await ctx.modelmysql.DramaRoleRelation.findByPk(dramaRoleRelationId);
    if (!roleRelation) {
      return false;
    }
    await roleRelation.update({ state });
    if (!roleRelation) {
      return false;
    }
    return roleRelation;
  }
}

module.exports = RoleService;
