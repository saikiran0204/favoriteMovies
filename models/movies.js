const { DataTypes } = require('sequelize');
const sequelize = require('../dbConn');

const Movies = sequelize.define('movies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  movieName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  cast: {
    type:  DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Movies;