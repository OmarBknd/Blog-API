const userModel = require('../models/userModel')

const userProfile = async (req,res) => {
    const {id} = req.params
    try{
        const user = await userModel.userFindById(id)

        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        console.log(user);
        res.status(200).json({message:'user retrieved', user})
       
    }catch(error){
       res.status(500).json({message: error.message})
        
    }
    
}

module.exports = {userProfile}