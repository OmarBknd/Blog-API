const {Router} = require('express');
const router = Router();
const passport = require('passport');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Protected Route');
});

router.post('/create', passport.authenticate('jwt', {session: false}), postController.postCreate);
router.put('/update/:id', passport.authenticate('jwt', {session: false}), postController.postUpdate);

//Comments

router.post('/comment/create', passport.authenticate('jwt', {session: false}), commentController.commentCreate);
router.delete('/comment/delete/:id', passport.authenticate('jwt', {session: false}), commentController.commentDelete);

module.exports = router;