require("@babel/register");
require("@babel/polyfill");
const axios = require("axios");
const childProcess = require("child_process");
const dotenv = require("dotenv");

const EventAwaitter = require("./EventAwaitter");
const context = require("./context");

dotenv.config();



var request;
var server;
before(async function() {  
  this.timeout(10000);
  console.log("before");
  const appPromise = require('../src/server')
  const app = await appPromise;
  server = app.server;
  request = require('supertest')(server);
  context.request = request;
})

after(async () => {
  server.close();
});


describe("express", () => {
  it("should ping", async function() {
    this.timeout(5000);
    const response = await context.request.get("/ping")
      .expect(200)
    console.log("response.body", response.body);
  });
  it("should 404", async function() {
    const response = await context.request.get('/')
      .expect(404);
  });
});



const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const linkCode = new Array(20).fill(null)
  .map(() => 
    chars.charAt(Math.random() * chars.length)
  ).join("");
const linkUrl = "https://www.google.com?c=" + linkCode;

describe("API", () => {
  describe("Link", () => {
    it("should successfully create a new link", async function() {
      this.timeout(5000);

      const linkData = {
        code: linkCode,
        url: linkUrl,
      };
      console.log("linkData", linkData);
      const response = await context.request.post("/links").send(linkData).expect(200);
      console.log("response", response.body);

    })
    it("should successfully redirect to url", async function() {
      this.timeout(5000);

      const response = await context.request.get("/linkByCode/" + linkCode).expect(302).expect("Location", linkUrl);
      console.log("response", response.body);
      console.log("response", response.headers);

    })
  })
  describe("Link", () => {
    it("should read 10 link clicks", async function() {
      this.timeout(5000);

      const linkData = {
        code: linkCode,
        url: linkUrl,
      };
      console.log("linkData", linkData);
      const response = await context.request.get("/link-clicks").send(linkData).expect(200);
      console.log("response", response.body);
    })
  })
})


