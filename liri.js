require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js")
var Spotify = require('node-spotify-api'); // this line requires the 'node-spotify-api' package
var Twitter = require('twitter'); // this line requires the '???' package
var spotify = new Spotify(keys.spotify);
var myTwitter = new Twitter(keys.twitter);
var action = process.argv[2];
var value = process.argv[3];
function spotThisSong(value) {

    //var client = new Twitter(keys.twitter);

    spotify.search({
        type: 'track',
        query: value
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].href);
        console.log(data.tracks.items[0].album.name);




    });
}
function liri(action, value) {
    switch (action) {

        case "spotify-this-song":
            spotThisSong(value);
            break;

        case "my-tweets":
            myTweet(value);
            break;

        case "movie-this":
            movieThis(value);
            break;

        case "do-what-it-says":
            justDoIt(value);
            break;
    }
};

liri(action, value);

function myTweet(value) {

    var param = {
        screen_name: '@DavidTu35349766'
    }
    client.get('status/user_timeline', {
    }, function (error, tweets, response) {
        if (error) {
            return console.log(error)
        }
        for (var i = 0; i < 20; i++) {
            console.log(tweets[i].text)
        }
    });
}

function movieThis(value) {
    if (!value) {
        value = "Mr. Nobody";
    }
    var omdbApi = require('omdb-client');

    var params = {
        apiKey: 'trilogy',
        title: value
    }
    omdbApi.get(params, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Movie Title: " + data.Title);
        console.log("Release Year: " + data.Year);
        console.log("IMDB Rating: " + data.imdbRating);
        console.log( "Rotten Tomatoes Rating: " + data.Ratings[0].Value);
        console.log("Country: " + data.Country);
        console.log("Language: " + data.Language);
        console.log("Plot: " + data.Plot);
        console.log("Actors: " + data.Actors);
    });
 
 }
 
 function justDoIt(value) {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var input = (data.split(','));
        var command = input[0]
        var result = input[1]
 
        if (error) {
            return console.log(error);
        }
 
        console.log(input);
        liri(command, result)
 
 
 
    });
 
 }