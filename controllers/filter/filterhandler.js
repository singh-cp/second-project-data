const filterhandler = {
  async filter(req, res, next) {
    const { gender, price, languages, interests } = req.query;
    const { cityName } = req.params;
    const sortPrice = price || 1;
    let filterLanguage = languages?.split(",").map(Number) || [];
    let filterInterests = interests?.split(",").map(Number) || [];
    let query = {};
    if (gender && languages && interests) {
      query = {
        $text: { $search: cityName },
        price: { $ne: 0 },
        gender: gender,
        "interest.interest_id": { $in: filterInterests },
        "language_known.language_id": { $in: filterLanguage },
      };
    } else if (gender && languages) {
      query = {
        $text: { $search: cityName },
        price: { $ne: 0 },
        gender: gender,
        "language_known.language_id": { $in: filterLanguage },
      };
    } else if (gender && interests) {
      query = {
        $text: { $search: cityName },
        price: { $ne: 0 },
        gender: gender,
        "interest.interest_id": { $in: filterInterests },
      };
    } else if (languages && interests) {
      query = {
        $text: { $search: cityName },
        price: { $ne: 0 },
        "interest.interest_id": { $in: filterInterests },
        "language_known.language_id": { $in: filterLanguage },
      };
    } else if (gender) {
      query = {
        $text: { $search: cityName },
        price: { $ne: 0 },
        gender: gender,
      };
    } else if (languages) {
      query = {
        $text: { $search: cityName },
        price: { $ne: 0 },
        "language_known.language_id": { $in: filterLanguage },
      };
    } else if (interests) {
      query = {
        $text: { $search: cityName },
        price: { $ne: 0 },
        "interest.interest_id": { $in: filterInterests },
      };
    } else {
      query = { $text: { $search: cityName }, price: { $ne: 0 } };
    }
    const database = await global.db.collection("profiles");
    let profiles = await database
      .find(query)
      .project({
        _id: 0,
        password: 0,
        role: 0,
        email: 0,
        phone: 0,
      })
      .sort({ price: Number(sortPrice) })
      .toArray();
    res.json({ profiles });
  },
};

export default filterhandler;
