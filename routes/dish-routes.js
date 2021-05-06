const express = require('express');
const {
    addDish,getAllDishs,getDish,deleteDish,updateDish,getAllDishcomments,addDishComment,updateDishComment, deleteDishComment
      } = require('../controllers/dishController');

const router = express.Router();

router.post('/dish', addDish);
router.get('/dishs', getAllDishs);
router.get('/dish/:id', getDish);
router.put('/dish/:id', updateDish);
router.delete('/dish/:id', deleteDish);
//// Mange Dish Comments
// Add by DOC ID
router.post('/dish/:id/comment', addDishComment);
// get all by Doc ID
router.get('/dish/:id/comments',getAllDishcomments);
/// update BY DOC ID, Comment id
router.put('/dish/:id/comment/:idcomment',updateDishComment);
/// Delete by ID DOC, ID Comment
router.delete('/dish/:id/comment/:idcomment',deleteDishComment);




module.exports = {
    routes: router
}