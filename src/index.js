const express = require("express");
const route = require("./routes/route")
const mongoose =require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const MONGO_URI = process.env.MONGO_URI;
const app =express();

app.use(express.json())
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI, {useNewUrlParser: true})
.then(()=>console.log("MongoDB is Connected"))
.catch(err=>console.log(err))
app.use("/", route)

app.listen(3000, function(){
    console.log("Express App is running on port" + (3000))
})




