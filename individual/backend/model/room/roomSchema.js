import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Room = sequelize.define("room", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  roomType: {
    type: DataTypes.STRING, 
    allowNull: false,
    defaultValue: "Room", 
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
  area: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  adultOccupants: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  childOccupants: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
},{
  timestamps: true,
});
