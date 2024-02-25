const mongoose = require('mongoose')
var bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require("dotenv")

const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:[true, 'please provide name'],

},
email:{
    type:String,
    required:[true, 'please provide email'],
    unique: true,
},
password:{
    type:String,
    required:[true, 'please provide password'],

},
otp:{
    type: String,
    default: "nootp" 
},

})



userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.createJWT = function (){
    return jwt.sign({userID:this._id,username:this.username},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}


userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

module.exports = mongoose.model('User',userSchema)