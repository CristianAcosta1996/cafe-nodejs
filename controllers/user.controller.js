const { request, response } = require("express");
const { Usuario } = require("../models/usuario.model");
const bcryptjs = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  /* const usuarios = await Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));

  const documentosTotales = await Usuario.countDocuments(query); */

  const [usuarios, documentosTotales] = await Promise.all([
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    Usuario.countDocuments(query),
  ]);

  return res.status(200).json({
    ok: "success",
    usuarios,
    documentosTotales,
  });
};

const getUser = (req = request, res = response) => {
  const { id } = req.params;
  return res.status(200).json({
    id,
    ok: "success",
    message: "get user api",
  });
};

const createUser = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  const existeEmail = await Usuario.findOne({ correo });

  const nuevoUsuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  const salt = bcryptjs.genSaltSync();
  nuevoUsuario.password = bcryptjs.hashSync(password, salt);

  try {
    await nuevoUsuario.save();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: "error",
      message: error,
    });
  }

  return res.status(201).json({
    nuevoUsuario,
    ok: "success",
  });
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, correo, google, estado, _id, ...body } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, body);

  return res.status(200).json({
    ok: "success",
    usuario,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  const usuarioAutenticado = req.usuario;

  return res.status(200).json({
    ok: "success",
    message: "usuario eliminado",
    usuarioAutenticado,
  });
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
};
