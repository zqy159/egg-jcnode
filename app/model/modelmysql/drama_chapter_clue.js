/* indent size: 2 */


module.exports = (app, model) => {
  const DataTypes = app.Sequelize;

  const Model = model.define('t_drama_chapter_clue', {
    clueId: {
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
    clueName: {
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
    clueType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '1',
      field: 'f_clue_type',
    },
    parentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_parent_id',
    },
    role: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      field: 'f_role',
    },
    img: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: '',
      field: 'f_img',
    },
    desc: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: '',
      field: 'f_desc',
    },
    remarks: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: '',
      field: 'f_remarks',
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
    tableName: 't_drama_chapter_clue',
  });

  Model.associate = function() {

  };

  return Model;
};
