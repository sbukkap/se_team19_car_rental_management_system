const {StatusCodes} = require("http-status-codes")
const shoppingCart = require("../models/shoppingCart")




const shoppingCartCount = async(req, res) =>{

    res.send("number of elements")

}


const createShoppingcart = async(req, res)=>{
    const shoppingCart_doc = await shoppingCart.create(req.body)
    res.status(StatusCodes.CREATED).json({message:"success", data: shoppingCart_doc, status_code:StatusCodes.CREATED})
}

const get_Shoppingcart = async(req, res)=>{
    const shoppingcart = await shoppingCart.find({_id:req.params.id})
    if (! shoppingcart){
        res.status(StatusCodes.OK).json({message:"no shopping cart", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:shoppingcart, status_code:StatusCodes.OK})
}

const updateShoppingcart = async(req, res)=>{
    const shoppingCartId = req.params.id
    const shoppingCartUpdate = req.body
    if (!req.body){
        res.status(StatusCodes.BAD_REQUEST).json({message:"provide valid update paramerters", data: {}, status_code:StatusCodes.BAD_REQUEST})
    }
    const shoppingCartUpdated = await shoppingCart.findOneAndUpdate({_id:shoppingCartId}, shoppingCartUpdate, {new:true, runValidators:true})
    res.status(StatusCodes.OK).json({message:"update Succesful", data: shoppingCartUpdated, status_code:StatusCodes.OK})
}

const deleteItemShoppingcart = async(req, res)=>{
    const shoppingCartDelete = await shoppingCart.findOneAndUpdate({_id:req.params.id}, {isDeleted:true}, {new:true, runValidators:true})
    if (!shoppingCartDelete){
        res.status(StatusCodes.NOT_FOUND).json({message:"NO shoppingcart", data: shoppingCartDelete, status_code:StatusCodes.NOT_FOUND})
    }
    res.status(StatusCodes.OK).json({message:"Shopping cart deleted", data: shoppingCartDelete, status_code:StatusCodes.OK})
}


module.exports = {shoppingCartCount, createShoppingcart, get_Shoppingcart, updateShoppingcart, deleteItemShoppingcart}