"use strict";
import {
    loginTokenResponseGenerator,
    reqInfo,
    verifyGoogleToken,
} from "../../helper";
import { Request, Response } from "express";
import { responseMessage } from "../../helper";
import { userModel, blogModel } from "../../database";
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


export const addBlog = async (req: Request, res: Response) => {
    let user: any = req.header('user')
    let body = req.body
    body.createdBy = user._id
    try {
        let response = await new blogModel(body).save()
        return res.status(200).json(await apiResponse(200, responseMessage.addDataSuccess('blog'), {}, {}));
    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}


export const getBlogById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const response = await blogModel.findOne({ _id: new ObjectId(id)}).select('-__v -createdBy -createdAt -updatedAt')

        if (!response) {
            return res.status(400).json(await apiResponse(400, responseMessage?.invalidId("blog"), {}, {}));
        }

        return res.status(200).json(await apiResponse(200, responseMessage?.getDataSuccess("blog"), response, {}));

    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}


export const updateBlog = async (req: Request, res: Response) => {
    try {

        const body = req.body
        const id = body._id

        const response = await blogModel.findByIdAndUpdate({ _id: new ObjectId(id), isActive: true }, body, { new: true })

        if (!response)
            return res.status(404).json({ message: responseMessage.invalidId("blog") })


        return res.status(200).json(await apiResponse(200, responseMessage.updateDataSuccess('blog'), {}, {}));

    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}


export const deleteBlog = async (req: Request, res: Response) => {
    try {

        const { id } = req.params

        const response = await blogModel.findByIdAndDelete({ _id: new ObjectId(id) })

        if (!response)
            return res.status(404).json({ message: responseMessage.invalidId("blog") })

        return res.status(200).json(await apiResponse(200, responseMessage.deleteDataSuccess("blog"), {}, {}));

    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}


export const allBlogs = async (req: Request, res: Response) => {
    try {

        let { limit, page } = req.body as any,
        skip: Number,
        match: any = {},
        response: any, count: number
    limit = parseInt(limit)
    skip = (limit && page) ? ((parseInt(page) - 1) * parseInt(limit)) : 0

    let aggregatePipe: any = [
        { $match: match },
        { $project: { __v: 0, createdBy: 0, createdAt: 0, updatedAt: 0 } },
        { $skip : skip },
    ]
    if (limit) aggregatePipe.push({ $limit: limit });
    

    [response, count] = await Promise.all([
        blogModel.aggregate(aggregatePipe),
        blogModel.countDocuments(match) 
    ])  
    
    if (!response) {
        return res.status(400).json(await apiResponse(400, responseMessage?.invalidId("blog"), {}, {}));
    }

    return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess("blog"), { response, count }, {}));

    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}



























