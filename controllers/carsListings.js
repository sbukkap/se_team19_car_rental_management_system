const carListings = require("../models/carListings")
const {StatusCodes} = require("http-status-codes")


const getAllCars = async(req,res)=>{
    const cars = await carListings.find({}).sort('createdAt')
    if (! cars){
        res.status(StatusCodes.OK).json({message:"success but no ads", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:cars, status_code:StatusCodes.OK})
}

const createCar = async(req,res)=>{
    req.body.ownerId = req.user.userID
    const car = await carListings.create(req.body)
    res.status(StatusCodes.CREATED).json({message:"success", data: car, status_code:StatusCodes.CREATED})
}


const getSingleCar = async(req,res)=>{
    console.log(req.params.id)
    const car = await carListings.findOne({_id:req.params.id})
    if (!car){
        res.status(StatusCodes.NOT_FOUND).json({message:"NO such Job check ur Job Id", data: car, status_code:StatusCodes.NOT_FOUND})
    }
    res.status(StatusCodes.OK).json({message:"Success", data: car, status_code:StatusCodes.OK})
}

const updateCar = async(req,res)=>{
    res.send("updated Car")
}

const deleteCar = async(req,res)=>{
    res.send("deleted car")
}


module.exports = {getAllCars, createCar, getSingleCar, updateCar, deleteCar}