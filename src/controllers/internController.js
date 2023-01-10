const CollageModel = require("../models/collegeModel")
const InternModel = require ("../models/internModel")
const validator = require("../validation/validation")
const emailValidator = require("email-validator")
 

const createintern = async function(req,res){
    
        try{
        let data = req.body
        
        let {name,email,mobile,collegeName} = data
        if(Object.keys(data) == 0){
            return res.status(400).send({status: false, msg: "Please Provide Data in Body"})
        }

        if(!name){
            return res.status(400).send({status: false, msg: "name is required"})
        }

        if(!validator.isValidName(name)){
            return res.status(404).send({status: false, msg: "Name not valid"})
        }

        if(!email){
            return res.status(400).send({status: false, msg: "email is required"})
        }

        if(!emailValidator.validate(email)) {
            return res.status(400).send({status:false, msg:"Invalid Email"})
        }

        let checkEmail = await InternModel.findOne({email:email})
        if(checkEmail){
            return res.status(400).send({status:false,msg:"Email Already Registered"})
        }
        //console.log(checkEmail)

        if(!mobile){
            return res.status(400).send({status: false, msg: "mobile No  is required"})
        }

        if(!validator.isValidMobile(mobile)){
            return res.status(404).send({status: false, msg: "number is not valid"})
        }


        if(!collegeName || name.trim().length == 0){
            return res.status(400).send({status: false, msg: "Valid CollageName  is required"})
        }

        let collegeDetails = await CollageModel.findOne({name : collegeName })
        if(!collegeDetails){
            return res.status(404).send({status: false, msg: " Not Exist Any CollageId with this CollageName"})
        }

        data.collegeId = collegeDetails._id
        let interndata  = await InternModel.create(data)
        return res.status(201).send({status:true, data:interndata})

        }catch(err){
            return res.status(500).send({status:false,error:err.message})
        }
    
}


module.exports.createintern = createintern
