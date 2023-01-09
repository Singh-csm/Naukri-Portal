const mongoose = require("mongoose")
const phoneValidator = require("validate-mobile-number")
const emailValidator = require("email-validator")


const isValidName = function(name){
    const validName = (/^[a-zA-Z_]{1,20}$/)
    return validName.test(name)
}
// const isValidFullName = function(fullName){
//     const validFullName = (/^[a-zA-Z_]{1,20}$/)
//     return validFullName.test(fullName)
// }

const isValidEmail = function(email){
    if(!emailValidator.validate(email)) return res.status(400).send({status:false, msg:"Invalid Email"})
}
const isValidMobile = function(mobile){
    if(!phoneValidator.validate(mobile)) return res.status(400).send({status:false, msg:"Phone No is Not Valid"})
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
module.exports.isValidMobile = isValidMobile
module.exports.isValidFullName = isValidFullName
module.exports.isValidObjectId = isValidObjectId
module.exports.isValid = isValid