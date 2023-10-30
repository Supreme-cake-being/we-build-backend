import express from "express";
import authController from "../../controller/auth-controller.js";

import {
  userSignupSchema,
  userSigninSchema,
  userEmailVerificationSchema,
} from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";

const signupValidator = validateBody(userSignupSchema);
const signinValidator = validateBody(userSigninSchema);
const emailVerificationValidator = validateBody(userEmailVerificationSchema);

const router = express.Router();

router.post("/register", isEmptyBody, signupValidator, authController.register);

router.post("/login", isEmptyBody, signinValidator, authController.login);

router.post("/logout", authenticate, authController.logout);

router.get("/current", authenticate, authController.current);

router.get("/verify/:verificationToken", authController.verify);

router.post(
  "/verify",
  isEmptyBody,
  emailVerificationValidator,
  authController.resendVerifyEmail
);

export default router;
