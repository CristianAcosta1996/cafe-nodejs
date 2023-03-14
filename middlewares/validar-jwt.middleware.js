const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/usuario.model");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      message: "no hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario || !usuario.estado) {
      return res.status(401).json({
        ok: "error",
        message: "Token no valido - El usuario no existe o fue eliminado",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "token no valido",
    });
  }
};

module.exports = { validarJWT };
