const collegeSchema = require("../models/collegeModel")
const validator = require("../validation/validation")
const url = require("valid-url")

const createCollege = async function(req,res){
try{
    let data = req.body
    const{name, fullName, logoLink} = data

    if(Object.keys(data) == 0){
        return res.status(400).send({status: false, msg: "Please Provide Data in Body"})
    }
    if(!validator.isValidName(name) || name.trim().length == 0){
        return res.status(404).send({status: false, msg: "Name not valid"})
    }
    if(!validator.isValidName(fullName) || fullName.trim().length == 0){
        return res.status(404).send({status: false, msg: "Full Name is not valid"})
    }
    if(!logoLink){
        return res.status(404).send({status:false, msg: "Please provide a Logo Link"})
    }

    const validateLogoLink = url.isUri(logoLink)  //isUri is used to check whether a link is a valid URL or NOT

    if(!validateLogoLink){
        return res.status(404).send({status: false, msg: "Please Provide a Vailid Link"})
    }

    const nameAlreadyRegistered = await collegeSchema.findOne({name})
    if(nameAlreadyRegistered){
        return res.status(400).send({status:false, msg: "College Name already exists"})
    }

    let savedData = await collegeSchema.create(data)
    res.status(201).send({status: true, data: savedData})
}
catch(err){
    res.status(500).send({status: false, error: err.message})
}
}

module.exports.createCollege= createCollege