const express = require('express');
const {
    addComment, getAllComments
      } = require('../controllers/commentController');

const router = express.Router();
/// For comments we choose collection to use in httm params, and id of the product we want it's feedback
router.post('/:collection/comment/:id', addComment);
router.get('/:collection/comments/:id', getAllComments);
// router.put('/:collection/comment/:id/:docid', updateComment);
// router.delete('/:collection/comment/:id/:docid', deleteComment);


module.exports = {
    routes: router
}