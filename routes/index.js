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

exports.Odds = (req, res) => {
	res.render('Odds', {
	})
};


exports.Approval = (req, res) => {
	res.render('Odds',{
		message:'Your Odds Calculation Saved !'
	})
}
