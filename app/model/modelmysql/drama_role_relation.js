/* indent size: 2 */

module.exports = (app, model) => {
  const DataTypes = app.Sequelize;

  const Model = model.define('t_drama_role_relation', {
    dramaRoleRelationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'f_physical_id',
    },
    dramaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_drama_id',
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_role_id',
    },
    roleRelationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_role_relation_id',
    },
    roleRelationType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '1',
      field: 'f_relation_type',
    },
    roleLineType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '1',
      field: 'f_line_type',
    },
    roleRelation: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      field: 'f_relation',
    },
    state: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_state',
    },
    property: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      field: 'f_property',
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'f_create_time',
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'f_update_time',
    },
  }, {
    tableName: 't_drama_role_relation',
  });

  Model.associate = function () {

  };

  return Model;
};
