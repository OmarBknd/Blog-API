const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')


const userPromoteToAdmin = async (req, res) => {
    const { userId } = req.params;  

    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Unauthorized: Only admins can promote users" });
        }

    
        const user = await userModel.userFindById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "ADMIN") {
            return res.status(400).json({ message: "User is already an admin" });
        }

        const updatedUser = await userModel.userPromoteToAdmin(userId);
        res.status(200).json({ message: "User promoted to admin successfully", user: updatedUser });

    } catch (error) {
        console.error("Error promoting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const userDemoteFromAdmin = async (req, res) => {
    const { userId } = req.params;

    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Unauthorized: Only admins can demote users" });
        }

        // Find the first admin 
        const superAdmin = await userModel.superAdmin();
        if (superAdmin && superAdmin.id === userId) {
            return res.status(403).json({ message: "Cannot demote the first admin" });
        }

        // Check if the user exists
        const user = await userModel.userFindById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "USER") {
            return res.status(400).json({ message: "User is already a regular user" });
        }

        // Demote user
        const updatedUser = await userModel.userDemoteFromAdmin(userId);
        res.status(200).json({ message: "User demoted to regular user successfully", user: updatedUser });

    } catch (error) {
        console.error("Error demoting user:", error);
        res.status(500).json({ message: error.message });
    }
};





const userGetAll = async (req, res) => {
    
    const isAdmin = req.user.role === 'ADMIN';

    try {
        
        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized to fetch users" }); 
        }

        const users = await userModel.userGetAll(); 
        return res.status(200).json({ message: "Users retrieved", users }); 

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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

module.exports = {userProfile, userUpdatePassword, userGetAll, userPromoteToAdmin, userDemoteFromAdmin}