require('dotenv').config()
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var twitterKeys = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotifyKeys = new Spotify(keys.spotify);


var input = process.argv;
var command = input[2];
var arr = "";
for (var i = 3; i < input.length; i++) {
    if (i > 3 && i < input.length) {
        arr = arr + "+" + input[i];
    } else {
        arr = arr + input[i];
    }
}


switch (command) {
    case "show-tweets":
        tweet();
        break;

    case "spotify":
        if (arr) {
            spotify(arr);
        } else {
            spotify("Taylor Swift Love Story");
        }
        break;

    case "search-movie":
        if (arr) {
            omdb(arr)
        } else {
            omdb("Iron Man")
        }
        break;

    case "do-what-it-says":
        random();
        break;

    default:
        console.log("{Please enter your command: (options: show-tweets, spotify, search-movie, do-what-it-says}");
        break;
}


function omdb(movie) {
    var URL = 'http://www.omdbapi.com/?t=' + movie + "&y=&plot=short&apikey=40e9cece";

    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            console.log("Title of the move: " + body.Title);
            console.log("Year the movie came out: " + body.Year);
            console.log("IMdB Rating of the movie: " + body.imdbRating);
            console.log("Country produced: " + body.Country);
            console.log("Language of the movie: " + body.Language);
            console.log("Plot of the movie: " + body.Plot);
            console.log("Actors in the movie: " + body.Actors);
        } else {
            console.log('Error occurred.')
        }
        if (movie === "") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        }
    });
};

function tweet() {
    var tweetAccount = {screen_name: 'ThePhoenixRises'};
    twitterKeys.get('ThePhoenixRises/user_timeline', tweetAccount, function (err, tweets, response) {
        if (err) {
            console.log('Sorry, we cannot get your tweets');
        }
        else if (!err) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@ThePhoenixRises: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");
            }
        };
    });
}

function spotify(songName) {
    spotifyKeys.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred.');
        } else if (!err) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                console.log("Artist: " + songData.artists[0].name);
                console.log("Name of the song: " + songData.name);
                console.log("Preview link from Spotify: " + songData.preview_url);
                console.log("Album: " + songData.album.name);
            }
        }
    });
}



