'use strict';

const firebase = require('../db');
const comment = require('../models/comment');
const firestore = firebase.firestore();


const addComment = async (req, res, next) => {
    try {
        const data = [req.body.name,req.body.description,req.body.image,req.body.rate];
        await firestore.collection(req.params.collection).doc(req.params.id).collection('comment').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllComments = async (req, res, next) => {
    try {
    
        
        
        const comments = await firestore.collection(req.params.collection).doc(req.body.id).collection('comment');
        const data = await comments.get();
    
        const commentsArray = [];
      
            data.forEach(doc => {
                const Comment = new comment(
                    doc.id,
                    doc.data().description,
                    doc.data().image,
                    doc.data().name,
                    doc.data().rate,
                    doc.data().status
                );
                commentsArray.push(Comment);
            });
            res.send(commentsArray);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getDish = async (req, res, next) => {
    try {
        const id = req.params.id;
        const Dish = await firestore.collection('Today Dish').doc(id);
        const data = await Dish.get();
        if(!data.exists) {
            res.status(404).send('Dish with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const updateComment = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const data = req.body;
//         const Comment =  await firestore.collection('box').doc(Mer).update(req.params.id);
//         await Comment.update(data);
//         res.send('Dish record updated successfuly');        
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const deleteDish = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         await firestore.collection('Today Dish').doc(id).delete();
//         res.send('Record deleted successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
   getAllComments,addComment
}