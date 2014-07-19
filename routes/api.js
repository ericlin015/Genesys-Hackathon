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