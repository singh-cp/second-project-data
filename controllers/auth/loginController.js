import JWTToken from "../../utilities/jwt/JWTToken.js";
import { JWT_SECRET } from "../../config/index.js";
import ErrorHandler from "../../middlewares/ErrorHandler.js";
import bcrypt from "bcrypt";

const loginController = {
  async login(req, res, next) {
    const { email, password } = req.body;
    const database = global.db.collection("profiles");
    let user = await database
      .find({ email: email })
      .collation({ locale: "en", strength: 2 })
      .toArray();
    if (user !== null && user !== undefined && user.length === 0) {
      return next(ErrorHandler.notFoundError());
    }
    if (user.length === 1) {
      try {
        let verifiedPassword = await bcrypt.compare(password, user[0].password);
        if (verifiedPassword === true) {
          return res.json({
            access_token: JWTToken.login(
              { id: user[0].profile_id, role: user[0].role },
              "86400s"
            ),
          });
        } else {
          return next(ErrorHandler.emailPasswordError());
        }
      } catch (e) {
        return next(new Error());
      }
    }
    return next(new Error());
  },
};

export default loginController;
