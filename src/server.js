const dotenv = require("dotenv");
dotenv.config()
const bodyParser = require("body-parser");
const express = require("express");


const { ErrorHandlerMiddleware } = require("@tylerhaun/express-http-errors");
const importRoutes = require("@tylerhaun/express-import-routes");
const logger = require("@tylerhaun/custom-logger");

const db = require("./models");




class Main {

  async main() {

    const db = require("./models");
    await db.init();

    const app = express();

    app.use(function(request, response, next) {
      const requestData = {
        timestamp: Date.now(),
        ip: request.ip,
        method: request.method,
        path: request.path,
        headers: request.headers
      };
      logger.log({message: "requestLogger", data: requestData})
      return next();
    })

    app.get("/ping", function pingHandler(request, response, next) {
      return response.json({pong: true});
    })

    app.use(bodyParser.json())

    importRoutes(app, __dirname + "/routes")

    const errorHandlerMiddleware = new ErrorHandlerMiddleware();
    app.use(errorHandlerMiddleware)

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })

    return {app, server};

  }

}


const main = new Main();
module.exports = main.main()
  .catch(error => {
    console.error(error);
  })

