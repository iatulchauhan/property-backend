"use strict"
import * as Joi from "joi"
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'
import { responseMessage } from "../helper"
import { apiResponse } from "../common/functions"

export const addProduct = async (req: Request, res: Response, next: any) => {

    const schema = Joi.object({
        title: Joi.string().required().error(new Error('title is required!')),
        description: Joi.string().required().error(new Error('description is required!')),
        protection: Joi.string().required().error(new Error('protection is required!')),
        benefits: Joi.string().required().error(new Error('benefits is required!')),
        price: Joi.string().required().error(new Error('price is required!')),
        maxQuantity: Joi.string().required().error(new Error('maxQuantity is required!')),
        customization: Joi.string().required().error(new Error('customization is required!')),
        shippingCharge: Joi.string().required().error(new Error('shippingCharge is required!')),
        shipping: Joi.string().required().error(new Error('shipping is required!')),
        supplyAbility: Joi.string().required().error(new Error('supplyAbility is required!')),
        packagingDetails: Joi.string().required().error(new Error('packagingDetails is required!')),
        port: Joi.string().required().error(new Error('port is required!')),
        leadTime: Joi.string().required().error(new Error('leadTime is required!')),
        faqDetails: Joi.array().required().error(new Error('faqDetails is required!')),
        image : Joi.array().required().error(new Error('image is required!')),
        share : Joi.object({
            isFacebook : Joi.boolean().error(new Error('isFacebook is boolean!')),
            isLinkedIn : Joi.boolean().error(new Error('isLinkedIn is boolean!')),
            isTwitter : Joi.boolean().error(new Error('isTwitter is boolean!')),
            isPinterest : Joi.boolean().error(new Error('isPinterest is boolean!')),
        }).error(new Error('share is object!')),

    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}


export const updateProduct = async (req: Request, res: Response, next: any) => {

    const schema = Joi.object({
        _id: Joi.string().required().error(new Error('_id is required!')),
        title: Joi.string().error(new Error('title is string!')),
        description: Joi.string().error(new Error('description is string!')),
        protection: Joi.string().error(new Error('protection is string!')),
        benefits: Joi.string().error(new Error('benefits is string!')),
        price: Joi.string().error(new Error('price is string!')),
        maxQuantity: Joi.string().error(new Error('maxQuantity is string!')),
        customization: Joi.string().error(new Error('customization is string!')),
        shippingCharge: Joi.string().error(new Error('shippingCharge is string!')),
        shipping: Joi.string().error(new Error('shipping is string!')),
        supplyAbility: Joi.string().error(new Error('supplyAbility is string!')),
        packagingDetails: Joi.string().error(new Error('packagingDetails is string!')),
        port: Joi.string().error(new Error('port is string!')),
        leadTime: Joi.string().error(new Error('leadTime is string!')),
        faqDetails: Joi.array().error(new Error('faqDetails is array!')),
        image : Joi.array().error(new Error('image is string!')),
        share : Joi.object({
            isFacebook : Joi.boolean().error(new Error('isFacebook is boolean!')),
            isLinkedIn : Joi.boolean().error(new Error('isLinkedIn is boolean!')),
            isTwitter : Joi.boolean().error(new Error('isTwitter is boolean!')),
            isPinterest : Joi.boolean().error(new Error('isPinterest is boolean!')),
        }).error(new Error('share is object!')),

    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}
