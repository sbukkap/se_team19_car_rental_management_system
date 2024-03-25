const express = require("express")
const router = express.Router()


const {rentItem} = require("../controllers/renting")
router.post("/rentItem", rentItem)


module.exports = router