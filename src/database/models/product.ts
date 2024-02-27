import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productSchema: any = new mongoose.Schema({
    title: { type: String, default: null },
    description : { type: String, default: null },
    image: { type: Array, default: null },
    protection: { type: String, default: null },
    benefits: { type: String, default: null },
    price: { type: String, default: null },
    maxQuantity: { type: String, default: null },
    customization: { type: String, default: null },
    shippingCharge: { type: String, default: null },
    shipping: { type: String, default: null },
    supplyAbility: { type: String, default: null },
    share: {
        isFacebook: { type: Boolean, default: false },
        isLinkedIn: { type: Boolean, default: false },
        isTwitter: { type: Boolean, default: false },
        isPinterest: { type: Boolean, default: false },
    },
    packagingDetails: { type: String, default: null },
    port: { type: String, default: null },
    leadTime: { type: String, default: null },
    faqDetails : { type : Array, default: null },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "users" },

}, { timestamps: true })

productSchema.index({ _id: 1, isActive: 1 })

export const productModel = mongoose.model<any>('product', productSchema);




