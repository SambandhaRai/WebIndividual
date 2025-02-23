import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Room = sequelize.define("rooms", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
