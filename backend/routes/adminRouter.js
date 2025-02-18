const {Router} = require('express');
const router = Router();
const passport = require('passport')
const adminAuth = require('../config/adminAuth')
const profileController = require('../controllers/profileController')
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')

router.get( '/',
    passport.authenticate("jwt", { session: false }),
     adminAuth,
    (req,res) =>{res.send('Welcome Admin')}
   );
   router.get( '/users',
    passport.authenticate("jwt", { session: false }),
     adminAuth,
    profileController.userGetAll
   );  
router.get( '/posts',
 passport.authenticate("jwt", { session: false }),
  adminAuth,
 postController.postGetAll
);

router.delete('/posts/delete/:postId', passport.authenticate('jwt', {session: false}),adminAuth, postController.postDelete);

router.get( '/comments',
    passport.authenticate("jwt", { session: false }),
     adminAuth,
    commentController.commentsGetAll
   );
   router.delete('/comments/delete/:commentId', passport.authenticate('jwt', {session: false}),adminAuth, commentController.commentDelete);


module.exports = router;
