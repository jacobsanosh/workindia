// associations.js
import Train from './train.models.js';
import Bogie from './bogie.models.js';
import Seat from './seats.models.js';

Train.hasMany(Bogie, { foreignKey: 'trainId', as: 'trainBogies' }); 
Bogie.belongsTo(Train, { foreignKey: 'trainId', as: 'train' });

Bogie.hasMany(Seat, { foreignKey: 'bogieId', as: 'bogieSeats' });
Seat.belongsTo(Bogie, { foreignKey: 'bogieId', as: 'bogie' });

export { Train, Bogie, Seat };
