import Bogie from "../models/bogie.models.js";
import Train from "../models/train.models.js";
import Seat from "../models/seats.models.js";
const addTrain = async (req, res) => {
  try {
    const { trainName, start, destination, bogies } = req.body;
    const newTrain = await Train.create({
      trainName,
      start,
      destination,
      bogies,
    });
    console.log(newTrain);
    const bogiesData = [];
    for (let i = 1; i <= bogies; i++) {
      const bogie = await Bogie.create({
        bogieNumber: i,
        seatsInBogie: 5,
        availableSeats: 5,
        trainId: newTrain.id,
      });
      bogiesData.push(bogie);
    }
    for (const bogie of bogiesData) {
      const seatsData = [];
      for (let j = 1; j <= 5; j++) {
        const seat = await Seat.create({
          seatNumber: j,
          isBooked: false,
          bogieId: bogie.id,
        });
        seatsData.push(seat);
      }
      bogie.seatsInBogie = seatsData.length;
      await bogie.save();
    }
    newTrain.bogies = bogiesData.length;
    await newTrain.save();
    res.status(201).json({ message: "Train created successfully" });
  } catch (err) {
    console.log("error on creating the train", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addTrain };
