import JWTToken from "../../utilities/jwt/JWTToken.js";
import ErrorHandler from "../../middlewares/ErrorHandler.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { JWT_SECRET } from "../../config/index.js";
import usernameGenerator from "../../config/username/usernameGenerator.js";

const registerController = {
  async register(req, res, next) {
    const { email, password, name } = req.body;
    const database = await global.db.collection("profiles");
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const uniqueId = await usernameGenerator(name, email, password);
      database.insertOne(
        {
          name: name,
          email: email,
          password: hashPassword,
          profile_id: uniqueId,
          role: "User",
        },
        (err, results) => {
          if (err) {
            return next(ErrorHandler.registrationError());
          } else {
            return res.json({
              message: "Account Created!",
            });
          }
        }
      );
    } catch (error) {
      return next(new Error());
    }
  },
};

export default registerController;
