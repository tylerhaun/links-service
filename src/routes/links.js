//const utils = require("../utils");
const { restRoutes, middlewareMethodWrapper } = require("@tylerhaun/express-sequelize-domain-model");
import LinkController from "../controllers/LinkController";

module.exports = function(routeName, app) {
  const linkController = new LinkController();
  restRoutes(routeName, linkController, app);

  const linkByCodeUrl = process.env.LINK_BY_CODE_URL || "linkByCode";
  app.route(`/${linkByCodeUrl}/:code`)
    .get(middlewareMethodWrapper(linkController.getByCode.bind(linkController), ["params", "query"]))
}


