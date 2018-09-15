module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topic: {
            type: DataTypes.STRING,
            devaultValue: "Random"
        }
    });
    return Post;
};