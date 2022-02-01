

const Service = require('egg').Service;
const { Op } = require('sequelize');


class MaterialService extends Service {

  async getMaterialList({ dramaId, dramaChapterId }) {
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
    query.where = where;
    const materialQueryList = await ctx.modelmysql.DramaMaterial.findAll(query);
    return materialQueryList;
  }

  async createMaterial(data) {
    const ctx = this.ctx;
    const query = { ...data };
    const material = await ctx.modelmysql.DramaMaterial.create(query);
    return material;
  }

  async updateMaterial(data) {
    const ctx = this.ctx;
    const dramaMaterialId = data.dramaMaterialId;
    if (!dramaMaterialId) {
      return false;
    }
    const material = await ctx.modelmysql.DramaMaterial.findByPk(dramaMaterialId);
    if (!material) {
      return false;
    }
    await material.update(data);
    return material;
  }


}

module.exports = MaterialService;
