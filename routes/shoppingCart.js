const express = require("express")
const router = express.Router()


const {isShoppingCartPresent, createShoppingcart, get_Shoppingcart, updateShoppingcart, deleteItemShoppingcart, recommendations} = require("../controllers/shoppingCart")


router.get("/isShoppingCartPresent/:userId", isShoppingCartPresent)
router.post("/createShoppingcart", createShoppingcart)
<<<<<<< HEAD
router.get("/get_Shoppingcart/:userId", get_Shoppingcart)
router.patch("/updateShoppingcart/:userId", updateShoppingcart)
router.delete("/deleteItemShoppingcart/:userId", deleteItemShoppingcart)
=======
router.get("/get_Shoppingcart", get_Shoppingcart)
router.patch("/updateShoppingcart", updateShoppingcart)
router.delete("/deleteItemShoppingcart", deleteItemShoppingcart)
router.get("/getRecommendation", recommendations)
>>>>>>> 992118477657a3398289f270c43b84ea53ca4b5f


module.exports = router