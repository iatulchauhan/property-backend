"use strict"
import http from 'http'
import { Types } from 'mongoose';

const ObjectId = Types.ObjectId

export const socketServer = (app) => {
    const server = new http.Server(app);
    const io = require('socket.io')(server, { cors: true, })
    ioEvents(io);
    return server;
}
let roomMember = [], users = new Map();
const ioEvents = (io) => {
    // Rooms namespace

}
