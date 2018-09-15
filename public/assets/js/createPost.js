$(document).ready(function () {
    //get info from the post form
    var user;
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var postForm = $("#createPostForm");

    $(postForm).on("submit", handleFormSubmit);

    var postId;
    var updating = false;

    function handleFormSubmit(event) {

        event.preventDefault();
        //get the user's username to provide to the post object, then either update or submit the post
        $.get("/api/user_data", function(data) {
           user = data.username;

        }).then(function (){
            if (!titleInput.val().trim() || !bodyInput.val().trim()) {
                return;
            }
            
            var newPost = {
                title: titleInput.val().trim(),
                body: bodyInput.val().trim(),
                author: user
            };
    
            if (updating) {
                newPost.id = postId;
                updatePost(newPost);
            }
    
            else {
                submitPost(newPost);
            }
        });
        
    };

    //submit a post
    function submitPost(post) {
        $.ajax("/api/posts", {
            type: "POST",
            data: post
        }).then(function () {
            window.location.replace("/home")
        });
    };

    // Update a given post, bring user to the home page when done
    function updatePost(post) {
        $.ajax({
            method: "PUT",
            url: "/api/posts",
            data: post
        })
            .then(function () {
                window.location.replace("/home");
            });
    };




});