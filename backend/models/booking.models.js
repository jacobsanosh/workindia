import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const Booking=sequelize.define("Booking",{
    userid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    trainid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    bogieid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    seatid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    start:{
        type:DataTypes.STRING,
        allowNull:false
    },
    destination:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{timestamps:true});
export default Booking;