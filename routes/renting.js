const express = require("express")
const router = express.Router()


const {rentItem, stripePayment} = require("../controllers/renting")
router.post("/rentItem", rentItem)
router.post("/stripePayment", stripePayment)


module.exports = router