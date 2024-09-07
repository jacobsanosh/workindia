import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

const Train = sequelize.define('Train', {
  trainName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bogies: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { timestamps: true });

export default Train;
