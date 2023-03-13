const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/user.controller");
const {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const router = Router();

router.get(
  "/",
  [
    check("limite", "El limite no es valido.").optional().isNumeric(),
    check("desde", "El parametro desde no es valido.").isNumeric(),
    validarCampos,
  ],
  getUsers
);

router.get(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  getUser
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe contener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es valido").isEmail(),
    /* check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    check("correo").custom(existeEmail),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  createUser
);

router.patch(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUser
);

module.exports = router;
