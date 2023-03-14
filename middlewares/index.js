const validarCampos = require("./validar-campos.middleware");
const validarJWT = require("./validar-jwt.middleware");
const validarRoles = require("./validar-roles.middleware");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validarRoles,
};
