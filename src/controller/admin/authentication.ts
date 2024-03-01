"use strict";
import {
  loginTokenResponseGenerator,
  reqInfo,
  verifyGoogleToken,
} from "../../helper";
import { Request, Response } from "express";
import { responseMessage } from "../../helper";
import { userModel } from "../../database";
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

export const adminSignUp = async (req: Request, res: Response) => {
  reqInfo(req)
  let body = req.body
  try {
    let isAlready: any = await userModel.findOne({ email: body.email, isActive: true, isBlock: false })
    if (isAlready) return res.status(409).json(await apiResponse(409, responseMessage.alreadyEmail, {}, {}));
    const salt = await bcryptjs.genSaltSync(10)
    const hashPassword = await bcryptjs.hash(body.password, salt)
    delete body.password
    body.password = hashPassword
    body.userType = userType.dealer
    let response = await new userModel(body).save()
    return res.status(200).json(await apiResponse(200, responseMessage.addDataSuccess('user'), {}, {}));
  } catch (error) {
    console.log(error)
    return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
  }
}


export const adminLogin = async (req: Request, res: Response) => {
  let body = req.body;
  reqInfo(req)
  try {
    let response: any = (await userModel.aggregate([{ $match: { email: body.email, isActive: true } }]))[0]
    if (!response)
      return res.status(400).json(await apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}));
    if (response?.isBlock == true)
      return res.status(403).json(await apiResponse(403, responseMessage.accountBlock, {}, {}));
    if (!response?.password)
      return res.status(400).json(await apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}));
    const passwordMatch = await bcryptjs.compare(body.password, response.password)
    if (!passwordMatch) return res.status(400).json(await apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}));
    let token: any = await loginTokenResponseGenerator(response)
    if (token.error) res.status(400).json(await apiResponse(400, token.Message, {}, {}));
    return res.status(200).json(await apiResponse(200, responseMessage?.loginSuccess, token?.data, {}));
  } catch (error) {
    console.log(error)
    return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
  }
}


export const updateProfile = async (req: Request, res: Response) => {
  try {

    const body = req.body
    const id = body._id

    const response = await userModel.findByIdAndUpdate({ _id: new ObjectId(id), isActive: true }, body, { new: true })

    if (!response)
      return res.status(404).json({ message: responseMessage.invalidId("user") })


    if (response.isBlock === true) {
      return res.status(400).json(await apiResponse(400, responseMessage.accountBlock, {}, {}))
    }

    return res.status(200).json(await apiResponse(200, responseMessage.updateDataSuccess('profile'), {}, {}));

  } catch (error) {
    console.log(error)
    return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
  }
}


export const activeInactive = async (req: Request, res: Response) => {
  reqInfo(req)
  let user = req.header('user'), { _id, isBlock } = req.body
  try {

    let userIsExist = await userModel.findOne({ _id: new ObjectId(_id), isActive: true })

    if (!userIsExist)
      return res.status(404).json(await apiResponse(404, responseMessage?.getDataNotFound('User'), {}, {}))

    userIsExist = await userModel.findOneAndUpdate({ _id: new ObjectId(_id), isActive: true }, { isBlock }, { new: true })

    if (userIsExist?.isBlock)
      return res.status(200).json(await apiResponse(200, responseMessage?.customMessage('Your requested user has been blocked'), {}, {}))
    else return res.status(200).json(await apiResponse(200, responseMessage?.customMessage('Your requested user has been unblocked'), {}, {}))

  } catch (error) {
    console.log(error)
    return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
  }
}


export const getProfile = async (req: Request, res: Response) => {
  try {

    const { id } = req.params

    const response = await userModel.findOne({ _id: new ObjectId(id) }).select('-__v -createdBy -createdAt -updatedAt')

    if (!response) {
      return res.status(400).json(await apiResponse(400, responseMessage?.invalidId("user"), {}, {}));
    }

    if (response.isBlock === true) {
      return res.status(400).json(await apiResponse(400, responseMessage.accountBlock, {}, {}))
    }

    return res.status(200).json(await apiResponse(200, responseMessage?.getDataSuccess("user"), response, {}));

  } catch (error) {
    console.log(error)
    return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
  }
}


