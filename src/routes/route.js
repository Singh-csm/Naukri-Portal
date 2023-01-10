const express =require("express")
const router = express.Router()
const collegeController = require("../controllers/collegeController")
const internController =require("../controllers/internController")




router.post("/functionup/colleges", collegeController.createCollege)  // create collage

router.post("/functionup/intern",internController.createintern)  //create intern

router.get("/functionup/CollageDetails",collegeController.getcollege)


module.exports = router