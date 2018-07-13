require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var service = process.argv[2];
var input = process.argv[3];


////interprets the service bein requested//////
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
