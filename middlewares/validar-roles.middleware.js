const { request, response } = require("express");

const esAdminRol = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      ok: "error",
      message:
        "se precisa verificar el token antes de proceder a verificar autorizacion",
    });
  }
  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      ok: " error",
      message:
        "se necesita ser administrador para ejecutar esa accion - no tiene los permisos necesarios",
    });
  }
  next();
};

const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        ok: "error",
        message:
          "se precisa verificar el token antes de proceder a verificar autorizacion",
      });
    }

    const { rol } = req.usuario;

    if (!roles.includes(rol)) {
      return res.status(401).json({
        ok: "error",
        message: `se necesita tener permiso de ${roles} - no tiene los permisos necesarios como para ejecutar esta accion`,
      });
    }

    next();
  };
};

module.exports = { esAdminRol, tieneRol };
