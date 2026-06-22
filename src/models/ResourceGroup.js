const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const ResourceGroup = sequelize.define(
  "ResourceGroup",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    location: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true
  }
);

module.exports = ResourceGroup;