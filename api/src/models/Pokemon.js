const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
     // defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    life: {
      type : DataTypes.INTEGER,
      allowNull: true
    },
    strength: {
      type : DataTypes.INTEGER,
      allowNull: true
    },
    defense: {
      type : DataTypes.INTEGER,
      allowNull: true
    },
    speed: {
      type : DataTypes.INTEGER,
      allowNull: true
    },
    heigth: {
      type : DataTypes.INTEGER,
      allowNull: true
    },
    weigth : {
      type : DataTypes.INTEGER,
      allowNull: true
    }
  });
};
