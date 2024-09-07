import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
const User=sequelize.define('User',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'user'
    }
    
},{
    timestamps:true
});

export default User;