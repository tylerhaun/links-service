const cuid = require('cuid');
const { Model, DataTypes } = require('sequelize');


module.exports = function(sequelize) {

  class Link extends Model {}
  Link.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: function() {
        return cuid();
      },
    },
    code: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    redirect: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
    overrideRedirectWithQuery: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
  }, {
    sequelize,
    modelName: "link",
    timestamps: true,
    paranoid: true,
  });

  return Link;

}

