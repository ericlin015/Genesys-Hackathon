
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorhandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),

  io = require('socket.io');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorhandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// custom routes
// to-do: implement pickEvents and getChat
app.post('/api/createUser', api.createUser);
app.post('/api/createEvent', api.createEvent);
app.post('/api/getUser', api.getUser);
app.post('/api/createChatRoom', api.createChatRoom);
app.post('/api/sendStartTypingNotification', api.sendStartTypingNotification);
app.post('/api/sendStopTypingNotification', api.sendStopTypingNotification);
app.post('/api/sendMessage', api.sendMessage);
app.post('/api/complete', api.complete);
app.post('/api/getNearestEvents', api.getNearestEvents);

/**
 * Start Server
 */

var server = http.createServer(app),
  userCount = 0;

// socket.io

io(server).on('connection', function (socket) {
    console.log(++userCount + " user(s) connected");
    socket.on('disconnect', function () {
      console.log("a user has disconnected");
      userCount--;
    });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});