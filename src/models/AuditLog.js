const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const AuditLog = sequelize.define(
  "AuditLog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    action: {
      type: DataTypes.STRING,
      allowNull: false
    },

    entityType: {
      type: DataTypes.STRING,
      allowNull: false
    },

    entityId: {
      type: DataTypes.INTEGER
    },

    performedBy: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true
  }
);

module.exports = AuditLog;