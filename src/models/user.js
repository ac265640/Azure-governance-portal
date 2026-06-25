const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const User = sequelize.define(
  "User",
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

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    role: {
      type: DataTypes.ENUM("Admin", "Manager", "Employee"),
      defaultValue: "Employee"
    },

    department: {
      type: DataTypes.STRING
    }

  },
  {
    timestamps: true
  }
);

module.exports = User;