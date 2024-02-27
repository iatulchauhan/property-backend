import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const blogSchema: any = new mongoose.Schema({
    title: { type: String, default: null },
    content: { type: String, default: null },
    image: { type: Array, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "users" },

}, { timestamps: true })

// blogSchema.index({ _id: 1})

export const blogModel = mongoose.model<any>('blog', blogSchema);




