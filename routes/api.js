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
        lat: req.body.lat,
        lon: req.body.lon
    });

    res.json({
        userId: id++
    });
};

exports.createEvent = function (req, res) {
    events.push({
        eventName: req.body.eventName,
        location: {
            lat: req.body.lat,
            lon: req.body.lon
        },
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

/*exports.getTranscript = function(req, res) {
    var _req = request.get({
        headers: headers,
        url: url + '/' + req.body.chatId + '/messages',
        body: JSON.stringify({
            index: req.body.index || 0
        })
    }, function(err, _res, body) {
        res.json(body);
    });
}*/

exports.getTopTenNearestEvents = function (req, res) {

    Math.toRadians = function(degrees) {
        return degrees * Math.PI / 180;
    }

    aLat = req.body.aLat;
    aLon = req.body.aLon;
    bLat = req.body.bLat;
    bLon = req.body.bLon;

    var R = 6371; // km
    var la1 = Math.toRadians(aLat);
    var la2 = Math.toRadians(bLat);
    var de1 = Math.toRadians(aLat-bLat);
    var de2 = Math.toRadians(aLon-bLon);

    var a = Math.sin(de1/2) * Math.sin(de1/2) +
            Math.cos(la1) * Math.cos(la2) *
            Math.sin(de2/2) * Math.sin(de2/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    console.log(d);

    /*var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
        origins: aLat + ',' + aLon,
        destinations: bLat + ',' + bLon,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC

    }, callback);

    function callback(response, status) {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        for (var i = 0; i < origins.length; i++ ){
             var results = response.rows[i].elements;
             console.log(results[i].distance.value);
        }
    }*/

/*
    var _req = request.post({
        url : 'https://maps.googleapis.com/maps/api/distancematrix/json',
        body : {
            
            
            mode: 'driving',
            language: 'en-US',
            key: 'AIzaSyB74Y__wCGV9dvXK8mWlQR-FTZavQzRcc4'
        }
    }, function (err, _res, body) {
        console.log(body)
    });*/

}

/*exports.getTranscript = function(req, res) {
    var _req = request.get({
        headers: headers,
        url: url + '/' + req.body.chatId + '/messages',
        body: JSON.stringify({
            index: req.body.index || 0
        })
    }, function(err, _res, body) {
        res.json(body);
    });
}*/