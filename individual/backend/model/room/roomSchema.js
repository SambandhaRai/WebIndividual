import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Room = sequelize.define("room", {
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
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bedType: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  bathroom: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  adultOccupants: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  childOccupants: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
