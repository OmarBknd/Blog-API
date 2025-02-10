const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const validateResults = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];


const userRegister = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { firstName, lastName, email, password } = req.body;
        console.log('Received Request Body:', req.body);

       
        const existingUser = await userModel.userFindByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const user = await userModel.userCreate(firstName, lastName, email, hashedPassword);
        res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
        console.error('Error in userRegister:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { userRegister: [validateResults, userRegister] };
