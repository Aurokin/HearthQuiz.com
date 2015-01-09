/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  //POST DATA

  var postPort = 80;
  if (process.env.NODE_ENV == 'development') {
    postPort = 1337;
  }
  //Setup Data
  var http = require('http');
  var cards = require('../assets/json/AllSets.json');
  var jsonData = JSON.stringify(cards);
  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(jsonData, 'utf8')
  };
  var options = {
    host: 'localhost',
    port: postPort,
    path: '/insertCards',
    method: 'POST',
    headers: headers
  };

  //Setup Request
  var reqs = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      console.log('Database Ready!');
    });
  });
  reqs.on('error', function(e) {
    // TODO: handle error.
  });

  //POST
  reqs.write(jsonData);
  reqs.end();

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
