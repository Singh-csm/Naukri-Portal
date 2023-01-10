const mongoose = require("mongoose")
const phoneValidator = require("validate-mobile-number")
const emailValidator = require("email-validator")


const isValidName = function(name){
    const validName = (/^[a-zA-Z_]{1,20}$/)
    return validName.test(name)
}

const isValidMobile = function(name){
    const validName = (/^[0-9]{10}$/)
    return validName.test(name)
}
 

 const validlogolink = function (logoLink){
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;  // not handled properly
    return regex.test(logoLink)
}




const isValidObjectId = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValid = function(value){
    if(typeof value === "undefined" || value === null) return false
    if(typeof value === "string" && value.trim().length === 0) return false
}


module.exports.isValidName = isValidName
module.exports.isValidMobile = isValidMobile
module.exports.isValidObjectId = isValidObjectId
module.exports.isValid = isValid
module.exports.validlogolink = validlogolink