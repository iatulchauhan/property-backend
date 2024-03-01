"use strict";
import {
  loginTokenResponseGenerator,
  reqInfo,
  verifyGoogleToken,
} from "../../helper";
import { Request, Response, response } from "express";
import { responseMessage } from "../../helper";
import { userModel } from "../../database";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import axios from "axios";
import { Types } from "mongoose";
import { userSessionModel } from "../../database/models/user_session";
import { apiResponse } from "../../common/functions";
import { userType } from "../../common/dbTypes";
import { sendSMSHelper } from "../../helper/sms_send";


const jwt_token_secret: any = config.get("jwt_token_secret");
const refresh_jwt_token_secret: any = config.get("refresh_jwt_token_secret");
const ObjectId = Types.ObjectId;

// export const update_profile = async (req: Request, res: Response) => {
//   reqInfo(req);
//   let user: any = req.header("user");
//   try {
//     let updatedUser = await userModel.findOneAndUpdate(
//       { _id: new ObjectId(user?._id), isActive: true },
//       req.body,
//       { new: true }
//     );
//     if (!updatedUser)
//       return res
//         .status(404)
//         .json(
//           await apiResponse(
//             404,
//             responseMessage?.getDataNotFound("user"),
//             {},
//             {}
//           )
//         );
//     return res
//       .status(200)
//       .json(
//         await apiResponse(
//           200,
//           responseMessage?.updateDataSuccess("profile"),
//           updatedUser,
//           {}
//         )
//       );
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json(
//         await apiResponse(500, responseMessage.internalServerError, {}, error)
//       );
//   }
// };

export const signUp = async (req: Request, res: Response) => {
  reqInfo(req);
  try {
    let body = req.body
    let isAlready: any = await userModel.findOne({ email: body.email, isActive: true, isBlock: false, phoneNumber: body.phoneNumber });
    if (isAlready?.isBlock == true)
      return res.status(403).json(await apiResponse(403, responseMessage.accountBlock, {}, {}));


    if (isAlready?.phoneNumber == body.phoneNumber) {
      return res.status(403).json(await apiResponse(403, responseMessage.customMessage("phoneNumber already exist"), {}, {}));
    }
    if (isAlready)
      return res.status(409).json(await apiResponse(409, responseMessage.alreadyEmail, {}, {}));


    const salt = await bcryptjs.genSaltSync(8);
    const hashPassword = await bcryptjs.hash(body.password, salt);
    delete body.password;
    body.password = hashPassword;

    body.userType = userType?.user;

    let response = await new userModel(body).save();
    return res.status(200).json(await apiResponse(200, responseMessage.signupSuccess, {}, {}));
  } catch (error) {
    return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
  }
};

export const login = async (req: Request, res: Response) => {
  let body = req.body;
  reqInfo(req);
  try {
    let response: any = (await userModel.aggregate([{ $match: { email: body.email, isActive: true } },]))[0];

    if (!response)
      return res.status(400).json(await apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}));

    if (response?.isBlock == true)
      return res.status(403).json(await apiResponse(403, responseMessage.accountBlock, {}, {}));
    if (!response?.password)
      return res.status(400).json(await apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}));
    const passwordMatch = await bcryptjs.compare(body.password, response.password)
    if (!passwordMatch) return res.status(400).json(await apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}));

    let token: any = await loginTokenResponseGenerator(response);
    if (token.error)
      res.status(400).json(await apiResponse(400, token.errorMessage, {}, {}));

    return res.status(200).json(await apiResponse(200, responseMessage?.loginSuccess, token?.data, {}));

  } catch (error) {
    console.log(error);
    return res
      .status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
  }
}


  // export const resend_otp = async (req: Request, res: Response) => {
  //   reqInfo(req);
  //   try {
  //     let body = req.body
  //     let data: any = await sendSMSHelper(body.phoneNumber);
  //     let otp = 0;
  //     if (data?.data?.type == "success") {
  //       otp = JSON.parse(data?.config?.data)?.OTP;
  //     }
  //     let response = await userModel.findOneAndUpdate({ phoneNumber: body.phoneNumber, isActive: true }, { otp }, { new: true })
  //     return res
  //       .status(200)
  //       .json(await apiResponse(200, responseMessage.OTPResend, {}, {}));
  //   } catch (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .json(
  //         await apiResponse(500, responseMessage.internalServerError, {}, error)
  //       );
  //   }
  // };

  ;

// export const otp_verification = async (req: Request, res: Response) => {
//   try {
//     let body = req.body;
//     let user: any = await userModel.findOne({
//       phoneNumber: body.phoneNumber,
//       isActive: true,
//     });
//     if (user) {
//       console.log(user.otp, body.otp, "body.otp")
//       if (body.otp == user.otp) {
//         const response = await userModel.findByIdAndUpdate({ _id: new ObjectId(user?._id), isActive: true }, { otp: 0, isVerify: true }, { new: true });
//         return res
//           .status(200)
//           .json(await apiResponse(200, responseMessage.OTPverified, {}, {}));
//       } else {
//         return res
//           .status(404)
//           .json(await apiResponse(404, responseMessage.invalidOTP, {}, {}));
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json(
//         await apiResponse(500, responseMessage.internalServerError, {}, error)
//       );
//   }
// };


// export const generate_refresh_token = async (req: Request, res: Response) => {
//   let { old_token, refresh_token } = req.body;
//   reqInfo(req);
//   try {
//     let isVerifyToken: any = jwt.verify(old_token, jwt_token_secret);
//     if (parseInt(isVerifyToken.generatedOn + 120000) > new Date().getTime())
//       return res
//         .status(400)
//         .json(await apiResponse(400, responseMessage?.tokenNotExpire, {}, {}));

//     let refreshTokenVerify: any = jwt.verify(
//       refresh_token,
//       refresh_jwt_token_secret
//     );
//     if (refreshTokenVerify._id != isVerifyToken._id)
//       return res
//         .status(403)
//         .json(
//           await apiResponse(
//             403,
//             responseMessage?.invalidOldTokenReFreshToken,
//             {},
//             {}
//           )
//         );

//     let response = await userSessionModel.findOneAndUpdate(
//       {
//         createdBy: new ObjectId(isVerifyToken._id),
//         refresh_token,
//         isActive: true,
//       },
//       { isActive: false }
//     );
//     if (response == null)
//       return res
//         .status(404)
//         .json(
//           await apiResponse(404, responseMessage?.refreshTokenNotFound, {}, {})
//         );
//     let userData = await userModel.findOne({
//       _id: new ObjectId(response?.createdBy),
//       isActive: true,
//     });
//     let token: any = await loginTokenResponseGenerator(userData);

//     if (token.error)
//       res.status(400).json(await apiResponse(400, token.errorMessage, {}, {}));
//     return res
//       .status(200)
//       .json(
//         await apiResponse(
//           200,
//           responseMessage?.refreshTokenSuccess,
//           token?.data,
//           {}
//         )
//       );
//   } catch (error) {
//     if (error.message == "invalid signature")
//       return res
//         .status(403)
//         .json(await apiResponse(403, responseMessage?.differentToken, {}, {}));
//     if (error.message == "jwt malformed")
//       return res
//         .status(403)
//         .json(await apiResponse(403, responseMessage?.differentToken, {}, {}));
//     if (error.message === "jwt must be provided")
//       return res
//         .status(403)
//         .json(await apiResponse(403, responseMessage?.tokenNotFound, {}, {}));
//     return res
//       .status(500)
//       .json(
//         await apiResponse(500, responseMessage.internalServerError, {}, error)
//       );
//   }
// };
