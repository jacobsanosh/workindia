import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize=new Sequelize(process.env.DB_NAME,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,{
    host:process.env.MYSQL_HOST,
    dialect:'mysql'
});

const createConnections=async()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync()
    }
    catch(err){
        console.error('Unable to connect to the database:', err);
    }
};
export {sequelize,createConnections}