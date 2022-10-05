import express from "express";
const router = express.Router();
import {
  registerController,
  loginController,
  userController,
  editProfileController,
  locationController,
  getLocationProfilesController,
  interestController,
  languageController,
  getProfileController,
  paymentController,
  userBookinghandler,
  updateBookinghandler,
  filterhandler,
} from "../controllers/index.js";
import RegisterAuth from "../middlewares/RegisterAuth.js";
import LoginAuth from "../middlewares/LoginAuth.js";
import UserAuth from "../middlewares/UserAuth.js";
import PriceAuth from "../middlewares/PriceAuth.js";
// Auth
router.post("/register", [RegisterAuth], registerController.register);
router.post("/login", [LoginAuth], loginController.login);
router.get("/user", [UserAuth], userController.getUser);
router.get("/user-data", [UserAuth], userController.getUserData);
// Basic
router.get("/locations", locationController.getLocations);
router.get("/interests", interestController.getInterests);
router.get("/languages", languageController.getLanguages);

// Search
router.get("/local/:profileId", getProfileController.getLocal);
router.get(
  "/location/:locationName",
  getLocationProfilesController.getLocationProfiles
);

// Create Booking
router.post("/order", [UserAuth, PriceAuth], paymentController.createOrder);
router.post("/verify-payment", paymentController.verifyPayment);

// Booking Status Update
router.put("/accept-order", [UserAuth], updateBookinghandler.acceptOrder);
router.put("/reject-order", [UserAuth], updateBookinghandler.rejectOrder);
router.post("/start-order", [UserAuth], updateBookinghandler.startOrder);
router.post("/end-order", [UserAuth], updateBookinghandler.endOrder);

// User Profile
router.put("/edit-profile", [UserAuth], editProfileController.editProfile);
router.get("/user-booking", [UserAuth], userBookinghandler.getBookings);
router.get("/local-booking", [UserAuth], userBookinghandler.localBookings);

// Filter
router.get("/filter/:cityName", filterhandler.filter);
// API Public Routes
router.get("/all-profiles", getProfileController.allProfiles);
// Home
router.get("/", (req, res) => {
  res.json({ success: true });
});

export default router;
