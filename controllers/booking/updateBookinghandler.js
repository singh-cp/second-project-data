import ErrorHandler from "../../middlewares/ErrorHandler.js";

const updateBookinghandler = {
  async acceptOrder(req, res, next) {
    const { id } = req.user;
    const { order_id } = req.body;
    const secretCode = Math.floor(1000 + Math.random() * 9000);
    if (!order_id) {
      return next(ErrorHandler.missingFieldsError());
    }
    try {
      const database = global.db.collection("bookings");
      let booking = await database.updateOne(
        { local_id: id, order_id: order_id },
        {
          $set: { order_status: "Confirmed", secret_code: Number(secretCode) },
        },
        { upsert: false },
        (err, result) => {
          if (err) {
            next(new Error(err));
          }
          if (result) {
            res.json({ updated: result.acknowledged });
          }
        }
      );
    } catch (error) {
      next(new Error());
    }
  },
  async rejectOrder(req, res, next) {
    const { id } = req.user;
    const { order_id } = req.body;
    if (!order_id) {
      return next(ErrorHandler.missingFieldsError());
    }
    try {
      const database = global.db.collection("bookings");
      let booking = await database.updateOne(
        { local_id: id, order_id: order_id },
        { $set: { order_status: "Rejected" } },
        { upsert: false },
        (err, result) => {
          if (err) {
            next(new Error(err));
          }
          if (result) {
            res.json({ updated: result.acknowledged });
          }
        }
      );
    } catch (error) {
      next(new Error());
    }
  },
  async startOrder(req, res, next) {
    const { order_id, code } = req.body;
    const { id } = req.user;
    if (!order_id || !code) {
      return next(ErrorHandler.missingFieldsError());
    }
    const database = await global.db.collection("bookings");
    const order = await database
      .find({ local_id: id, order_id: order_id })
      .toArray();
    if (order.length === 1 && order[0].secret_code === Number(code)) {
      try {
        let booking = await database.updateOne(
          { local_id: id, order_id: order_id, secret_code: code },
          {
            $set: {
              tour_started: true,
              tour_started_at: new Date().getTime(),
              tour_ended: false,
              order_status: "In Progress",
            },
          },
          { upsert: false },
          (err, result) => {
            if (err) {
              next(new Error(err));
            }
            if (result) {
              res.json({ updated: result.acknowledged });
            }
          }
        );
      } catch (err) {
        next(new Error());
      }
    } else {
      next(ErrorHandler.validationError());
    }
  },
  async endOrder(req, res, next) {
    const { id } = req.user;
    const { order_id } = req.body;
    if (!order_id) {
      return next(ErrorHandler.missingFieldsError());
    }
    try {
      const database = global.db.collection("bookings");
      let booking = await database.updateOne(
        { local_id: id, order_id: order_id },
        {
          $set: {
            order_status: "Completed",
            tour_ended: true,
            tour_ended_at: new Date().getTime(),
          },
        },
        { upsert: false },
        (err, result) => {
          if (err) {
            next(new Error(err));
          }
          if (result) {
            res.json({ updated: result.acknowledged });
          }
        }
      );
    } catch (error) {
      next(new Error());
    }
  },
};

export default updateBookinghandler;
