import Bogie from "../models/bogie.models.js";
import Train from "../models/train.models.js";
import Seat from "../models/seats.models.js";
import Booking from "../models/booking.models.js";
const addTrain = async (req, res) => {
  try {
    const { trainName, start, destination, bogies } = req.body;
    const newTrain = await Train.create({
      trainName,
      start: start.toLowerCase(),
      destination: destination.toLowerCase(),
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

const getAvailability = async (req, res) => {
  try {
    const { start, destination } = req.query;

    if (!start || !destination) {
      return res
        .status(400)
        .json({ message: "start and destination are required" });
    }
    const trains = await Train.findAll({
      where: {
        start: start.toLowerCase(),
        destination: destination.toLowerCase(),
      },
    });
    res.status(200).json({ trains });
  } catch (err) {
    console.log("error on getting availability", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const bookTicket = async (req, res) => {
  try {
    const { trainName, start, destination, bogieNumber, seatNumber } = req.body;
    if (!trainName || !start || !destination || !bogieNumber || !seatNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const train = await Train.findOne({
      where: {
        trainName,
        start: start.toLowerCase(),
        destination: destination.toLowerCase(),
      },
    });
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    const bogie = await Bogie.findOne({
      where: {
        bogieNumber,
        trainId: train.id,
      },
    });
    console.log("\n\n",bogie);
    if (!bogie) {
      return res.status(404).json({ message: "Bogie not found" });
    }
    const seat = await Seat.findOne({
      where: {
        seatNumber,
        bogieId: bogie.id,
      },
    });
    console.log("\n\nsets",seat);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }
    if (seat.isBooked) {
      return res.status(400).json({ message: "Seat is already booked" });
    }
    seat.isBooked = true;
    await seat.save();
    bogie.availableSeats = bogie.availableSeats - 1;
    await bogie.save();
    const booking = await Booking.create({
      userid: req.user.id,
      trainid: train.id,
      bogieid: bogie.id,
      seatid: seat.id,
      start: start.toLowerCase(),
      destination: destination.toLowerCase(),
    });
    if (!booking) {
      return res.status(500).json({ message: "Booking failed" });
    }

    res.status(200).json({ message: "Ticket booked successfully" });
  } catch (err) {
    console.log("error on booking the ticket", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDetails=async(req,res)=>{
    try{
        const {id}=req.params;
        const booking=await Booking.findByPk(id);
        if(!booking){
            return res.status(404).json({message:"Booking not found"});
        }
        res.status(200).json({booking});
    }
    catch(err){
        console.log("error on getting the booking details",err);
        res.status(500).json({message:"Internal server error"});
    }
}
export { addTrain, getAvailability, bookTicket,getDetails };
