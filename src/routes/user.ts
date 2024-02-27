"use strict";
import { Router } from "express";
import { userJWT } from "../helper";
import * as validation from "../validation";
import { userController } from "../controller";

const router = Router();

//User Auth route
router.post("/signup", validation?.adminSignup, userController.signUp);
router.post("/login", validation?.login, userController.login);
router.post("/resend_otp", validation?.resend_otp, userController.resend_otp);
router.post("/verifyOtp", validation?.otp_verification, userController.otp_verification);
router.post("/generate/refresh_token", validation?.generate_refresh_token, userController.generate_refresh_token);


export const userRouter = router;
