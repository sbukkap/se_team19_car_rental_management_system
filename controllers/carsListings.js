const carListings = require("../models/carListings")
const {StatusCodes} = require("http-status-codes")


const getAllCars = async(req,res)=>{
    /* api to get all car orders to show to renters  it has been updated to do serach operations too */
    const {fuelType, transmission, mileage, carMake, carModel, seats, pricePerDay, location, sort} = req.query
    queryObject = {}
    if (fuelType){
        queryObject.fuelType = fuelType
    }
    if (transmission){
        queryObject.transmission = transmission
    }
    if (mileage){
        queryObject.mileage = { $gt:Number(mileage)-1}
    }
    if (carMake){
        queryObject.carMake = {$regex: carMake, $options:'i'}
    }
    if (carModel){
        queryObject.carModel = carModel
    }
    if (seats){
        queryObject.seats = { $gte: Number(seats)}
    }
    if (pricePerDay){
        queryObject.pricePerDay = { $lte: Number(pricePerDay)}
    }
    if (location){
        queryObject.location = location
    }
    queryObject.rentStatus = false
    queryObject.adminAuth = true
    let cars = carListings.find(queryObject)
    if (sort){
        const sort_index = sort.split(",").join(' ')
        cars.sort(sort_index)
    }
    else{
        cars = cars.sort("createdAt")
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    cars = cars.skip(skip).limit(limit)
    const products = await cars
    if (! products){
        res.status(StatusCodes.OK).json({message:"success but no ads", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:products, status_code:StatusCodes.OK})
}


const getAllOwnerCarsListings = async(req,res)=>{
    /* api to get all car posted for rent by the user*/
    const cars = await carListings.find({rentStatus:false, ownerId:req.user.userID}).sort('createdAt')
    if (! cars){
        res.status(StatusCodes.OK).json({message:"success but no ads", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:cars, status_code:StatusCodes.OK})
}

const createCar = async(req,res)=>{
    /* api to create a add listing */
    req.body.ownerId = req.user.userID
    const car = await carListings.create(req.body)
    res.status(StatusCodes.CREATED).json({message:"success", data: car, status_code:StatusCodes.CREATED})
}


const getSingleCar = async(req,res)=>{
    /* api to  view a single car */
    const car = await carListings.findOne({_id:req.params.id})
    if (!car){
        res.status(StatusCodes.NOT_FOUND).json({message:"NO such car check ur car Id", data: car, status_code:StatusCodes.NOT_FOUND})
    }
    res.status(StatusCodes.OK).json({message:"Success", data: car, status_code:StatusCodes.OK})
}

const updateCar = async(req,res)=>{
    /* api to update ad listings */
    car_id = req.params.id
    car_update = req.body
    if (!req.body){
        res.status(StatusCodes.BAD_REQUEST).json({message:"provide valid update paramerters", data: car, status_code:StatusCodes.BAD_REQUEST})
    }
    const car = await carListings.findOneAndUpdate({_id:car_id},car_update, {new:true, runValidators:true})
    res.status(StatusCodes.OK).json({message:"update Succesful", data: car, status_code:StatusCodes.OK})
}

const deleteCar = async(req,res)=>{
    const car_delete = await carListings.findByIdAndDelete({_id:req.params.id})
    if (!car_delete){
        res.status(StatusCodes.NOT_FOUND).json({message:"NO such car check ur car Id", data: car_delete, status_code:StatusCodes.NOT_FOUND})
    }
    res.status(StatusCodes.OK).json({message:"Success the car has been deleted", data: car_delete, status_code:StatusCodes.OK})
}



const getAllCarsAdmin = async(req,res)=>{
    /* api to get all car orders to show to renters  it has been updated to do serach operations too */
    // const authHeader = req.headers.authorization
    // const token = authHeader.split(' ')[1]
    // if (token == process.env.ADMIN_TOKEN){
    const {sort} = req.query
    queryObject = {}
    queryObject.rentStatus = false
    queryObject.adminAuth = false
    let cars = carListings.find(queryObject)
    if (sort){
        const sort_index = sort.split(",").join(' ')
        cars.sort(sort_index)
    }
    else{
        cars = cars.sort("createdAt")
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    cars = cars.skip(skip).limit(limit)
    const products = await cars
    if (! products){
        res.status(StatusCodes.OK).json({message:"success but no ads", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:products, status_code:StatusCodes.OK})
}


const updateAdminApprove = async(req,res)=>{
    
    car_id = req.params.id
    car_update = {"adminAuth":true}
    if (!req.body){
        res.status(StatusCodes.BAD_REQUEST).json({message:"provide valid update paramerters", data: car, status_code:StatusCodes.BAD_REQUEST})
    }
    const car = await carListings.findOneAndUpdate({_id:car_id},car_update, {new:true, runValidators:true})
    res.status(StatusCodes.OK).json({message:"update Succesful", data: car, status_code:StatusCodes.OK})
}


module.exports = {getAllCars, getAllOwnerCarsListings, createCar, getSingleCar, updateCar, deleteCar, getAllCarsAdmin, updateAdminApprove}