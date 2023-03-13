require("dotenv").config();
const Server = require("./models/server.model");

const myServer = new Server();

myServer.listen();
