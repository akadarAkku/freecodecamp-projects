const TWITTER_URL = "https://twitter.com/intent/tweet?text=";
const QUOTE_URL = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";
const HEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e"];


$(document).ready(function() {
  getQuote();


  $(".newQuote").on("click", function() {
    getQuote();


  });

  $(".tweet").on("click", function() {
    var message = $(".message").text();
    var author = $(".author").text();
    author = "~" + author;
    var fullURL = TWITTER_URL + message + "%0A" + author;
    window.open(fullURL);
  });
});



function getRandomColor() {
  var hexCode = "#";
  for (var i = 0; i < 3; i++) {
    hexCode += HEX[Math.floor(Math.random() * 14) + 1];
  }
  return hexCode;
}

function changeColor(color) {
  $(".outer_container, .newQuote, .tweet").css("background-color", color);
  $(".message, .author").css("color", color);
}

function getQuote() {

  $.ajax({
    url: QUOTE_URL,
    dataType: "json",
    success: function(data) {
      console.log("ok");
      var message = data[0].content;
      var author = '<p class="author">' + data[0].title + '</p>';
      $(".quote").html(message + author);
      $(".quote p").addClass("message");
      $(".quote").children().last().removeClass("message");
      changeColor(getRandomColor());
    },
    cache: false
  });

  /*
  $.getJSON(QUOTE_URL,
    function(data) {
      var message = data[0].content;
      var author = '<p class="author">' + data[0].title + '</p>';
      $(".quote").html(message + author);
      $(".quote p").addClass("message");
      $(".quote").children().last().removeClass("message");
      changeColor(getRandomColor());
    });
    */
}
