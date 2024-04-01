const carListings = require("../models/carListings")
const rentItems = require("../models/renting")
const {StatusCodes} = require("http-status-codes")
const stripe = require('stripe')(process.env.STRIPE_KEY)

const rentItem = async(req,res)=>{
    const owner_id = await carListings.findOne({_id:req.body.item_id})
    item_id  = req.body.item_id
    req.body.owner_id = owner_id.ownerId.toString()
    const user_id = req.user.userID
    req.body.user_id = user_id
    const rentItem = await rentItems.create(req.body)
    res.status(StatusCodes.OK).json({message:"item rented", data:{rentItem}, status_code:StatusCodes.OK})
}

const stripePayment = async(req, res) =>{
    // const {} = req.body;

    // const calculateOrderAmount = () =>{
    //     // add code to do payment
    // }

    const paymentIntent = await stripe.paymentIntents.create({
        amount:3000,
        currency: 'usd'
    })
    res.status(StatusCodes.OK).json({message:"success", data:{clientSecret:paymentIntent.client_secret}, status_code:StatusCodes.OK})


}




module.exports = {rentItem, stripePayment}