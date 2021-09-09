//const utils = require("../utils");
const { restRoutes } = require("@tylerhaun/express-sequelize-domain-model");
import LinkClickController from "../controllers/LinkClickController";

module.exports = function(routeName, app) {
  const controller = new LinkClickController();
  restRoutes(routeName, controller, app);
}


