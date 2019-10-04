
var axios = require("axios");
// to set the data format to MM/DD/YYYY"
var moment = require("moment");

var nodeArgs = process.argv;
var action = nodeArgs[2];


// Create an empty variable for holding the search value
var search_term = "";

// Loop through all the words in the node argument
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    search_term = search_term + "+" + nodeArgs[i];
  } else {
    search_term += nodeArgs[i];

  }
}

switch (action) {
  case "movie-this":
    movieThis(search_term);
    break;
  case "concert-this":
    concertThis(search_term);
    break;
  case "spotify-this":
    spotifyThis(search_term);
    break;
}
function movieThis(search) {
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  axios.get(queryUrl).then(
    function (response) {
      console.log(`Title: ${response.data.Title} \nRelease Year: ${response.data.Year} \nRatings: ${response.data.imdbRating} \nCast: ${response.data.Actors} \nLanguare: ${response.data.Language}`);
      //console.log("Ratings: " + response.data.imdbRating);
    })
}
function concertThis(search) {
  // Then run a request with axios to the OMDB API with the movie specified
  console.log(search);
  var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=31d46cee838222091e47fa5c877a9d23";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  axios.get(queryUrl).then(
    function (response) {
      //to get all the upcoming cencerts
      //for(var i =0;i< response.data.length;i++)
      //to get just first two concerts info....
      for (var i = 0; i < 2; i++) {
        console.log(`Venue: ${response.data[i].venue.name} \nCity: ${response.data[i].venue.city} \nCountry ${response.data[i].venue.country} \nDate & Time ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`);
      }
    })
}


