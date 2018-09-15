$(document).ready(function(){

    //Load up a random doggo pic
      var queryURL = "https://dog.ceo/api/breeds/image/random";
      $.get(queryURL).then(function(response) {
        $("#doggo-pic").attr("src", response.message);
      });
    
        var usernameInput = $("#username");
        var passwordInput = $("#password");
    
    $(".login").on("submit", function(event){
    
        event.preventDefault();
        var userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };
    
        if (!userData.username || !userData.password) {
            return;
        }
    
        loginUser(userData.username, userData.password);
        usernameInput.val("");
        passwordInput.val("");
    });
    
    //sends a post request to post user data to the server
    function loginUser(username, password) {
    
        var newUser = {
            username: username,
            password: password
        };
    
        $.ajax("/api/login", {
            type: "POST",
            data: newUser
        }).then(function() {
            window.location.replace("/home");
        });
    };
    
    
    
    });