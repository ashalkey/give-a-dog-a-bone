$(document).ready(function(){

    var usernameInput = $("#username");
    var passwordInput = $("#password");

$(".signup").on("submit", function(event){

    event.preventDefault();
    var userData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
        return;
    }

    signUpUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
});

//sends a post request to post user data to the server
function signUpUser(username, password) {

    var newUser = {
        username: username,
        password: password
    };

    $.ajax("/api/signup", {
        type: "POST",
        data: newUser
    }).then(function(data) {
        console.log("data is", data)
        console.log("created dat user");
    });
}



});