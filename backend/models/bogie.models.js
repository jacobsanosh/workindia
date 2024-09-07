import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

const Bogie = sequelize.define('Bogie', {
  bogieNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seatsInBogie: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trainId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { timestamps: true });

export default Bogie;
