var express = require('express');
var app = express();
var util = require('util');

app.get('/rates', function(req, res) {
  setTimeout(function() {
    res.send('That\'s about 25 schmeckles')
  }, 500);
});

app.use(express.static(__dirname));

app.listen(3456);
console.log('Server running at http://localhost:3456');

