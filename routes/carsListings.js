const {getAllCars, createCar, getSingleCar, updateCar, deleteCar} = require("../controllers/carsListings")
const express = require("express")
const router = express.Router()

router.get("/getAllCars",getAllCars)

router.post("/createCar",createCar)

router.get("/getSingleCar/:id",getSingleCar)

router.patch("/updateCar/:id",updateCar)

router.delete("/deleteCar/:id",deleteCar)


module.exports = router