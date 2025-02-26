import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Experience = sequelize.define("experience", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  expName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  expDetails: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 90000], 
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});
