module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      // known (handled) error
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // programming or unknown error
    console.error("ERROR:", err);
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};
