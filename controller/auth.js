const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY

function authenticate(req, res, next) {
	if((req.originalUrl === '/login') || (req.originalUrl == '/user')) {
	} else {
		console.log(`(^.^)// Being Accessed by: ${req.originalUrl}`)
    	if (!req.headers.authorization) {
      		 res.status(401).end();
    	}
    	try {
      		const token = req.headers.authorization.split(' ')[1];
      		jwt.verify(token, secret);
    	} catch (err) {
      		console.error(err);
          return	res.status(401).end();

    	}
  	}
  next();
}

module.exports = {
  authenticate
};