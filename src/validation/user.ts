"use strict"
import * as Joi from "joi"
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'
import { responseMessage } from "../helper"
import { apiResponse } from "../common/functions"

export const signup = async (req: Request, res: Response, next: any) => {

    const schema = Joi.object({
        fullName: Joi.string().required().error(new Error('fullName is required!')),
        email: Joi.string().required().error(new Error('email is required!')),
        phoneNumber: Joi.string().required().error(new Error('phoneNumber is required!')),
        whatsappNumber: Joi.string().required().error(new Error('whatsappNumber is required!')),
        dateOfBirth: Joi.string().required().error(new Error('dateOfBirth is required!')),
        gender: Joi.string().error(new Error('gender is string!')),
        otp: Joi.number().error(new Error('otp is number!')),
        // password: Joi.string().required().error(new Error('password is required!')),
        country: Joi.string().required().error(new Error('country is required!')),
        state: Joi.string().required().error(new Error('state is required!')),
        city: Joi.string().required().error(new Error('city is required!')),
        userType: Joi.number().error(new Error('userType is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const adminSignup = async (req: Request, res: Response, next: any) => {

    const schema = Joi.object({
        name: Joi.string().required().error(new Error('name is required!')),
        email: Joi.string().required().error(new Error('email is required!')),
        password: Joi.string().required().error(new Error('password is required!')),
        phoneNumber: Joi.string().required().error(new Error('phoneNumber is required!')),
        dealershipForm: Joi.object({
            dealershipName: Joi.string().required().error(new Error('dealershipName is required!')),
            dealerCode: Joi.string().required().error(new Error('dealerCode is required!')),
            phone: Joi.string().required().error(new Error('phone is required!')),
            showroomLocation: Joi.string().required().error(new Error('showroomLocation is required!')),
            areaName: Joi.string().required().error(new Error('areaName is required!')),
            servicePhoneNumber: Joi.string().required().error(new Error('servicePhoneNumber is required!')),
            brandName: Joi.string().required().error(new Error('brandName is required!')),
            dateOfIssuance: Joi.string().required().error(new Error('dateOfIssuance is required!')),
            gstin: Joi.string().required().error(new Error('gstin is required!')),
        }).required().error(new Error('dealershipForm is required!'))

    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const adminLogin = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        email: Joi.string().required().error(new Error('email is required!')),
        password: Joi.string().required().error(new Error('password is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const updateProfile = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        _id: Joi.string().required().error(new Error('_id is required!')),
        name: Joi.string().error(new Error('name is string!')),
        email: Joi.string().error(new Error('email is string!')),
        phoneNumber: Joi.string().error(new Error('phoneNumber is string!')),
        dealershipForm: Joi.object({
            dealershipName: Joi.string().error(new Error('dealershipName is string!')),
            dealerCode: Joi.string().error(new Error('dealerCode is string!')),
            phone: Joi.string().error(new Error('phone is string!')),
            showroomLocation: Joi.string().error(new Error('showroomLocation is string!')),
            areaName: Joi.string().error(new Error('areaName is string!')),
            servicePhoneNumber: Joi.string().error(new Error('servicePhoneNumber is string!')),
            brandName: Joi.string().error(new Error('brandName is string!')),
            dateOfIssuance: Joi.string().error(new Error('dateOfIssuance is string!')),
            gstin: Joi.string().error(new Error('gstin is required!')),
        }).error(new Error('dealershipForm is object!'))
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}


export const activeInactive = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        _id: Joi.string().required().error(new Error('_id is required!')),
        isBlock : Joi.boolean().required().error(new Error('isBlock is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}


export const social_login = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        accessToken: Joi.string().error(new Error('accessToken is string!')),
        idToken: Joi.string().error(new Error('idToken is string!')),
        clientId: Joi.string().error(new Error('clientId is string!')),
        deviceToken: Joi.string().error(new Error('deviceToken is string!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const generate_refresh_token = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        old_token: Joi.string().error(new Error('old_token is string!')),
        refresh_token: Joi.string().error(new Error('refresh_token is string!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const login = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().required().error(new Error('phoneNumber is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const by_id = async (req: Request, res: Response, next: any) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).json(await apiResponse(400, responseMessage?.invalidId('id'), {}, {}))
    return next()
}

export const forgot_password = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        email: Joi.string().lowercase().required().error(new Error('email is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const otp_verification = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().required().error(new Error('phoneNumber is required!')),
        // otp: Joi.number().min(1000).max(9999).required().error(new Error('otp is required! & must be 6 digits')),
        otp: Joi.number().required().error(new Error('otp is required! & must be 6 digits')),
    })
    schema.validateAsync(req.body).then(async result => {
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const resend_otp = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().required().error(new Error('phoneNumber is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}

export const change_password = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        id: Joi.string().required().error(new Error('id is required! ')),
        otp: Joi.string().required().error(new Error('otp is required! ')),
        old_password: Joi.string().required().error(new Error('old_password is required! ')),
        new_password: Joi.string().required().error(new Error('new_password is required! ')),
    })
    schema.validateAsync(req.body).then(async result => {
        return next()
    }).catch(async error => { res.status(400).json(await apiResponse(400, error.message, {}, {})); })
}

export const reset_password = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        id: Joi.string().required().error(new Error('id is required! ')),
        otp: Joi.number().min(100000).max(999999).required().error(new Error('otp is required! & must be 6 digits')),
        password: Joi.string().max(20).required().error(new Error('password is required! & max length is 20')),
    })
    schema.validateAsync(req.body).then(async result => {
        if (!isValidObjectId(result.id)) return res.status(400).json(await apiResponse(400, 'invalid id', {}, {}))
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}