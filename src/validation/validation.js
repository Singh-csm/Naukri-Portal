const mongoose = require("mongoose")

const emailValidator = require("email-validator")



const isValidName = function(name){
    const validName = (/^[a-zA-Z_]{1,20}$/)
    return validName.test(name)
}


const isValidEmail = function(email){
    if(!emailValidator.validate(email)) return res.status(400).send({status:false, msg:"Invalid Email"})
}



const isValidObjectId = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValid = function(value){
    if(typeof value === "undefined" || value === null) return false
    if(typeof value === "string" && value.trim().length === 0) return false
}


module.exports.isValidName = isValidName
module.exports.isValidEmail = isValidEmail


module.exports.isValidObjectId = isValidObjectId
module.exports.isValid = isValid