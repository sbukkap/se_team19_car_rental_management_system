const express = require("express")
const router = express.Router()


const {createReview, getAllItemReviews}  = require("../controllers/review")

router.post("/createReview", createReview)
router.get("/getallCarReviews/:id", getAllItemReviews)


module.exports = router