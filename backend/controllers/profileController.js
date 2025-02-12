const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

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

const userUpdatePassword = async(req,res) => {
    const {id} = req.params
    const {password} = req.body
    console.log('before',password);
    const hashedPassword = await bcrypt.hash(password,10)
    try{
        const user = await userModel.userUpdatePassword(id, hashedPassword)
        res.status(200).json({message:'password changed',user})
        console.log('after',hashedPassword);
        
    } catch(error){
        res.status(500).json({message:'Error updating password'})
    }
  
}

module.exports = {userProfile, userUpdatePassword}