const { SequelizeCrudController } = require("@tylerhaun/express-sequelize-domain-model");
const db = require("../models");


export default class LinkClickController extends SequelizeCrudController {

  _getModel() {
    return db.LinkClick;
  }

}

