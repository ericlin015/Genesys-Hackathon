/*
 * Serve JSON to our AngularJS client
 */
var http = require('http');

exports.name = function(req, res) {
    res.json({
        name: 'Bob'
    });
};

var id = 0,
    users = [],
    events = [],
    listOfSports = ["Soccer", "Basketball", "Tennis"];

exports.createUser = function(req, res) {
    users.push({
        userId: id,
        name: req.body.userName,
        postalCode: req.body.postalCode
    });

    res.json({
        userId: id++
    });
}

exports.createEvent = function(req, res) {
    events.push({
        eventName: req.body.eventName,
        location: { x: req.body.lat, y: req.body.lon },
        sport: req.body.sport,
        maxCapacity: req.body.capacity,
        price: req.body.price
    });
}

/*
exports.createChatRoom = function(req, res) {
    http.post({
        host: 'localhost',
        port: 8888,
        path: '/api/v2/chats'
    }, function(res) {
        console.log(res);
    });
}*/