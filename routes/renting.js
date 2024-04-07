const express = require("express")
const router = express.Router()


const {rentItem, stripePayment, sendPaymentEmail} = require("../controllers/renting")
router.post("/rentItem", rentItem)
router.post("/stripePayment", stripePayment)
router.post("/sendPaymentEmail", sendPaymentEmail)


module.exports = router