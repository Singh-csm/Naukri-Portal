const collegeModel =require("../models/collegeModel")
const internModel = require("../models/internModel")

const createintern = async function(req,res){
    try {
        
        let data = req.body
        
        let {name,email,mobile,collegeName,collegeId} = data

    
        let collegeDetails = await collegeModel.findOne({name : collegeName })
        collegeid = collegeDetails._id
        data.collegeId = collegeid;
       console.log(collegeDetails);


        let interndata  = await internModel.create(data)

        return res.status(201).send({status:true, data:interndata})

    
    } catch (error) {
        return res.status(500).send({status: false , msg : error.message})  
    }}


module.exports.createintern = createintern


