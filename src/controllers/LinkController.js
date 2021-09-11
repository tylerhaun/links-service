const Joi = require("joi");
const { SequelizeCrudController } = require("@tylerhaun/express-sequelize-domain-model");
const db = require("../models");
import LinkClickController from "./LinkClickController";


export default class LinkController extends SequelizeCrudController {

  _getModel() {
    return db.Link;
  }

  async getByCode(params, query, request, response) {
    this.logger.log({method: "getByCode", params, query})

    const schema = Joi.object({
      params: Joi.object({
        code: Joi.string().required(),
      }),
      query: Joi.object({
        redirect: Joi.boolean(),
      }),
    });
    const validated = Joi.attempt({params, query}, schema);
    this.logger.log({validated});
    //const validated = {query, params}

    const link = await this.findOne({code: validated.params.code});
    console.log("link", link);

    const linkClickCreateArgs = {
      linkId: link.id,
      ipAddress: request.ip,
      host: request.headers.host,
      headersJson: JSON.stringify(request.headers),
      code: link.code,
      url: link.url,
    };
    console.log("linkClickCreateArgs", linkClickCreateArgs);
    const linkClickController = new LinkClickController();
    const linkClick = await linkClickController.create(linkClickCreateArgs);
    console.log("linkClick", linkClick);

    console.log(1)
    if (link.overrideRedirectWithQuery == true) {
      console.log(2)
      if (validated.query.redirect == "true") {
      console.log(3)
        return response.redirect(link.url)
      }
      else if (validated.query.redirect == "false") {
      console.log(4)
        return response.json({url: link.url})
      }
    }
    if (link.redirect == false) {
      console.log(5)
      return response.json({url: link.url})
    }
    console.log(6)
    return response.redirect(link.url)

  }

}


