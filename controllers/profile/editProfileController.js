import ErrorHandler from "../../middlewares/ErrorHandler.js";

const editProfileController = {
  async editProfile(req, res, next) {
    const {
      name,
      phone,
      about,
      short_description,
      price,
      tour_description,
      profile_picture,
      state_name,
      city_name,
      state_id,
      city_id,
      interest,
      language_known,
      gender,
    } = req.body;
    try {
      const database = await global.db.collection("profiles");
      let profile = database.updateOne(
        { profile_id: req.user.id },
        {
          $set: {
            name: name || "",
            phone: phone || "",
            about: about || "",
            short_description: short_description || "",
            price: Number(price) || Number(0),
            tour_description: tour_description || "",
            profile_picture: profile_picture || "",
            state_name: state_name || "",
            city_name: city_name || "",
            state_id: Number(state_id) || Number(0),
            city_id: Number(city_id) || Number(0),
            interest: interest || [],
            language_known: language_known || [],
            gender: gender || "",
          },
        },
        { upsert: false },
        (err, result) => {
          if (err) {
            console.log(err);
            next(new Error(err));
          }
          if (result) {
            res.json({ updated: result.acknowledged });
          }
        }
      );
    } catch (error) {
      next(new Error("Problem while Editing Profile"));
      //   next(ErrorHandler.forbiddenError());
    }
  },
};

export default editProfileController;
