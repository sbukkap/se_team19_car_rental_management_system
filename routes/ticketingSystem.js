const express = require("express")
const router = express.Router()



const {launchComplaint, getComplaintsOnMyProduct, getMyComplaints, updateComplaintResolveStatus, adminGetAllComplaints, customersComplaintTheMost, ownerComplaintTheMost} = require("../controllers/ticketingSystem")

router.post("/launchComplaint", launchComplaint)
router.get("/getComplaintsOnMyProduct",getComplaintsOnMyProduct)
router.get("/getMyComplaints", getMyComplaints)
router.get("/adminGetAllComplaints",adminGetAllComplaints)
router.patch("/updateComplaintResolveStatus/:id",updateComplaintResolveStatus)
router.get("/adminCustomerWithMostComplaints/", customersComplaintTheMost)
router.get("/adminOwnerWithMostComplaints", ownerComplaintTheMost)


module.exports = router