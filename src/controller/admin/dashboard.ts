"use strict";
import {
    loginTokenResponseGenerator,
    reqInfo,
    verifyGoogleToken,
} from "../../helper";
import { Request, Response } from "express";
import { responseMessage } from "../../helper";
import { userModel, productModel, blogModel } from "../../database";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import axios from "axios";
import { Types } from "mongoose";
import { apiResponse } from "../../common/functions";
import { userType } from "../../common/dbTypes";
import { sendSMSHelper } from "../../helper/sms_send";

const jwt_token_secret: any = config.get("jwt_token_secret");
const refresh_jwt_token_secret: any = config.get("refresh_jwt_token_secret");
const ObjectId = Types.ObjectId;

export const dashboard = async (req: Request, res: Response) => {
    try {

        let user: any = (await userModel.aggregate([
            {
                $group: { _id: "$dealershipForm.areaName", count: { $sum: 1 } }
            },
            {
                $project: { location: "$_id", count: "$count", _id: 0 }
            }

        ],
        ))

        let product: any = (await productModel.aggregate([
            { $match: { isActive: true } },
            { $count: "totalProduct" }
        ]))

        let blog: any = (await blogModel.aggregate([{ $count: "totalBlog" }]))

        const response = { totalProduct: product[0].totalProduct, totalBlog: blog[0].totalBlog, userLocation: user }

        return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess, response, {}));

    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}





























