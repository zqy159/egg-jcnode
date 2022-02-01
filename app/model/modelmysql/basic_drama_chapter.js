/* indent size: 2 */


module.exports = (app, model) => {
  const DataTypes = app.Sequelize;

  const Model = model.define('t_basic_drama_chapter', {
    basicDramaChapterId: {
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
    basicDramaChapterName: {
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
    defaultType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_default_type',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      field: 'f_content',
    },
    weight: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: '',
      field: 'f_weight',
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
    tableName: 't_basic_drama_chapter',
  });

  Model.associate = function () {

  };

  return Model;
};
