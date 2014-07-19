var sports = [
	"Soccer",
	"Basketball",
	"Ultimate Frisbee",
	"Rugby",
	"American Football",
	"Volleyball",
	"Baseball",
	"Running",
	"Badminton",
	"Tennis",
	"Other..."
];

exports.users = [
	{
        userId: 0,
        name: 'David',
        lat: 43 + Math.random(),
        lon: -79 - Math.random(),
        subscriptions: []
    }, {
        userId: 1,
        name: 'Tyron',
        lat: 43 + Math.random(),
        lon: -79 - Math.random(),
        subscriptions: []
    }, {
        userId: 2,
        name: 'Eric',
        lat: 43 + Math.random(),
        lon: -79 - Math.random(),
        subscriptions: []
    }, {
        userId: 3,
        name: 'Gleb',
        lat: 43 + Math.random(),
        lon: -79 - Math.random(),
        subscriptions: []
    }
];

var events = [];
for (var i = 0; i < 30; i++) {
	events.push({
		userId: parseInt(Math.random() * 4),
		lat: 43 + Math.random(),
        lon: -79 - Math.random(),
        sport: sports[parseInt(Math.random() * 11)],
        capacity: parseInt(Math.random() * 10),
        price: parseInt(Math.random() * 30)
	});
}

exports.events = events;