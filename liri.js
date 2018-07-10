require("dotenv").config();

var needeKeys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(client);