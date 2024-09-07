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

const getAvailability=async(req,res)=>{
    try{
      const {start,destination}=req.query;
  
      if(!start || !destination){
        return res.status(400).json({message:"start and destination are required"});
      }
      const trains=await Train.findAll({
        where:{
          start,
          destination
        },
      });
      res.status(200).json({trains});
    }
    catch(err){
      console.log("error on getting availability",err);
      res.status(500).json({message:"Internal server error"});
    }
}

const bookTicket=async(req,res)=>{
  try{
    res.status(200).json({message:"booked the ticket"});
  }
  catch(err){
    console.log("error on booking the ticket",err);
    res.status(500).json({message:"Internal server error"});
  }
}


export { addTrain,getAvailability,bookTicket };
