import RazorPay from "razorpay";
import crypto from "crypto";
import ErrorHandler from "../../middlewares/ErrorHandler.js";
import { RAZORPAY_KEY_SECRET, RAZORPAY_KEY_ID } from "../../config/index.js";

const paymentController = {
  async createOrder(req, res, next) {
    // const { travel_date, local_id, price, city, state } = req.body;
    const { booking_amount, city, state, local_id } = req.local_info;
    const { id } = req.user;
    const { travel_date } = req.body;
    if (!travel_date) {
      return next(ErrorHandler.missingFieldsError());
    }
    try {
      const instance = new RazorPay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
      });
      const options = {
        amount: Number(booking_amount * 100),
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
        // partial_payment: 0
      };

      instance.orders.create(options, async (error, order) => {
        if (error) {
          console.log(error);
          next(error);
        } else {
          const database = await global.db.collection("bookings");
          database.insertOne(
            {
              booking_amount: booking_amount,
              city: city,
              state: state,
              local_id: local_id,
              traveller_id: id,
              order_id: order.id,
              payment_status: "Created",
              travel_date: travel_date,
              receipt: order.receipt,
              created_at: new Date().getTime(),
              payment_id: "",
              payment_signature: "",
              order_status: "Pending",
            },
            (err, results) => {
              if (err) {
                return next(ErrorHandler.registrationError());
              } else {
                return res
                  .status(200)
                  .json({ data: order, key: RAZORPAY_KEY_ID });
              }
            }
          );
        }
      });
    } catch (err) {
      next(err);
    }
  },
  async verifyPayment(req, res, next) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");
      if (razorpay_signature === expectedSign) {
        const database = await global.db.collection("bookings");
        let payment = database.updateOne(
          { order_id: razorpay_order_id },
          {
            $set: {
              payment_status: "Success",
              payment_id: razorpay_payment_id,
              payment_signature: razorpay_signature,
            },
          },
          { upsert: false },
          (err, result) => {
            if (err) {
              console.log(err);
              next(new Error(err));
            }
            if (result) {
              res.status(200).redirect(`${req.headers.referer}booking`);
            }
          }
        );
      } else {
        const database = await global.db.collection("bookings");
        let payment = database.updateOne(
          { order_id: razorpay_order_id },
          {
            $set: {
              payment_status: "Failed",
              payment_id: razorpay_payment_id,
              payment_signature: razorpay_signature,
            },
          },
          { upsert: false },
          (err, result) => {
            if (err) {
              console.log(err);
              next(new Error(err));
            }
            if (result) {
              res.status(200).redirect(`${req.headers.referer}booking`);
            }
          }
        );
      }
    } catch (err) {
      next(new Error(err));
    }
  },
};

export default paymentController;
