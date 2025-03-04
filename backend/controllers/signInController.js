const { Role } = require('@prisma/client');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.userFindByEmail(email);
        if (!user) {
            return res.status(401).json({message: 'User not found'});
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user.id, role: user.role}, process.env.SECRET_KEY, {expiresIn: '3days'});
        console.log('Token',token);
        
        res.json({message: 'Login successful', token, message: 'user', user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {userLogin};