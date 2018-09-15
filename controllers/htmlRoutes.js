var express = require("express");
var router = express.Router();

var isAuthenticated = require("../config/middleware/isAuthenticated");

    router.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/home");
        }
        res.render("signup");
    });
    
    router.get("/login", function(req, res) {
        if (req.user) {
            res.redirect("/home");
        }
        res.render("login");
    });

    router.get("/home", isAuthenticated, function(req, res) {
        res.render("index", { username : req.user.username});
    });

    router.get("/post", function(req, res) {
        res.render("createPost");
    });
module.exports = router;
