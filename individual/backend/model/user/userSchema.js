import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";


export const User=sequelize.define("users",{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure emails are unique
        validate: {
          isEmail: true, // Ensure valid email format
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure contacts are unique
      },
      password:{
        type:DataTypes.STRING
      }
})