const {getAllCars, createCar, getSingleCar, updateCar, deleteCar} = require("../controllers/carsListings")
const express = require("express")
const router = express.Router()

router.get("/getAllCarsListings",getAllCars)

router.post("/createCarListings",createCar)

router.get("/getSingleCarListings/:id",getSingleCar)

router.patch("/updateCarListings/:id",updateCar)

router.delete("/deleteCarListings/:id",deleteCar)


module.exports = router