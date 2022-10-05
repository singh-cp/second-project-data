const userBookinghandler = {
  async getBookings(req, res, next) {
    const { id } = req.user;
    try {
      const database = global.db.collection("bookings");
      let bookings = await database
        .find({ traveller_id: id, payment_status: { $ne: "Created" } })
        .project({
          _id: 0,
          payment_signature: 0,
          receipt: 0,
          traveller_id: 0,
        })
        .sort({ travel_date: 1 })
        .toArray();
      return res.json({ bookings });
    } catch (error) {
      next(new Error());
    }
  },
  async localBookings(req, res, next) {
    const { id } = req.user;
    try {
      const database = global.db.collection("bookings");
      let bookings = await database
        .find({ local_id: id, payment_status: { $ne: "Created" } })
        .project({
          _id: 0,
          payment_signature: 0,
          receipt: 0,
          local_id: 0,
          payment_status: 0,
          payment_id: 0,
          created_at: 0,
          secret_code: 0,
        })
        .sort({ travel_date: 1 })
        .toArray();
      return res.json({ bookings });
    } catch (error) {
      next(new Error());
    }
  },
};

export default userBookinghandler;
