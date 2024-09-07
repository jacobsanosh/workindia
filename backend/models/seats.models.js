import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import Bogie from "./bogie.models.js";

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

Seat.belongsTo(Bogie,{foreignKey:'bogieId',as:'bogie'});
Bogie.hasMany(Seat,{foreignKey:'bogieId',as:'seats'});
export default Seat;