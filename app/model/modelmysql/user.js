
module.exports = (app, model) => {
  const DataTypes = app.Sequelize;
  const Model = model.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'f_physical_id',
      },
      cnName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        field: 'f_cn_name',
      },
      enName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        field: 'f_en_name',
      },
      phone: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: '',
        field: 'f_phone',
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: '',
        field: 'f_password',
      },
      wechat: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: '',
        field: 'f_wechat',
      },
      group: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: '',
        field: 'f_group',
      },
      avatar: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: '',
        field: 'f_avatar',
      },
      nickname: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: '',
        field: 'f_nickname',
      },
      email: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: '',
        field: 'f_email',
      },
      state: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'f_state',
      },
      property: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
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
    },
    {
      tableName: 't_user',
    }
  );

  Model.associate = function() {};

  return Model;
};
