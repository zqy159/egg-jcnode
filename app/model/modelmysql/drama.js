/* indent size: 2 */


module.exports = (app, model) => {
  const DataTypes = app.Sequelize;

  const Model = model.define(
    'Drama',
    {
      dramaId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'f_physical_id',
      },
      dramaName: {
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
      nickname: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        field: 'f_nickname',
      },
      themeTag: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        field: 'f_theme_tag',
      },
      dramaTypeTag: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        field: 'f_drama_type_tag',
      },
      templateId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'f_template_id',
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'f_user_id',
      },
      userGroup: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'f_user_group',
      },
      state: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'f_state',
      },
      roleNum: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'f_role_num',
      },
      chapterNum: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'f_chapter_num',
      },
      wordsNum: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'f_words_num',
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
    },
    {
      tableName: 't_drama',
    }
  );

  Model.associate = function () { };

  return Model;
};
