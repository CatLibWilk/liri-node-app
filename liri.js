require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(client);