var express = require("express");
var router = express.Router();

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

    router.get("/home", function(req, res) {
        res.render("index");
    });

module.exports = router;
