"use strict"
/**
 * @author Webito Infotech
 * @description Server and REST API config
 */
import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import cors from 'cors'
import * as packageInfo from '../package.json'
import { router } from './routes'
import os from 'os'
import { socketServer } from './helper';
const app = express();
global.osName = os.platform()

app.use(cors())
app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))
app.use('/images', express.static(process.cwd() + '/images'))

const health = (req, res) => {
    return res.status(200).json({
        message: `Project Setup ${process.env.NODE_ENV?.charAt(0)?.toUpperCase() + process.env.NODE_ENV?.slice(1)} Node.js (18.x) Server is Running, Server health is green`,
        app: packageInfo.name,
        version: packageInfo.version,
        description: packageInfo.description,
        author: packageInfo.author,
        license: packageInfo.license,
        homepage: packageInfo.homepage,
        // repository: packageInfo.repository,
        contributors: packageInfo.contributors
    })
}

const bad_gateway = (req, res) => { return res.status(502).json({ status: 502, message: "Project Setup API Bad Gateway" }) }

app.get('/', health);
app.get('/health', health);
app.get('/isServerUp', (req, res) => {
    res.send('Server is running ');
});
app.use(router)
app.use('*', bad_gateway);

export default socketServer(app);