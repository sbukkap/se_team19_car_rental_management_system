const carListings = require("../models/carListings")
const {StatusCodes} = require("http-status-codes")


const getAllCars = async(req,res)=>{
    const jobs = await carListings.find({}).sort('createdAt')
    if (! jobs){
        res.status(StatusCodes.OK).json({message:"success but no ads", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:jobs, status_code:StatusCodes.OK})
}

const createCar = async(req,res)=>{
    console.log(req.user)
    req.body.ownerId = req.user.userID
    const car = await carListings.create(req.body)
    res.status(StatusCodes.CREATED).json({message:"success", data: car, status_code:StatusCodes.CREATED})
}


const getSingleCar = async(req,res)=>{
    res.send("single car")
}

const updateCar = async(req,res)=>{
    res.send("updated Car")
}

const deleteCar = async(req,res)=>{
    res.send("deleted car")
}


module.exports = {getAllCars, createCar, getSingleCar, updateCar, deleteCar}