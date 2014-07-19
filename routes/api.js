/*
 * Serve JSON to our AngularJS client
 */


exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

var i = 0,
	users = [];

exports.createUser = function (req, res) {
	users.push({
		name: req.userName,
		postalCode: req.postalCode
	});

	res.json({
		userId: i++
	});
}