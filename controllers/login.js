const User = require("../models/login")
const {StatusCodes} = require('http-status-codes')

const register = async (req,res)=>{
     const user = await User.create({...req.body})
     const token = user.createJWT()
     res.status(StatusCodes.OK).cookie('token',token,{ maxAge: 900000, httpOnly: true }).json({message:"created User",data:{username:user.username,token},status_code:StatusCodes.CREATED})
}

const login = async (req,res)=>{
     const {email,password} = req.body
     if (!email || !password){
          res.status(400).json("Bad request provide all the fields")
     }
     const user = await User.findOne({email})
     if (!user){
          res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid login",data:{},status_code:StatusCodes.UNAUTHORIZED})
     }
     const isPasswordCorrect = await user.comparePassword(password)
     if (!isPasswordCorrect){
          res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid login",data:{},status_code:StatusCodes.UNAUTHORIZED})
     }
     const token = user.createJWT()
     res.status(StatusCodes.OK).cookie('token',token,{ maxAge: 900000, httpOnly: true }).json({message:"login Succesful",data:{username:user.username,token},status_code:StatusCodes.OK})

}



module.exports = {register,login}