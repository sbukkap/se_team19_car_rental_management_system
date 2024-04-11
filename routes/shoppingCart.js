const express = require("express")
const router = express.Router()


const {isShoppingCartPresent, createShoppingcart, get_Shoppingcart, updateShoppingcart, deleteItemShoppingcart, recommendations} = require("../controllers/shoppingCart")


router.get("/isShoppingCartPresent/:userId", isShoppingCartPresent)
router.post("/createShoppingcart", createShoppingcart)
router.get("/get_Shoppingcart", get_Shoppingcart)
router.patch("/updateShoppingcart", updateShoppingcart)
router.delete("/deleteItemShoppingcart", deleteItemShoppingcart)
router.get("/getRecommendation", recommendations)


module.exports = router