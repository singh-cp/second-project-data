const interestController = {
  async getInterests(req, res, next) {
    try {
      const database = global.db.collection("interests");
      let interests = await database.find({}).project({ _id: 0 }).toArray();
      return res.json({ interests });
    } catch (error) {
      next(new Error());
    }
  },
};

export default interestController;
