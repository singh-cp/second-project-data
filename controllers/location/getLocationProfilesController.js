import ErrorHandler from "../../middlewares/ErrorHandler.js";

const getCityProfileController = {
  async getLocationProfiles(req, res, next) {
    const { locationName } = req.params;
    try {
      const database = global.db.collection("profiles");
      let profiles = await database
        .find({ $text: { $search: locationName }, price: { $ne: 0 } })
        .project({
          _id: 0,
          password: 0,
          role: 0,
          email: 0,
          phone: 0,
        })
        .sort({ price: 1 })
        .toArray();
      return res.json({ profiles });
    } catch (error) {
      next(new Error());
    }
  },
};

export default getCityProfileController;
