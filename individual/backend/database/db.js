import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();

export const sequelize = new Sequelize('resort_booking_system_db', 'postgres', '_Y3woyspl30$$',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

export const db = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected successfully")
    await sequelize.sync({ alter: true });
  } catch (e) {
    console.error("fail to connect database successfully",e)
    process.exit(1);
  }
}