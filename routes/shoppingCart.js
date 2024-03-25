const express = require("express")
const router = express.Router()


const {addToShoppingcart, get_Shoppingcart, updateShoppingcart, deleteItemShoppingcart} = require("../controllers/shoppingCart")
router.post("/addToShoppingcart", addToShoppingcart)
router.get("/get_Shoppingcart", get_Shoppingcart)
router.patch("/updateShoppingcart", updateShoppingcart)
router.delete("/deleteItemShoppingcart", deleteItemShoppingcart)


module.exports = router