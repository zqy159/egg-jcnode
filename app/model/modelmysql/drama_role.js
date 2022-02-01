/* indent size: 2 */


module.exports = (app, model) => {
  const DataTypes = app.Sequelize;

  const Model = model.define('t_drama_role', {
    dramaRoleId: {
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
    dramaRoleName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      field: 'f_name',
    },
    enName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      field: 'f_en_name',
    },
    sex: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '1',
      field: 'f_sex',
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '20',
      field: 'f_age',
    },
    roleType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '1',
      field: 'f_role_type',
    },
    desc: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: '',
      field: 'f_desc',
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
    tableName: 't_drama_role',
  });

  Model.associate = function() {

  };

  return Model;
};
