const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE);
    console.log("Base de datos inicializada");
  } catch (error) {
    console.log(error);
    throw new Error("Error al incializar la base de datos!");
  }
};

module.exports = {
  dbConnection,
};
