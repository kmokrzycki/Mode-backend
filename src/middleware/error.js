const errorResponse = (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		statusCode: 500,
		error: err.message,
	})
};

module.exports = { errorResponse};