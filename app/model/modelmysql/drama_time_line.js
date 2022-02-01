/* indent size: 2 */
module.exports = (app, model) => {
  const DataTypes = app.Sequelize;

  const Model = model.define('t_drama_time_line', {
    dramaTimeLineId: {
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
    eventName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      field: 'f_event_name',
    },
    timeType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'f_time_type',
    },
    adTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'f_ad_time',
    },
    inventTime: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      field: 'f_invent_time',
    },
    timetamp: {
      type: DataTypes.DECIMAL(255),
      allowNull: false,
      defaultValue: 0,
      field: 'f_timetamp',
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
    tableName: 't_drama_time_line',
  });

  Model.associate = function () {

  };

  return Model;
};
