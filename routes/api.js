/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const expect = require('chai').expect;

const Book = require("../models/Book.js");

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.aggregate([
        { $project: {
          _id: 1,
          title: 1,
          commentcount: { $size: "$comments"}
        }}
      ]).exec( function (err, foundBooks) {
        if (err) {
          console.log(err);
        } else {
          res.json(foundBooks);
        }
      })
    })
    
    .post(function (req, res){
      let bookTitle = req.body.title.trim(); //Prevent only spaces
      if (!bookTitle) {
        return res.json("Invalid title!")
      }
      Book.create({title: bookTitle}, function (err, createdBook) {
        if (err) {
          console.log(err);
        } else {
          res.json(createdBook);
        }
      })
    })
    
    .delete(function(req, res){
      Book.deleteMany({}, function (err, success) {
        if (err) {
          console.log(err);
        }
        res.json("Complete delete successful!");
      })
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookId = req.params.id;
      Book.findById(bookId, "-__v", function(err, foundBook) {
        if (err) {
          console.log(err);
        } else {
          res.json(foundBook);
        }
      })
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
