'use strict';

const firebase = require('../db');
const dish = require('../models/dish');
const Comment = require('../models/comment');
const firestore = firebase.firestore();


const addDish = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('Today Dish').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllDishs = async (req, res, next) => {
    try {
        const Dishs = await firestore.collection('Today Dish');
        const data = await Dishs.get();
        const DishsArray = [];
        if(data.empty) {
            res.status(404).send('No Dish record found');
        }else {
            data.forEach(doc => {
                const Dish = new dish(
                    doc.id,
                    doc.data().name,
                    doc.data().description,
                    doc.data().image,
                    doc.data().price,
                    doc.data().rate,
                    doc.data().status
                );
                DishsArray.push(Dish);
            });
            res.send(DishsArray);
        }
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

const updateDish = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const Dish =  await firestore.collection('Today Dish').doc(id);
        await Dish.update(data);
        res.send('Dish record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteDish = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('Today Dish').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllDishcomments = async (req, res, next) => {
    try {
        const comments = await firestore.collection('Today Dish').doc(req.params.id).collection('comment');
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
const addDishComment = async (req, res, next) => {
    try {
        const data = {name:req.body.name,description:req.body.description,image:req.body.image,rate:req.body.rate};
        await firestore.collection('Today Dish').doc(req.params.id).collection('comment').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateDishComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idComment = req.params.idcomment;
        const data = req.body;
        const Comment =  await firestore.collection('Today Dish').doc(id).collection('comment').doc(idComment);
        await Comment.update(data);
        res.send('Comment record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteDishComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idComment= req.params.idcomment
        await firestore.collection('Today Dish').doc(id).collection('comment').doc(idComment).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
// // Import Admin SDK
// var admin = require("firebase-admin");

// // Get a database reference to our posts
// var db = admin.database();
// var ref = db.ref("shops/${req.params.id}");

// // Attach an asynchronous callback to read the data at our posts reference
// ref.on("value", function(snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });
module.exports = {
   addDish,getAllDishs,getDish,deleteDish,updateDish,getAllDishcomments,addDishComment,updateDishComment,deleteDishComment
}