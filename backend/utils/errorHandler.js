const handleError = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 if statusCode is 200
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  export default handleError;
  