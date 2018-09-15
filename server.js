var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");
var fileUpload = require("express-fileupload");
var db = require("./models");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(fileUpload());
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

// Prepare express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(session({ secret: "anything", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");

//add a helper to use conditionals with logical operatorsin handlebars templates
var hbs = exphbs.create({
    defaultLayout: "main",
    helpers: {
        ifCond: function (v1, operator, v2, options) {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
    }
}
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

var apiRoute = require("./controllers/apiRoutes");
var htmlRoute = require("./controllers/htmlRoutes");
app.use(apiRoute);
app.use(htmlRoute);


db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("Listening on port %s", PORT);
    });
});