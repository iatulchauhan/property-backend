import jwt from 'jsonwebtoken'
import config from 'config'
import { userModel, } from '../database'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { responseMessage } from './response'
import { userSessionModel } from '../database/models/user_session'
import { OAuth2Client } from 'google-auth-library'
import { apiResponse } from '../common/functions'
import pdf from "pdf-creator-node"
import { serviceBookingTemplate } from './emailTemplates'
import { log } from 'console'
import { Location } from 'aws-sdk'



const ObjectId = mongoose.Types.ObjectId
const jwt_token_secret: any = config.get('jwt_token_secret')
const refresh_jwt_token_secret: any = config.get('refresh_jwt_token_secret')
const access_token_duration: any = config.get('access_token_duration')

// var html = fs.readFileSync("template.html", "utf8");
export const createPdf = async (data : any) => {
    try {
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: webito infotech</div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        };

        var document = {
            html: serviceBookingTemplate(data),
            data: {},
            path: "./output.pdf",
            type: "",
        };

        return pdf
            .create(document, options)
            .then((res) => {
               return res
            })
            .catch((error) => {
                return error;
                console.log(error);
            });
    } catch (error) {
        console.log('error', error)
        return error
    }
}