const errorResponse = (err, req, res, next) => {
	console.error('>>>', err);
    const status = err.status || 500;
	res.status(status).json({
		statusCode: status,
		error: err.message,
	})
};

module.exports = { errorResponse};