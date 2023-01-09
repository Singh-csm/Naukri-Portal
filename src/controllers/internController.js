const collegeModel =require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require("../validation/validation")

const createintern = async function(req,res){

    try {
        let data = req.body //require data in variable-- data
        let {name,email,mobile,collegeName,collegeId} = data  // destructuring is done--

        if(!validator.isValidName(name) || name.trim().length == 0){ return res.status(404).send({status: false, msg: "Name not valid"}) }
        if(!validator.isValidMobile(mobile)){ return res.status(404).send({status:false, msg: "Mobileno. is not valid"}) }
        if(!validator.isValidEmail(email)){ return res.status(404).send({status:false, msg: "Email is not valid"}) }

        let collegeDetails = await collegeModel.findOne({name : collegeName }) //db call for finding collegeName
        
        collegeId = collegeDetails._id
        // data.collegeId = collegeid;

        let interndata  = await internModel.create(data) 

        return res.status(201).send({status:true, data:interndata})

    } catch (error) {
        return res.status(500).send({status: false , msg : error.message})  
    }}


module.exports.createintern = createintern


