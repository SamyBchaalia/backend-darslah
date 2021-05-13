const express = require('express');
const {
    addBox,
    getAllBoxs,
    getBox,
    updateBox,
    deleteBox,
    getAllBoxpcomments,
    addBoxComment,
    updateBoxComment,
    deleteBoxComment
      } = require('../controllers/boxController');

const router = express.Router();

router.post('/box', addBox);
router.get('/boxs', getAllBoxs);
router.get('/box/:id', getBox);
router.put('/box/:id', updateBox);
router.delete('/box/:id', deleteBox);
/// Manage Box comments
/// ADD COMMENT BY DOC ID
router.get('/box/:id/comment',addBoxComment);
//// get all by doc id
router.get('/box/:id/comments',getAllBoxpcomments);
/// Update by Doc ID, comment ID
router.put('/box/:id/comment/:idcomment',updateBoxComment);
/// Delete by ID DOC, ID Comment
router.delete('/box/:id/comment/:idcomment',deleteBoxComment);



module.exports = {
    routes: router
}