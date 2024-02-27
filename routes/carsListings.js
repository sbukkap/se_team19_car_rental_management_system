const {getAllCars, getAllOwnerCarsListings, createCar, getSingleCar, updateCar, deleteCar, searchCars} = require("../controllers/carsListings")
const express = require("express")
const router = express.Router()

router.get("/getAllCarsListings",getAllCars)

router.get("/getAllOwnerCarsListings",getAllOwnerCarsListings)

router.get("/searchCars", searchCars)

router.post("/createCarListings",createCar)

router.get("/getSingleCarListings/:id",getSingleCar)

router.patch("/updateCarListings/:id",updateCar)

router.delete("/deleteCarListings/:id",deleteCar)


module.exports = router