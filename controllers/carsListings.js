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
        const { query } = req.query;
        if (!query) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Query parameter 'query' is required", data: {}, status_code: StatusCodes.BAD_REQUEST });
        }

        const stringFields = ['carMake', 'carModel', 'location', 'transmission', 'fuelType']; 
        const numericFields = ['year', 'mileage', 'seats', 'pricePerDay'];
        const words = query.split(' ');
        const stringQueries = words.filter(word => isNaN(parseFloat(word))); 
        const numericQueries = words.filter(word => !isNaN(parseFloat(word))).map(parseFloat);
        // console.log(stringQueries)
        // console.log(numericQueries)

        if (stringQueries.length > 0) {
            searchQuery = {
                $and: stringQueries.map(word => (
                    {
                        $or: stringFields.map(field => (
                            { [field]: { $regex: new RegExp(word, 'i') } }
                        ))
                    }
                ))
            };
            console.log('yes')
            var cars = await carListings.find(searchQuery);
        }
        else {
            console.log('yes')
            cars = await carListings.find({rentStatus:false}).sort('createdAt')
        }

        
        // console.log(cars)
        
        // console.log(numericQueries)
        if (numericQueries.length > 0) {
            const filteredCars = cars.filter(car => {
                return numericQueries.every(numericQuery => {
                    return numericFields.some(field => {
                        return car[field] === numericQuery;
                    });
                });
            });

            cars = filteredCars; 
        }

        if (cars.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No cars found matching the search criteria", data: {}, status_code: StatusCodes.NOT_FOUND });
        }

        res.status(StatusCodes.OK).json({ message: "Success", data: cars, status_code: StatusCodes.OK });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", data: {}, status_code: StatusCodes.INTERNAL_SERVER_ERROR });
    }
};

// const searchCars = async (req, res) => {
//     try {
//         const { query } = req.query;
//         if (!query) {
//             return res.status(StatusCodes.BAD_REQUEST).json({ message: "Query parameter 'query' is required", data: {}, status_code: StatusCodes.BAD_REQUEST });
//         }

//         const stringFields = ['carMake', 'carModel', 'location', 'transmission', 'fuelType']; 
//         const numericFields = ['year', 'mileage', 'seats', 'pricePerDay'];
//         const words = query.split(' ');

//         // Filter out terms that are not in the database
//         const validTerms = words.filter(word => {
//             return stringFields.some(async field => {
//                 const count = await carListings.countDocuments({ [field]: { $regex: new RegExp(word, 'i') } });
//                 return count > 0;
//             });
//         });
        
//         console.log(validTerms)
//         // If none of the terms match, return all cars
//         if (validTerms.length === 0) {
//             const cars = await carListings.find({ rentStatus: false }).sort('createdAt');
//             return res.status(StatusCodes.OK).json({ message: "Success", data: cars, status_code: StatusCodes.OK });
//         }

//         // Separate valid terms into string and numeric queries
//         const stringQueries = validTerms.filter(word => isNaN(parseFloat(word))); 
//         const numericQueries = validTerms.filter(word => !isNaN(parseFloat(word))).map(parseFloat);

//         // Construct string query
//         const stringQuery = {
//             $and: stringQueries.map(word => (
//                 {
//                     $or: stringFields.map(field => (
//                         { [field]: { $regex: new RegExp(word, 'i') } }
//                     ))
//                 }
//             ))
//         };

//         // Execute string query
//         let cars = await carListings.find(stringQuery);

//         // Apply numeric queries
//         if (numericQueries.length > 0) {
//             const filteredCars = cars.filter(car => {
//                 return numericQueries.every(numericQuery => {
//                     return numericFields.some(field => {
//                         return car[field] === numericQuery;
//                     });
//                 });
//             });

//             cars = filteredCars; 
//         }

//         if (cars.length === 0) {
//             return res.status(StatusCodes.NOT_FOUND).json({ message: "No cars found matching the search criteria", data: {}, status_code: StatusCodes.NOT_FOUND });
//         }

//         res.status(StatusCodes.OK).json({ message: "Success", data: cars, status_code: StatusCodes.OK });
//     } catch (error) {
//         console.error(error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", data: {}, status_code: StatusCodes.INTERNAL_SERVER_ERROR });
//     }
// };

const filterCars = async (req, res) => {
    try {
        const { carMake, carModel, minYear, maxYear, minMileage, maxMileage, transmission, fuelType, minSeats, maxSeats, minPricePerDay, maxPricePerDay, availableFrom, availableTo } = req.query;

        const filters = {};

        if (carMake) filters.carMake = carMake;
        if (carModel) filters.carModel = carModel;
        if (minYear && maxYear) filters.year = { $gte: parseInt(minYear), $lte: parseInt(maxYear) };
        if (minMileage && maxMileage) filters.mileage = { $gte: parseInt(minMileage), $lte: parseInt(maxMileage) };
        if (transmission) filters.transmission = transmission;  
        if (fuelType) filters.fuelType = fuelType;
        if (minSeats && maxSeats) filters.seats = { $gte: parseInt(minSeats), $lte: parseInt(maxSeats) };
        if (minPricePerDay && maxPricePerDay) filters.pricePerDay = { $gte: parseInt(minPricePerDay), $lte: parseInt(maxPricePerDay) };
        if (availableFrom) filters.availableFrom = { $gte: new Date(availableFrom) };
        if (availableTo) filters.availableTo = { $lte: new Date(availableTo) };
        // console.log(filters)
        const cars = await carListings.find(filters);

        if (!cars || cars.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No cars found matching the search criteria", data: {}, status_code: StatusCodes.NOT_FOUND });
        }

        res.status(StatusCodes.OK).json({ message: "Success", data: cars, status_code: StatusCodes.OK });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", data: {}, status_code: StatusCodes.INTERNAL_SERVER_ERROR });
    }
};

module.exports = { getAllCars, getAllOwnerCarsListings, createCar, getSingleCar, updateCar, deleteCar, searchCars, filterCars };
