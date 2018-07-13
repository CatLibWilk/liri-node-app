require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");

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
    console.log("spotify function was called");
}

function movie(){
    console.log("movie function was called");
}

function doSay(){
    console.log("doSay function was called");
}
