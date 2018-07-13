console.log('this is loaded');

var TWITTER_CONSUMER_KEY = "TRaMND2q8nbfyonoUyMucfc1g"; 
var TWITTER_CONSUMER_SECRET = "Dqx2DzTNAwhAyijdDOH5irK1nvHpXXP9sEcPlZ3d9MHugSOzzu";
var TWITTER_ACCESS_TOKEN_KEY = "2890108565-bYkbUHoz2wpz5eDKrMqEw5YmruyvqPt8TBZouVS";
var TWITTER_ACCESS_TOKEN_SECRET = "NDRD9sap4YoboUmplYfPKBHK85HX5mX1Sb6jCxRRIRrZU";

var SPOTIFY_ID = "4de666d2c18c4904808211e81e328d8a";
var SPOTIFY_SECRET = "dc11eaafd2ae4a129012586f0cace1eb";


exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
