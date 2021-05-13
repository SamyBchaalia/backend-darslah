'use strict';

const { app } = require('firebase-admin');
const firebase = require('../db');
const box = require('../models/box');
const firestore = firebase.firestore();
const Comment = require('../models/comment')
const Shop = require('../models/shop')



const addBox = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('box').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllBoxs = async (req, res, next) => {
    try {
        const Boxs = await firestore.collection('box');
        const data = await Boxs.get();
        const BoxsArray = [];
        if(data.empty) {
            res.status(404).send('No Box record found');
        }else {
            data.forEach(doc => {
                const Box = new box(
                    doc.id,
                    doc.data().name,
                    doc.data().description,
                    doc.data().image,
                    doc.data().price,
                    doc.data().rate,
                    doc.data().status
                );
                BoxsArray.push(Box);
            });
            res.send(BoxsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBox = async (req, res, next) => {
    try {
        const id = req.params.id;
        const Box = await firestore.collection('box').doc(id);
        const data = await Box.get();
        if(!data.exists) {
            res.status(404).send('Box with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateBox = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const Box =  await firestore.collection('box').doc(id);
        await Box.update(data);
        res.send('Box record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteBox = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('box').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllBoxpcomments = async (req, res, next) => {
    try {
        const comments = await firestore.collection('box').doc(req.params.id).collection('comment');
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
const addBoxComment = async (req, res, next) => {
    try {
        const data = {name:req.body.name,description:req.body.description,image:req.body.image,rate:req.body.rate};
        await firestore.collection('box').doc(req.params.id).collection('comment').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateBoxComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idComment = req.params.idcomment;
        const data = req.body;
        const Comment =  await firestore.collection('box').doc(id).collection('comment').doc(idComment);
        await Comment.update(data);
        res.send('Comment record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteBoxComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idComment= req.params.idcomment
        await firestore.collection('box').doc(id).collection('comment').doc(idComment).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addBox,
    getAllBoxs,
    getBox,
    updateBox,
    deleteBox,
    getAllBoxpcomments,
    addBoxComment,updateBoxComment,deleteBoxComment
}