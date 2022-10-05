const languageController = {
  async getLanguages(req, res, next) {
    try {
      const database = global.db.collection("languages");
      let languages = await database.find({}).project({ _id: 0 }).toArray();
      return res.json({ languages });
    } catch (error) {
      next(new Error());
    }
  },
};

export default languageController;
