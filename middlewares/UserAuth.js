import ErrorHandler from "./ErrorHandler.js";
import JWTToken from "../utilities/jwt/JWTToken.js";

async function UserAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return next(ErrorHandler.forbiddenError());
  }
  const splitToken = token.split(" ")[1];
  try {
    const { id, role } = await JWTToken.verify(splitToken);
    const database = global.db.collection("profiles");
    let profile = await database
      .find({ profile_id: id })
      .project({ _id: 0, password: 0, email: 0 })
      .toArray();
    if (profile.length === 1 && profile[0].role === role) {
      req.user = {};
      req.user = { id: profile[0].profile_id, role: profile[0].role };
      next();
    }
  } catch (e) {
    next(ErrorHandler.forbiddenError());
  }
}

export default UserAuth;
