const cuid = require('cuid');
const { Model, DataTypes } = require('sequelize');


module.exports = function(sequelize) {

  class LinkClick extends Model {}
  LinkClick.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: function() {
        return cuid();
      },
    },
    linkId: {
      type: DataTypes.STRING,
    },
    host: {
      type: DataTypes.STRING,
    },
    ipAddress: {
      type: DataTypes.STRING,
    },
    headersJson: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: "link_click",
    timestamps: true,
    paranoid: true,
  });

  return LinkClick;

}

