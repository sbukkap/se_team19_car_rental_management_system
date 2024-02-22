const getAllCars = async(req,res)=>{

    res.send("send all cars")
}

const createCar = async(req,res)=>{

    res.send("created a car")
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