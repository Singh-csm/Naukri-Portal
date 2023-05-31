const mongoose = require("mongoose")



const isValidName = function(name){
    const validName = (/^[a-zA-Z_]{1,20}$/)
    return validName.test(name)
}


const isValidEmail = function(email){
    const EmailRegex = /^\S+@\S+\.\S+$/;
    return EmailRegex.test(email)
}


const isValidMobile = function(str){
    const regexExp = /^[6-9]\d{9}$/gi;
    return regexExp.test(str);
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


module.exports.isValidObjectId = isValidObjectId
module.exports.isValid = isValid