var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        //associating user with posts, when an author is deleted, also delete any associated posts
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };
   // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
   User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
}