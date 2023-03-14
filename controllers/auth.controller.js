const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const { Usuario } = require("../models/usuario.model");
const generarJWT = require("../helpers/generar-jwt");

const validarUsuario = async (correo = "", password = "") => {
  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    throw new Error("El correo / password no es correcto - correo");
  }

  const esPasswordValida = bcrypt.compareSync(password, usuario.password);
  if (!esPasswordValida) {
    throw new Error("El correo / password no es correcto - password");
  }

  return usuario;
};

const loginController = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await validarUsuario(correo, password);

    const token = await generarJWT(usuario.id);

    return res.status(200).json({
      ok: "success",
      message: "usuario logeado correctamente",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: "error",
      message: error.message,
    });
  }
};

module.exports = {
  loginController,
};
