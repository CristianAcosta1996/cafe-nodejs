const { Router } = require("express");
const { check } = require("express-validator");
const { loginController } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe tener almenos 6 caracteres").isLength(
      {
        min: 6,
      }
    ),
    validarCampos,
  ],
  loginController
);

module.exports = router;
