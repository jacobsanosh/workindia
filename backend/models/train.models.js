import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import Bogie from "./bogie.models.js";

const Train=sequelize.define('Train',{
    trainName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    start:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    destination:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    bogies:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
},{timestamps:true});

Train.hasMany(Bogie,{foreignKey:'trainId',as:'bogies'});
Bogie.belongsTo(Train,{foreignKey:'trainId',as:'train'});

export default Train;