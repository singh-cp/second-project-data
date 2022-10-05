import ErrorHandler from "../../middlewares/ErrorHandler.js";

const getProfileController = {
  async getLocal(req, res, next) {
    const { profileId } = req.params;
    try {
      const database = global.db.collection("profiles");
      let profile = await database
        .find({ profile_id: profileId })
        .project({ _id: 0, password: 0, email: 0, phone: 0, role: 0 })
        .toArray();
      if (profile.length === 1) {
        res.json({ profile: profile[0] });
      }
    } catch (e) {
      next(ErrorHandler.forbiddenError());
    }
  },
  async allProfiles(req, res, next) {
    try {
      const database = await global.db.collection("profiles");
      let profile = await database
        .find({})
        .project({ _id: 0, password: 0, email: 0, phone: 0, role: 0 })
        .toArray();

      res.json({ profiles: profile });
    } catch (e) {
      next(ErrorHandler.serverError());
    }
  },
};

export default getProfileController;
