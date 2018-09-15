var express = require("express");
var router = express.Router();

var db = require("../models");

var passport = require("../config/passport");

//route to login a user, authenticating using passport
router.post("/api/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true
}));

//route for signging up a new user 
router.post("/api/signup", function (req, res) {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(function () {
        res.redirect(307, "/api/login");
    });
});

//route to log user out
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
});

//route to get user data that can be used client side
router.get("/api/user_data", function(req, res){
    if (!req.user){
        res.json({});
    }
    else {
        res.json({
            username: req.user.username,
            id: req.user.id
        });
    }
});

//route to get post data that can be used client 

//GET route to get all posts
router.get("/api/posts", function (req, res) {
    db.Post.findAll({}).then(function(dbPost){
        res.json(dbPost);
    });
});

//GET route for returning posts in a specific category
router.get("/api/posts/topic/:topic", function (req, res) {
    //add sequelize code
});

//GET route for retrieving a single post
router.get("/api/posts/:id", function (req, res) {
    db.Post.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(dbPost) {
        res.json(dbPost);
    });
});

//POST route for saving a new post
router.post("/api/posts", function (req, res) {

    db.Post.create(req.body).then(function(dbPost){
        res.json(dbPost);
    });
});


//DELETE route for deleting posts

router.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbPost){
        res.json(dbPost);
    });
});

//PUT route for updating posts
router.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(function(dbPost){
        res.json(dbPost);
    });
});
        
//fileupload route to upload images/files
router.post("/upload", function(req, res) {
    if(!req.files) {
        return res.status(400).send("no files were uploaded");
    }

    let sampleFile = req.files.sampleFile;

    sampleFile.mv("/upload/files/filename.jpg", function(err){
        if (err){
            return res.status(500).send(err);
        }
        res.send("file uploaded!");
    });
});
module.exports = router;