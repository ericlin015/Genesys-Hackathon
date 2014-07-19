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

exports.createEvent = function(req, res) {
    events.push({
        eventName: req.body.eventName,
        location: { req.body.lat, req.body.lon },
        sport: req.body.sport,
        maxCapacity: req.body.capacity,
        price: req.body.price
    });

    res.json({

    });
}

