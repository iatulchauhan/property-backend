"use strict"
import * as Joi from "joi"
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'
import { responseMessage } from "../helper"
import { apiResponse } from "../common/functions"

export const addBlog = async (req: Request, res: Response, next: any) => {

    const schema = Joi.object({
        title: Joi.string().required().error(new Error('title is required!')),
        content: Joi.string().required().error(new Error('content is required!')),
        image: Joi.array().required().error(new Error('image is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}


export const updateBlog = async (req: Request, res: Response, next: any) => {

    const schema = Joi.object({
        _id: Joi.string().required().error(new Error('_id is required!')),
        title: Joi.string().error(new Error('title is required!')),
        content: Joi.string().error(new Error('content is required!')),
        image: Joi.array().error(new Error('image is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}



