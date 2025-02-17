const {Router} = require('express');
const router = Router();
const passport = require('passport');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Protected Route');
});
router.get('/:postId', postController.postGetById);
router.post('/create', passport.authenticate('jwt', {session: false}), postController.postCreate);
router.put('/update/:postId', passport.authenticate('jwt', {session: false}), postController.postUpdate);
router.delete('/delete/:postId', passport.authenticate('jwt', {session: false}), postController.postDelete);

//Get posts by the user
router.get('/user/:id',postController.postGetByUserId)

//Comments

router.post('/:postId/comment/create', passport.authenticate('jwt', {session: false}), commentController.commentCreate);
router.delete('/comment/delete/:commentId', passport.authenticate('jwt', {session: false}), commentController.commentDelete);
router.put('/comment/update/:commentId', passport.authenticate('jwt', {session: false}), commentController.commentUpdate);

module.exports = router;