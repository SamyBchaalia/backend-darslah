'use strict';

const firebase = require('../db');
const Shop = require('../models/shop');
const Comment= require('../models/comment')
const { app } = require('firebase-admin');


const firestore = firebase.firestore();



const addShop = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('Shop').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllShops = async (req, res, next) => {
    try {
        const shops = await firestore.collection('Shop');
        const data = await shops.get();
        const shopsArray = [];
    
        if(data.empty) {
            res.status(404).send('No Shop record found');
        }else {
            data.forEach(doc => {
                const shop = new Shop(
                    doc.id,
                    doc.data().name,
                    doc.data().description,
                    doc.data().image,
                    doc.data().price,
                    doc.data().rate,
                    doc.data().status
                );
                shopsArray.push(shop);
            });
            res.send(shopsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getShop = async (req, res, next) => {
    try {
        const id = req.params.id;
        const shop = await firestore.collection('Shop').doc(id);
        const data = await shop.get();
        if(!data.exists) {
            res.status(404).send('Shop with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateShop = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const shop =  await firestore.collection('Shop').doc(id);
        await shop.update(data);
        res.send('Shop record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteShop = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('Shops').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllShopcomments = async (req, res, next) => {
    try {
        const comments = await firestore.collection('Shop').doc(req.params.id).collection('comment');
        const data = await comments.get();
        const commentsArray = [];
      
            data.forEach(doc => {
                const comment = new Comment(
                    doc.id,
                    doc.data().description,
                    doc.data().image,
                    doc.data().name,
                    doc.data().rate,
                    doc.data().status
                );
                commentsArray.push(comment);
            });
            res.send(commentsArray);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const addShopComment = async (req, res, next) => {
    try {
        const data = {name:req.body.name,description:req.body.description,image:req.body.image,rate:req.body.rate};
        await firestore.collection('Shop').doc(req.params.id).collection('comment').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateShopComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idComment = req.params.idcomment;
        const data = req.body;
        const Comment =  await firestore.collection('Shop').doc(id).collection('comment').doc(idComment);
        await Comment.update(data);
        res.send('Comment record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteShopComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idComment= req.params.idcomment
        await firestore.collection('Shop').doc(id).collection('comment').doc(idComment).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    addShop,
    getAllShops,
    getShop,
    updateShop,
    deleteShop,
    getAllShopcomments,addShopComment,updateShopComment,
    deleteShopComment
    
}