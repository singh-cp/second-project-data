import ErrorHandler from "./ErrorHandler.js";
import JWTToken from "../utilities/jwt/JWTToken.js";

async function PriceAuth(req, res, next) {
  const { local_id } = req.body;
  if (!local_id) {
    return next(ErrorHandler.missingFieldsError());
  }
  try {
    const database = global.db.collection("profiles");
    let profile = await database
      .find({ profile_id: local_id })
      .project({ _id: 0, password: 0, email: 0, phone: 0 })
      .toArray();
    if (profile.length === 1 && profile[0].city_name && profile[0].state_name) {
      req.local_info = {};
      req.local_info = {
        city: profile[0].city_name,
        state: profile[0].state_name,
        booking_amount: profile[0].price,
        local_id: local_id,
      };
      next();
    } else {
      next(ErrorHandler.missingFieldsError());
    }
  } catch (e) {
    next(ErrorHandler.forbiddenError());
  }
}

export default PriceAuth;
