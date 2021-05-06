const express = require('express');
const {
    addShop,
       getAllShops, 
       getShop,
       updateShop,
       deleteShop,
       getAllShopcomments,
       addShopComment,
       updateShopComment,
       deleteShopComment,
       
      } = require('../controllers/shopController');

const router = express.Router();

router.post('/shop', addShop);

router.get('/shops', getAllShops);
router.get('/shop/:id', getShop);
router.put('/shop/:id', updateShop);
router.delete('/shop/:id', deleteShop);

/// Manage Comments
// UPDATE By ID DOC , ID Comment
router.put('/shop/:id/comment/:idcomment',updateShopComment);
/// ADD By ID DOC
router.post('/shop/:id/comment', addShopComment);
// Get ALL By ID DOC
router.get('/shop/:id/comments',getAllShopcomments);
/// Delete by ID DOC, ID Comment
router.delete('/shop/:id/comment/:idcomment',deleteShopComment);






module.exports = {
    routes: router
}