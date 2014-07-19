/*
 * Serve JSON to our AngularJS client
 */


exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

var id = 0,
	users = [];

exports.createUser = function (req, res) {
	users.push({
		userId: id,
		name: req.body.userName,
		postalCode: req.body.postalCode
	});

	res.json({
		userId: id++
	});
}