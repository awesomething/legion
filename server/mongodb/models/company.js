import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    gigType: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const companyModel = mongoose.model('Company', CompanySchema)

export default companyModel