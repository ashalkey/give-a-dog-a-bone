var express = require("express");
var passport = require("passport");

var router = express.Router();

router.get("/", function (req, res) {

    res.render("login");
});

router.post("/", passport.authenticate("local", { successRedirect: "/home", 
                                                  failureFlash: true}), 
    function(req, res){
        
        res.redirect("/home")
});

router.get("/post", function(req, res){

    res.render("index");
});

module.exports = router;