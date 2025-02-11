const {Router} = require('express');
const router = Router();
const postController = require('../controllers/postController');
const profileController = require('../controllers/profileController')



router.get('/', postController.postGetAll);
router.get('/profile/:id', profileController.userProfile)




module.exports = router;