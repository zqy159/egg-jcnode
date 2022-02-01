/* indent size: 2 */


module.exports = (app, model) => {
  const DataTypes = app.Sequelize;

  const Model = model.define('t_drama_chapter_content', {
    dramaChapterContentId: {
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
    dramaChapterId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_chapter_id',
    },
    dramaChapterName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      field: 'f_name',
    },
    parentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_parent_id',
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_role_id',
    },
    roleNmae: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      field: 'f_role_name',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      field: 'f_content',
    },
    weight: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: '',
      field: 'f_weight',
    },
    property: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      field: 'f_property',
    },
    state: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_state',
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
    tableName: 't_drama_chapter_content',
  });

  Model.associate = function () {

  };

  return Model;
};
