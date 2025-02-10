const {Router} = require('express')
const router = Router()
const passport = require('passport')
const signInController = require('../controllers/signInController')



router.post('/',signInController.userLogin)

module.exports = router