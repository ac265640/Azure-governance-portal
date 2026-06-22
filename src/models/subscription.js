const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Subscription = sequelize.define(
  "Subscription",
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

    azureSubscriptionId: {
      type: DataTypes.STRING,
      unique: true
    },

    owner: {
      type: DataTypes.STRING
    },

    status: {
      type: DataTypes.ENUM(
        "Active",
        "Disabled"
      ),
      defaultValue: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = Subscription;