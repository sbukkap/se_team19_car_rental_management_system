const {StatusCodes} = require("http-status-codes")
const review = require("../models/review")
const carListings = require("../models/carListings")




const createReview = async(req, res)=>{
    req.body.user_id = req.user.userID
    const item = await carListings.findOne({_id:req.body.item_id})
    req.body.owner_id = item.ownerId
    const review_doc = await review.create(req.body)
    res.status(StatusCodes.CREATED).json({message:"success", data: review_doc, status_code:StatusCodes.CREATED})
}

const getAllItemReviews = async(req, res)=>{
    const reviews = await review.find({item_id:req.params.id})
    if (! reviews){
        res.status(StatusCodes.OK).json({message:"no review for this item", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:reviews, status_code:StatusCodes.OK})
}

module.exports = {createReview, getAllItemReviews}