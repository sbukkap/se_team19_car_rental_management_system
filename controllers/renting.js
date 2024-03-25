const carListings = require("../models/carListings")
const rentItems = require("../models/renting")
const {StatusCodes} = require("http-status-codes")

const rentItem = async(req,res)=>{
    const owner_id = await carListings.findOne({_id:req.body.item_id})
    req.body.owner_id = owner_id.ownerId.toString()
    const user_id = req.user.userID
    req.body.user_id = user_id
    const rentItem = await rentItems.create(req.body)
    res.status(StatusCodes.OK).json({message:"item rented", data:{rentItem}, status_code:StatusCodes.OK})
}




module.exports = {rentItem}