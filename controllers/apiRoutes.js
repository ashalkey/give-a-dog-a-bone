var express = require("express");
var router = express.Router();

var db = require("../models");

//GET route to get all posts
router.get("/api/posts", function (req, res) {
    db.Post.find
});

//GET route for returning posts in a specific category
router.get("/api/posts/topic/:topic", function (req, res) {
    //add sequelize code
});

//GET route for retrieving a single post
router.get("/api/posts/:id", function(req, res){
    //add sequelize code
});

//POST route for saving a new post
router.post("/api/posts/", function(req, res) {

});

//DELETE route for deleting posts
module.exports = router;