require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var service = process.argv[2];
var input = process.argv[3];
var twitParams = {
    q: '#nodejs',
    count: 20,
    result_type: 'recent',
    lang: 'en'
  }
var movieInput = "";

/////does special actions if movie-this service selected/////
if(service === "movie-this"){
    if(input == null){
        movieInput = "Mr.+Nobody"
    }else{
        function makeMovieUrl (){
            console.log("makemovie run")
            var movieTitle = input.split(" ");
            for(var k = 0; k<movieTitle.length; k++){
                var newWord = movieTitle[k] + "+";
                movieInput = movieInput+newWord;
            }
            movieInput = movieInput.slice(0, movieInput.length-1);
        }

        makeMovieUrl();
    }
}

var movieUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy";

////interprets the service being requested//////
switch(service) {
    case "my-tweets":
        tweet();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doSay();
        break;

    
    default:
        console.log("please select one of the services to use.")
}

////servicefunctions defined/////////////


function tweet(){
    console.log("tweet function was called");
    client.get("statuses/user_timeline", twitParams, function(error, tweets, response) {
        if(!error && response.statusCode === 200) {
            console.log(tweets);
            for(var i = 0; i<tweets.length; i++){
                var titleEnd = tweets[i].text.indexOf("http");
                var title = tweets[i].text.slice(0, titleEnd);

                var createdDate = tweets[i].created_at

                var print = createdDate + ", " + title;
                console.log(print);
            }
        }
        
        if(error){
            console.log("response code error");
        }
    });
}

function spotifySong(){
    var searchInput = "";
    if(input != null){
        searchInput = input;
        spotify.search({ type: 'track', query: searchInput, limit:1}, function(err, data) {
            if (err){
                console.log('Error occurred: ' + err);
                return;
            }

            console.log(input);
            var artist = (data.tracks.items[0].artists[0].name);
            console.log("Artist: ", artist);
    
            var song = data.tracks.items[0];
            console.log("Song Title: ", song.name);
    
            var album = data.tracks.items[0].album.name;
            console.log("Album title: ", album);

    
            var preview = data.tracks.items[0].preview_url;

            if(preview === null){
                console.log("Sorry, no preview is available");
            }else{
            console.log("Listen to a preview here: ", preview);
            }
        });
    }else{
        spotify.search({ type: 'track', query: "The Sign", limit:6}, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

            // console.log(data.tracks.items[5], null, 2);

            var artist = (data.tracks.items[5].artists[0].name);
            console.log("Artist: ", artist);
    
            var song = data.tracks.items[5];
            console.log("Song Title: ", song.name);
    
            var album = data.tracks.items[5].album.name;
            console.log("Album title: ", album);
    
            var preview = data.tracks.items[5].preview_url;
            console.log("Listen to a preview here: ", preview);
            
        }
    )}
};
    
        
function movie(){
    console.log("movie function run");

    // if(input != null){
        request(movieUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
                
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("This movie was released in: " + JSON.parse(body).Year);
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                    var rottenRating = JSON.parse(body).Ratings[1];
                console.log("Rotten Tomatoes rates it at: " + JSON.stringify(rottenRating["Value"]));
                console.log("Country of production: ", JSON.parse(body).Country);
                console.log("Language(s) spoken in the film: ", JSON.parse(body).Language);
                console.log("Plot: ", JSON.parse(body).Plot);
                console.log("Featured performers: ", JSON.parse(body).Actors);
            }
        });
    // }
};

function doSay(){
    console.log("doSay function was called");
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error){
          return console.log(error);
        }
        
        var command = data.split(",");
        service = command[0];

        input = command[1];

        switch(service) {
            case "my-tweets":
                tweet();
                break;
        
            case "spotify-this-song":
                spotifySong();
                break;
        
            case "movie-this":
                movie();
                break;
        
            case "do-what-it-says":
                doSay();
                break;
        
            
            default:
                console.log("please select one of the services to use.")
        }
    });
}

