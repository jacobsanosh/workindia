import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";


const Seat=sequelize.define('Seat',{
    seatNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    isBooked:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    bogieId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{timestamps:true});

export default Seat;