import { isHttpError } from "http-errors";

const Errorhandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = "server Error";
  if (isHttpError(err)) {
    statusCode = err.status;
    errorMessage = err.message;
  }
  res.status(statusCode).json({ status: "failed", message: errorMessage });
};

export default Errorhandler;
