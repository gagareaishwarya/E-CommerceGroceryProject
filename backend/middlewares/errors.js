const ErrorHandler = require("../utils/errorHandler");

//separate Development and Production error
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(error)

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    //before sending error making copy of err
    let error = { ...err };

    error.message = err.message;

    //Wrong Mongoose Object ID Error ,we have to handle it in Production Mode for user
    if (err.name === "CastError") {
      const message = `Resource not found, Inavlid: ${err.path}`;
      //400 id BAD REQUEST
      error = new ErrorHandler(message, 400);
    }

    //Handling Mongoose validation errors
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //Handling mongoose duplicate key errors code=11000 when duplicate key occurs mongoerror
    if (err.code === 11000) {
      const message = "Duplicate email entered";
      //const message = `Duplicate ${Object.keys(err.keyValue)} entered`
      error = new ErrorHandler(message, 400);
    }

    //Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid, Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    //Handling expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired, Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
