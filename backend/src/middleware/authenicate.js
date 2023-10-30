import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const bearerHandler = req.headers.authorization;
  if (bearerHandler != undefined) {
    const bearer = bearerHandler.split(" ");
    const token = bearer[1];
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    if (id) {
      req.userId = id;
      next();
    } else {
      next(createHttpError(404, "User not Authenicate..."));
    }
  } else {
    next(createHttpError(404, "Token Not Found..."));
  }
};

export default auth;
