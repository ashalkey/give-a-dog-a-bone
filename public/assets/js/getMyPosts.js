$(document).ready(function() {


    var cardDiv = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h5>").addClass("card-title");
    var cardSubtitle = $("<h6>").addClass("card-subtitle mb-2 text-muted");
    var cardText = $("<p>").addClass("card-text");

    $("#myPosts").click(function() {
        console.log("clicked myPosts button");

        $.get("/api/posts", function(data) {
            console.log(data);
            var mostRecentPost = data[data.length-1];
            cardTitle.text(mostRecentPost.title);
            cardSubtitle.text("Author: " + mostRecentPost.author);
            cardText.text(mostRecentPost.body);
        }).then(function(){
            console.log("we be done");
            cardDiv.append(cardBody);
            cardBody.append(cardTitle);
            cardTitle.append(cardSubtitle);
            cardSubtitle.append(cardText);
            $("#mostRecentPost").append(cardDiv);
        });
    });
});