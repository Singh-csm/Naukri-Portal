const collegeModel = require('../models/collegeModel')
const internModels=require('../models/internModel')

const college = async function (req, res) {
   
        const data = req.body
        const { name, fullName, logoLink} = data
       
        const create = await collegeModel.create(data)
        return res.status(201).send({ status: true, msg: create })
        }
    
   





        const getcollege = async function(req,res){

            try {
         
             let C = req.query.collegeName
          
         
             let college = await collegeModel.findOne({name:C}).select({_id:1,name:1,fullName:1,logoLink:1})
             if (!college) return res.status(404).send({status:false,msg:"college data not found"})
         
             let interndata = await internModel.find({collegeId: college._id}).select({name:1,email:1,mobile:1})
             if (interndata.isDeleted == true){return res.status(400).send({status: false , msg: "intern is already deleted"})}
             if (!interndata) return res.status(400).send({status : false, msg:"no intern here"})
         
             let Objectdata = {
                 name: college.name,
                 fullName: college.fullName,
                 logoLink: college.logoLink,
                 interns: interndata
             }
         
             return res.status(200).send({status: true, data: Objectdata})
         
         } catch (error) {
         
              return res.status(500).send({status: false , msg : error.message})  
            } 
         
         }
         
        

module.exports.college = college
module.exports.getcollege = getcollege