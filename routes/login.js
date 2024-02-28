const express = require("express")
const router = express.Router()

const {register, login, forgetPassword, resetPassword, authenticateQuestions} = require("../controllers/login")
router.post("/register",register)
router.post("/login",login)
router.post("/authenticateQuestions", authenticateQuestions)
router.post("/forgotPassword",forgetPassword)
router.post("/resetPassword",resetPassword)


module.exports = router