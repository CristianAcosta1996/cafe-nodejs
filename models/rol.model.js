const { Schema, model } = require("mongoose");

const RolSchema = new Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

const Rol = model("Role", RolSchema);

module.exports = Rol;
