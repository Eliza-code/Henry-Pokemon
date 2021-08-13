const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allownull: false,
      primaryKey: true
    },
    hp: { //life
      type : DataTypes.INTEGER,
      allowNull: true
    },
    attack: { // fuerza
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
    height: {
      type : DataTypes.INTEGER,
      allowNull: true
    },
    weight : {
      type : DataTypes.INTEGER,
      allowNull: true
    },
    image: {
      type:DataTypes.STRING,
      allowNull: true,
      //default value 
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue : true,
      allowNull: false,
    }
  }, {timestamps : false});
};
