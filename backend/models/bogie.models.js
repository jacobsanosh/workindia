import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import Train from "./train.models.js"; 
import Seat from "./seats.models.js";

const Bogie=sequelize.define('Bogie',{
    bogieNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    seatsInBogie:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    availableSeats:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    trainId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{timestamps:true});

Bogie.belongsTo(Train,{foreignKey:'trainId',as:'train'});

Train.hasMany(Bogie,{foreignKey:'trainId',as:'bogies'});

Bogie.hasMany(Seat,{foreignKey:'bogieId',as:'seats'});
Seat.belongsTo(Bogie,{foreignKey:'bogieId',as:'bogie'});

export default Bogie;