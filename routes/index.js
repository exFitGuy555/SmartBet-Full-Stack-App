//ENDPOINT MANAGER


exports.index = (req, res) => {
	var message = '';
	res.render('Home', {
		message: message
	})
};

exports.stats = (req, res) => {
	var message = '';
	res.render('Stats', {
		message: message
	})
};

exports.contact = (req, res) => {
	var message = 'hi please Register';
	res.render('contact', {
		message: message
	})
};

exports.login = (req, res) => {
	var message = 'hi please Login';
	res.render('Login', {
		message: message
	})
};