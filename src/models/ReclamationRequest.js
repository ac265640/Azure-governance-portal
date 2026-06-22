const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const ReclamationRequest = sequelize.define(
  "ReclamationRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Approved",
        "Rejected",
        "Completed"
      ),
      defaultValue: "Pending"
    },

    remarks: {
      type: DataTypes.TEXT
    }
  },
  {
    timestamps: true
  }
);

module.exports = ReclamationRequest;