var router    = require('express').Router();
var natural   = require('natural');
var Twitter   = require('twitter');
var config    = require('./config');
var trainData = require('./train');

var client = new Twitter(config);
var classifier = new natural.BayesClassifier();
var all_tweets = [];

function train() {
  trainData.forEach(function(item) {
    classifier.addDocument(item[0], item[1]);
  });
  classifier.train();
}

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
  res.render('index');
});

router.route('/username/:username').get(function(req, res) {
  train();
  var username = req.params.username;
  var params = {screen_name: username, count:100};
  all_tweets = []
  
  client.get('statuses/user_timeline', params,
    function(error, tweets, response){
      if (!error) {
        var counts = {positive: 0, negative:0};
        tweets.forEach(function(tweet) {
          var sentiment = classifier.classify(tweet.text);
          if (sentiment == "positive") {
            counts['positive'] += 1
          }else {
            counts['negative'] += 1
          }
          all_tweets.push({tweet: tweet.text, sentiment: sentiment})
        });
        res.render('username',
          {
            username: username,
            tweets: all_tweets.slice(0, 10),
            total: tweets.length,
            page: 1,
            count: counts
          }
        );
      }else {
        res.render('index', {error: "Böyle bir kullanıcı adı bulamadım :("});
      }
    });
});

router.route('/username/:username/:page').get(function(req, res) {
  train();
  var page = req.params.page;
  var username = req.params.username;
  all_tweets = []
  var start = (page-1) * 10;
  var end = (page) * 10;

  var params = {screen_name: username, count:100};
  client.get('statuses/user_timeline', params,
    function(error, tweets, response){
      if (!error) {
        var counts = {positive: 0, negative:0};
        tweets.forEach(function(tweet) {
          var sentiment = classifier.classify(tweet.text);
          if (sentiment == "positive") {
            counts['positive'] += 1
          }else {
            counts['negative'] += 1
          }
          all_tweets.push({tweet: tweet.text, sentiment: sentiment})
        });
        res.render('username',
          {
            username: username,
            tweets: all_tweets.slice(start, end),
            total: tweets.length,
            page: page,
            count: counts
          }
        );
      }else {
        res.render('index', {error: "Böyle bir kullanıcı adı bulamadım :("});
      }
    });
});

module.exports.router = router;
