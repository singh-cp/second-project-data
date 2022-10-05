const locationController = {
  async getLocations(req, res, next) {
    try {
      const database = global.db.collection("locations");
      let locations = await database.find({}).project({ _id: 0 }).toArray();
      return res.json({ locations });
    } catch (error) {
      next(new Error());
    }
  },
};

export default locationController;
