const Rol = require("../models/rol.model");
const { Usuario } = require("../models/usuario.model");

const esRolValido = async (rol = "") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`No existe el rol: ${rol}`);
  }
};

const existeEmail = async (email = "") => {
  const resultadoBusqueda = await Usuario.findOne({ email });
  if (resultadoBusqueda) {
    throw new Error(`El email ${email} ya existe. Intente con uno nuevo`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const usuario = await Usuario.findById(id);
  if (!usuario) throw new Error(`No existe un usuario con el id: "${id}"`);
};

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
};
