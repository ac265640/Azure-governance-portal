const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    employeeId: {
      type: DataTypes.STRING,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    department: {
      type: DataTypes.STRING
    },

    designation: {
      type: DataTypes.STRING
    },

    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = Employee;