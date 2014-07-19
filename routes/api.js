var request = require('request');

exports.name = function(req, res) {
    res.json({
        name: 'Bob'
    });
};

var id = 0,
    users = [],
    events = [],
    listOfSports = ["Soccer", "Basketball", "Tennis"];

exports.createUser = function (req, res) {
    users.push({
        userId: id,
        name: req.body.userName,
        postalCode: req.body.postalCode
    });

    res.json({
        userId: id++
    });
};

exports.createEvent = function (req, res) {
    events.push({
        eventName: req.body.eventName,
        location: { x: req.body.lat, y: req.body.lon },
        sport: req.body.sport,
        maxCapacity: req.body.capacity,
        price: req.body.price
    });
};

exports.getUser = function (req, res) {
	var userId = parseInt(req.body.userId),
		ret;

	users.some(function (user) {
		if (userId === user.userId) {
			ret = user;
			return true;
		}
	});

    if (ret === void(0)) {
        // handle failure better
        ret = {};
    }

	res.json(ret);
};

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

exports.sendStartTypingNotification = function(req, res) {
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

exports.sendStopTypingNotification = function(req, res) {
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
