const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/v1/users";

    this.middlewares();
    this.routes();
    this.conectarBaseDeDatos();
  }

  listen() {
    this.app.listen(
      this.port,
      console.log(`Server listening on port: ${this.port}`)
    );
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user.routes"));
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json()); // body parser to json
    this.app.use(express.static("public"));
  }

  async conectarBaseDeDatos() {
    await dbConnection();
  }
}

module.exports = Server;
