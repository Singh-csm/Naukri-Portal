const express =require("express")
const collegeControler=require("../controllers/collegeController");
const internController= require('../controllers/internController')
const router=express.Router()

router.post("/functionup/colleges",collegeControler.college)

router.post("/intern",internController.createintern)

router.get("/functionup/collegeDetails",collegeControler.getcollege)

module.exports = router