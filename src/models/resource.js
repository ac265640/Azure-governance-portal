const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Resource = sequelize.define(
  "Resource",
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

    azureResourceId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },

    type: {
      type: DataTypes.ENUM(
        "VM",
        "Storage",
        "SQLDatabase",
        "AppService"
      ),
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        "Active",
        "Idle",
        "Candidate",
        "Reclaimed"
      ),
      defaultValue: "Active"
    },

    location: {
      type: DataTypes.STRING
    },

    lastActivityDate: {
      type: DataTypes.DATE
    },

    ownerEmployeeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Resource;