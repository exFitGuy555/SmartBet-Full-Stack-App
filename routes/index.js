//ENDPOINT MANAGER


exports.index = (req, res) => {
	let message = '';
	res.render('Home', {
		message: message
	})
};

exports.stats = (req, res) => {
	let message = '';
	res.render('Stats', {
		message: message
	})
};

exports.contact = (req, res) => {
	let message = 'hi please Register';
	res.render('contact', {
		message: message
	})
};

exports.login = (req, res) => {
	let message = 'hi please Login';
	res.render('Login', {
		message: message
	})
};

exports.Odds = (req, res) => {
	res.render('Odds', {
	})
};


exports.Chat = (req, res) => {
	if(!req.session.user){
		let message = 'Please Login To Reach Live Bet Ring';
		res.render('login', {
			message: message
		})
	} else {
		res.render('LiveBetRing')
	}
		

};




