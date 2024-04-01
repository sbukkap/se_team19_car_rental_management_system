const {getAllCars, getAllOwnerCarsListings, createCar, getSingleCar, updateCar, deleteCar, getAllCarsAdmin, updateAdminApprove} = require("../controllers/carsListings")
const express = require("express")
const router = express.Router()

router.get("/getAllCarsListings",getAllCars)

router.get("/getAllOwnerCarsListings",getAllOwnerCarsListings)

router.get("/searchCars", searchCars)

router.get("/filterCars", filterCars)

router.post("/createCarListings",createCar)

router.get("/getSingleCarListings/:id",getSingleCar)

router.patch("/updateCarListings/:id",updateCar)

router.delete("/deleteCarListings/:id",deleteCar)

router.get("/getAllCarsListingsAdmin",getAllCarsAdmin)

router.patch("/adminApprove/:id",updateAdminApprove)


module.exports = router