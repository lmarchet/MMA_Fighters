$(document).ready(function() {
  // used the variable name "topics" as per homework instructions, even though it is not my preference....
  var topics = ["GSP", "Daniel Cormier", "Stipe Miocic", "Conor McGregor","Tyron Woodley", "Max Holloway", "TJ Dillashaw", "Demetrious Johnson", "Chis Cyborg", "Amanda Nunes", "Rose Namajunas", "Chuck Liddell"];	

  //  function declaration that creates buttons based on the list of topics array
  function showButtons(){

    // for loop to go through the array and create the buttomns
    // need to add class and atributes and name
    // have to append the buttons in the webpage
    $("#button-list").html(""); // cleans the button list before a new buttom is added and showButtons function add back the buttons
    for (var i = 0; i < topics.length; i++) {
      var plugButton = $("<button>");

      plugButton.addClass("mma");
      plugButton.attr("data-name", topics[i]);
      plugButton.text(topics[i]);
      $("#button-list").append(plugButton);
    }
  }    
  
  showButtons(); // call showButtons function to show the buttons on webpage
  
  //document .on click #1
  $(document).on("click", ".mma", function() {

    var martialArts = $(this).html(); 
    console.log(martialArts); // returns the fither name. console log for testing purposes only. Can be removed

    // saved the Giphy API key generated for me by Giphy into the variable query URL: V84y8eRd2dBpYNfwJdjqzO0AY4MzYkkb 
    // switched the protocol in the queryURL from http to https, as per homework instructions as the app may not work properly with Github Pages
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + martialArts + "&api_key=V84y8eRd2dBpYNfwJdjqzO0AY4MzYkkb&limit=10";
    console.log(queryURL); // console log for testing purposes only. Can be removed
    
    /* AJAX call for the mma fighter selected when a button has been clicked and returns
    all the details pertained to that fighter */
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {

      var fighterResult = response.data;
      console.log(fighterResult); // returns all fighter's detail from Giphy

       // A for loop to create divs with fighters images
      for (var j=0; j < fighterResult.length; j++) {
        var imageDiv = $("<div>");
        var imageView = fighterResult[j].images.downsized_medium.url;
        var imageStill = fighterResult[j].images.downsized_still.url;
        console.log(imageView);  // console log for testing purposes only. Can be removed

        var image = $("<img>").attr("src", imageStill).attr("data-animate", imageView).attr("data-still", imageStill);
            image.attr("data-state", "still");
            $("#fighter-view").prepend(image);
            image.on("click", animateFighter);

        // Gets ratings for each movie
        var rating = fighterResult[j].rating;
            //  console.log(rating);// console log for testing purposes only. Can be removed

        var movieRate= $("<p>").text("Rating: " + rating + "Viewer discretion is advised.");
        $("#fighter-view").prepend(movieRate);
      } // end of for loop
    }); // end of ajax call

    function animateFighter() { 
      var state = $(this).attr("data-state");
      console.log(state);
      if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    } // end of function animateFighter

}); // end of document .on click #1

  //document .on click #2 - adding new button to array
  $(document).on("click", "#add-fighter", function() {
    if ($("#fighter-input").val() == "") {
      alert("Come on dude!!!! Give me a name: ");
    }
    else {
      var movies = $("#fighter-input").val().trim();
      topics.push(movies);
      $("#fighter-input").val("");
      $("button-list").html("");

      showButtons();
      return false;
    }
  });// end of document .on click #2
}); // end of document .on ready