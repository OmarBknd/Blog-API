const {Router} = require('express');
const router = Router();
const passport = require('passport')
const postController = require('../controllers/postController');
const profileController = require('../controllers/profileController')



router.get('/', postController.postGetAll);
router.get('/profile/:id', passport.authenticate('jwt', {session: false}), profileController.userProfile)
router.put('/profile/:id/password', passport.authenticate('jwt', {session: false}), profileController.userUpdatePassword)




module.exports = router;