
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

  io = require('socket.io'),
  request = require('request');

var app = module.exports = express();

// statics

var headers = {
      apikey: 'N18TFGbKpn0zaGLXDFZhPWpTcB2eyx44'
  },
  url = 'http://localhost:8888/api/v2/chats';

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
// to-do: implement getChat
app.post('/api/createUser', api.createUser);
app.post('/api/createEvent', api.createEvent);
app.post('/api/watchEvent', api.watchEvent);
app.post('/api/getEvent', api.getEvent);
app.post('/api/getUser', api.getUser);
// app.post('/api/createChatRoom', api.createChatRoom); // seems like a duplicate of createEvent
app.post('/api/sendStartTypingNotification', api.sendStartTypingNotification);
app.post('/api/sendStopTypingNotification', api.sendStopTypingNotification);
// app.post('/api/sendMessage', api.sendMessage);
app.post('/api/complete', api.complete);
app.post('/api/getNearestEvents', api.getNearestEvents);
app.post('/api/getSubscriptions', api.getSubscriptions);
app.post('/api/getTranscript', api.getTranscript);

/**
 * Start Server
 */

var server = http.createServer(app),
  userCount = 0;

// socket.io

// client has to use io() to create a client socket
// the client socket can listen to what the server emits
// the server socket can listen to what the client emits
// they can communicate through the emitted objects

var socket = io(server).on('connection', function (socket) {
    console.log(++userCount + " user(s) connected");
    socket.on('disconnect', function () {
      console.log("a user has disconnected");
      userCount--;
    }).on('new message', function (req) { // notification from client
      request.post({
          headers: headers,
          url: url + '/' + req.chatId,
          body: JSON.stringify({
              operationName: 'SendMessage',
              text: req.message
          })
      }, function (err, _res, body) {
        request.get({
            headers: headers,
            url: url + '/' + req.chatId + '/messages'
        }, function (err, _res, body) {
          socket.emit('update messages', JSON.stringify(body).messages); // broadcasting to all clients
        });
      });
    });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});