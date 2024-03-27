//accessing env variables
require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const morgan = require('morgan')
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handlers")
const expressFileUpload = require('express-fileupload')
//connect to cloud storage
const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})
//connect to MongoDB
const connectDB = require("./db/connect")
const authenticatUser = require("./middleware/authentication")
//middleware to view request details
app.use(morgan("tiny"))
//to access req.body during post request
app.use(express.json())
//package to acces the files
app.use(expressFileUpload({useTempFiles:true}))


const auth = require("./routes/login")
app.use("/api/v1/auth",auth)

const carsListings = require("./routes/carsListings")
app.use("/api/v1/cars", authenticatUser, carsListings)

const upload = require("./routes/upload")
app.use("/api/v1/image", upload)

const rent = require("./routes/renting")
app.use("/api/v1/rent",authenticatUser, rent)


const shoppingCart = require("./routes/shoppingCart")
app.use("/api/v1/shoppingCart/", shoppingCart)


app.use(notFound)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("MongoDB is up 🤖")
        app.listen(port,()=>{
            console.log(`server is running at port `+port+` 😁😁🙌`)
        })
    }
    catch(err){
        console.log(err)
    }
}

start()

