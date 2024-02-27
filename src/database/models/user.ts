import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema: any = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    userType: { type: Number, default: 1 },   // 0 = dealer || 1 = User 
    isDealerVerified : {type: Boolean, default: false },
    dealershipForm : {
        dealershipName : { type: String },
        dealerCode : { type: Number },
        phone: { type: String },
        showroomLocation : { type: String },
        areaName : { type: String },
        servicePhoneNumber: { type: String },
        brandName : { type: String },
        dateOfIssuance : { type: String },
        gstin : { type: String },
    },
    isActive: { type: Boolean, default: true },
    isBlock: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },
    
}, { timestamps: true })

userSchema.index({ _id: 1, isBlock: 1, isActive: 1 })

export const userModel = mongoose.model<any>('user', userSchema);