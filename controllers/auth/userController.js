import ErrorHandler from "../../middlewares/ErrorHandler.js";

const userController = {
  async getUser(req, res, next) {
    try {
      return res.json({ user: req.user });
    } catch (error) {
      next(ErrorHandler.forbiddenError());
    }
  },
  async getUserData(req, res, next) {
    try {
      const { id } = req.user;
      const database = global.db.collection("profiles");
      let profile = await database.findOne(
        { profile_id: id },
        { projection: { _id: 0, password: 0, profile_id: 0, role: 0 } }
      );
      return res.json({ user: profile });
    } catch (error) {
      next(ErrorHandler.forbiddenError());
    }
  },
};

export default userController;
