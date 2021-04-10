const errorResponse = (err, req, res, next) => {
    const status = err.status || 500;
	res.status(status).json({
		statusCode: status,
		error: err.message,
	})
};

module.exports = { errorResponse};