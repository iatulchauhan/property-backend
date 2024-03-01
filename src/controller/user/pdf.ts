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
import { createPdf } from "../../helper";


const jwt_token_secret: any = config.get("jwt_token_secret");
const refresh_jwt_token_secret: any = config.get("refresh_jwt_token_secret");
const ObjectId = Types.ObjectId;


export const pdfController = async (req: Request, res: Response) => {
    reqInfo(req);
    let body = req.body 
    try {
        let data = body
        let response = await createPdf(data)

        return res.status(200).json(await apiResponse(200, responseMessage.customMessage("pdf generated successfully"), {response}, {}));
    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
    }
};