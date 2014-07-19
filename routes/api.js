// requires

var request = require('request');

// test API

exports.name = function(req, res) {
    res.json({
        name: 'Bob'
    });
};

// constants

var R = 6371;

// custom API

var id = 0,
    users = [],
    events = [];

exports.createUser = function (req, res) {
    users.push({
        userId: id,
        name: req.body.userName,
        postalCode: req.body.postalCode/*,
        lon: req.body.gps.B,
        lat: req.body.gps.k*/
    });

    res.json({
        userId: id++
    });
};

exports.createEvent = function (req, res) {
    events.push({
        eventName: req.body.eventName,
        lat: req.body.lat,
        lon: req.body.lon,
        sport: req.body.sport,
        maxCapacity: req.body.capacity,
        price: req.body.price
    });
};

exports.getUser = function (req, res) {
    res.json(getUser(parseInt(req.body.userId)));
};

exports.getNearestEvents = function (req, res) {
    var userLocation = {
            lat: req.body.lat,
            lon: req.body.lon
        },
        max = req.body.max || 10;

    var arr = events.slice().sort(function (a, b) {
        return (getDistance(userLocation, a) > getDistance(userLocation, b))
            ? 1
            : (getDistance(userLocation, a) < getDistance(userLocation, b))
                ? -1
                : 0;
    }).slice(0, max);

    res.send(arr);
};

// chat API

var headers = {
        apikey: 'N18TFGbKpn0zaGLXDFZhPWpTcB2eyx44'
    },
    url = 'http://localhost:8888/api/v2/chats';

exports.createChatRoom = function(req, res) {
    request.post({
        headers: headers,
        url: url,
        body: JSON.stringify({
            operationName: 'RequestChat',
            nickname: req.body.nickname,
            subject: req.body.subject
        })
    }, function (err, _res, body) {
        res.json(body);
    });
};

exports.sendMessage = function (req, res) {
    request.post({
        headers: headers,
        url: url + '/' + req.body.chatId,
        body: JSON.stringify({
            operationName: 'SendMessage',
            text: req.body.text
        })
    }, function (err, _res, body) {
        res.json(body);
    });
};

exports.sendStartTypingNotification = function (req, res) {
    var _req = request.post({
        headers: headers,
        url : url + '/' + req.body.chatId,
        body: JSON.stringify({
            operationName: "SendStartTypingNotification"
        })
    }, function(err, _res, body) {
        res.json(body);
    });
};

exports.sendStopTypingNotification = function (req, res) {
    var _req = request.post({
        headers: headers,
        url : url + '/' + req.body.chatId,
        body: JSON.stringify({
            operationName: "SendStopTypingNotification"
        })
    }, function(err, _res, body) {
        res.json(body);
    });
};

exports.complete = function (req, res) {
    request.post({
        headers: headers,
        url: url + '/' + req.body.chatId,
        body: JSON.stringify({
            operationName: 'Complete'
        })
    }, function (err, _res, body) {
        res.json(body);
    });
};

// Helpers

function getUser(userId) {
    var ret;

    users.some(function (user) {
        if (userId === user.userId) {
            ret = user;
            return true;
        }
    });

    return ret || {};
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function getDistance(loc1, loc2) {
    var la1 = toRadians(loc1.lat),
        la2 = toRadians(loc2.lat),
        de1 = toRadians(loc1.lat - loc2.lat),
        de2 = toRadians(loc1.lon - loc2.lon),

        a = Math.sin(de1 / 2) * Math.sin(de1 / 2) +
            Math.cos(la1) * Math.cos(la2) *
            Math.sin(de2 / 2) * Math.sin(de2 / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        d = R * c; // distance

    return d;
}