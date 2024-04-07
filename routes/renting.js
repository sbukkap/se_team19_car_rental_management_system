const express = require("express")
const router = express.Router()


const {rentItem, stripePayment, sendPaymentEmail,mostRentedItems, mostRentedItemsForUser} = require("../controllers/renting")
router.post("/rentItem", rentItem)
router.post("/stripePayment", stripePayment)
router.post("/sendPaymentEmail", sendPaymentEmail)
router.get("/mostRentedItem", mostRentedItems)
router.get("/mostRentedItemsForUser", mostRentedItemsForUser)


module.exports = router