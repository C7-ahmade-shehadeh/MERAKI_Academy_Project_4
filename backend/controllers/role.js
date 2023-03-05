const roleSchema=require('../models/roleSchema')

const role=(req,res)=>{
const {role,
    permissions}=req.body
    const addrole=new roleSchema({
        role,
permissions
    })
    addrole
    .save()
    .then(result =>{
        console.log(result);
        res.json(result)
    })
    .catch(err =>{
        console.log(err);
    })

}

module.exports={role}