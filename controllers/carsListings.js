const carListings = require("../models/carListings")
const {StatusCodes} = require("http-status-codes")


const getAllCars = async(req,res)=>{
    /* api to get all car orders to show to renters */
    const cars = await carListings.find({rentStatus:false}).sort('createdAt')
    if (! cars){
        res.status(StatusCodes.OK).json({message:"success but no ads", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:cars, status_code:StatusCodes.OK})
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

const searchCars = async (req, res) => {
    try {
        // Extract search query parameters from the request
        const { carMake, carModel, year, transmission, fuelType, minSeats, maxSeats, minPricePerDay, maxPricePerDay, startDate, endDate, location } = req.query;

        // Construct the search query based on the provided parameters
        const searchQuery = {};

        if (carMake) {
            searchQuery.carMake = carMake;
        }

        if (carModel) {
            searchQuery.carModel = carModel;
        }

        if (year) {
            searchQuery.year = year;
        }

        if (transmission) {
            searchQuery.transmission = transmission;
        }

        if (fuelType) {
            searchQuery.fuelType = fuelType;
        }

        if (minSeats && maxSeats) {
            searchQuery.seats = { $gte: minSeats, $lte: maxSeats };
        }

        if (minPricePerDay && maxPricePerDay) {
            searchQuery.pricePerDay = { $gte: minPricePerDay, $lte: maxPricePerDay };
        }

        if (startDate && endDate) {
            searchQuery.availableFrom = { $lte: new Date(startDate) };
            searchQuery.availableTo = { $gte: new Date(endDate) };
        }

        if (location) {
            searchQuery.location = location;
        }

        const cars = await carListings.find(searchQuery);

        if (cars.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No cars found matching the search criteria", data: {}, status_code: StatusCodes.NOT_FOUND });
        }

        // Return the search results
        res.status(StatusCodes.OK).json({ message: "Success", data: cars, status_code: StatusCodes.OK });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", data: {}, status_code: StatusCodes.INTERNAL_SERVER_ERROR });
    }
};

module.exports = { getAllCars, getAllOwnerCarsListings, createCar, getSingleCar, updateCar, deleteCar, searchCars };
