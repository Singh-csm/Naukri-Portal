const collegeModel = require("../models/collegeModel")
const validator = require("../validation/validation")
const internModel = require ("../models/internModel")
const url = require("valid-url")
const isUri = require("isuri")

const createCollege = async function(req,res){
try{
    let data = req.body
    const{name, fullName, logoLink} = data

    if(Object.keys(data) == 0){
        return res.status(400).send({status: false, msg: "Please Provide Data in Body"})
    }
    if(!name){
        return res.status(400).send({stats:false,msg:" name is required"})
    }

    if(!validator.isValidName(name)){
        return res.status(404).send({status: false, msg: "Name not valid"})
    }

    if(!fullName){
        return res.status(400).send({stats:false, msg:" Fullname is required"})
    }
    if(!validator.isValidName(fullName) || fullName.trim().length == 0){
        return res.status(404).send({status: false, msg: "FullName not valid"})
    }

    if(!logoLink){
        return res.status(400).send({stats:false,msg:" LogoLink is required"})
    }
    
    // const validateLogoLink = url.isUri(logoLink)  //isUri is used to check whether a link is a valid URL or NOT
    // console.log(validateLogoLink)

    // if(!validateLogoLink){
    //     return res.status(404).send({status: false, msg: "Please Provide a Vailid Link"})
    // }


    if(!validator.validlogolink(logoLink)){
        return res.status(404).send({status: false, msg: "logo linknot valid"})
    }



    const nameAlreadyRegistered = await collegeModel.findOne({name})
    if(nameAlreadyRegistered){
        return res.status(400).send({status:false, msg: "College Name already exists"})
    }

    let savedData = await collegeModel.create(data)
    res.status(201).send({status: true, data: savedData})
}
catch(err){
    res.status(500).send({status: false, error: err.message})
}
}




// const getcollege = async function(req,res){

//     try {
 
//      let C = req.query.collegeName
  
 
//      let college = await collegeModel.findOne({name:C}).select({_id:1,name:1,fullName:1,logoLink:1})
//      if (!college) return res.status(404).send({status:false,msg:"college data not found"})
 
//      let interndata = await internModel.find({collegeId: college._id}).select({name:1,email:1,mobile:1})
//      if (interndata.isDeleted == true){return res.status(400).send({status: false , msg: "intern is already deleted"})}
//      if (!interndata) return res.status(400).send({status : false, msg:"no intern here"})
 
//      let Objectdata = {
//          name: college.name,
//          fullName: college.fullName,
//          logoLink: college.logoLink,
//          interns: interndata
//      }
 
//      return res.status(200).send({status: true, data: Objectdata})
 
//  } catch (error) {
 
//       return res.status(500).send({status: false , msg : error.message})  
//     } 
 
//  }

const getcollege = async function(req,res){
try {
 
    let name = req.query.name
    if(!name) return res.status(400).send({status:false , msg:"please enter collegeName"})

    let college = await collegeModel.findOne({name ,isDeleted:false}).select({_id:1,name:1,fullName:1,logoLink:1}).lean()
    if (!college) return res.status(404).send({status:false,msg:"college may be not exist or its not registered"})

    let interndata = await internModel.find({collegeId: college._id,isDeleted:false}).select({name:1,email:1,mobile:1})
    if (interndata.length == 0) return res.status(400).send({status : false, msg:"no intern here"})
    
    college.interns = interndata;
    return res.status(200).send({status: true, data: college})

} catch (error) {

     return res.status(500).send({status: false , msg : error.message})  
   } 

}












module.exports.createCollege= createCollege


module.exports.getcollege = getcollege