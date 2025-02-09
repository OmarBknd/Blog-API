const {Router} = require('express');
const userController = require('../controllers/signUpController');
const router = Router();

router.post('/', userController.userRegister);

module.exports = router;