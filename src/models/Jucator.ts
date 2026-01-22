import mongoose, { Schema, Document, Model } from "mongoose";
import type { Jucator} from "@/types/Jucator";

export interface IJucator extends Omit<Jucator, "id">, Document{

}

const JucatorSchema = new Schema<IJucator>(
    {
        numeJucator: {
            type: String,
            required: [true, "Numele jucatorului este obligatoriu"],
            trim: true,
        },
        echipa:{
            type: String,
            required: [true, "Numele echipei este obligatoriu"],
            trim: true,
        },
        accidentat:{
            type: Boolean,
            default: false,
        },
        varsta:{
            type: Number,
            required: [true, "Varsta este obligatorie"],
            min: [16, "Varsta minima este 16 ani"],
            max: [23, "Varsta maxima este 23 ani"],
        },
        createdAt:{
            type: String,
            default: ()=> new Date().toISOString(),
        },
    },
    {
        timestamps: false,
    }
);

const JucatorModel: Model<IJucator> = mongoose.models.Jucator || mongoose.model<IJucator>("Jucator", JucatorSchema);

export default JucatorModel;