import mongoose from 'mongoose'
import Company from '../mongodb/models/company.js'
import User from '../mongodb/models/user.js'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const getAllCompanies = async (req, res) => {
    const { _end, _order, _start, _sort, title_like ='', gigType=''} = req.query;

    const query = {}

    if(gigType !== ''){
        query.gigType = gigType;
    }

    if(title_like){//make it case insensitive for both lower & upper case
        query.title = { $regex: title_like, $options: 'i' };
    }
    try {
        const count = await Company.countDocuments({query})

        const companies = await Company
        .find(query)//only find elems based on the spec parameters
        .limit(_end)//how many per page
        .skip(_start)//skip a spec no of elems
        .sort({ [_sort]: _order})// sort things in ascend or descend price
//expose this header below to the frontend, so we can know no of our resources
        res.header('x-total-count', count);
        res.header('Access-Control-Expose-Headers', 'x-total-count')

        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getCompanyDetail = async (req, res) => {
    const {id} = req.params;
    const companyExists = await Company.findOne({ 
    _id: id}).populate('creator');

    if(companyExists){ res.status(200)
    .json(companyExists)}else{
        res.status(404).json({ message: 'Gig  not found'})}
}

const createCompany = async (req, res) => {
    try {
        const { title, description, gigType, location, price, photo, email } = req.body
        //start a session
        const session = await mongoose.startSession();
        session.startTransaction();
    
        const user = await User.findOne({ email }).session(session)
    
        if(!user) throw new Error('User not found')
    
        const photoUrl = await cloudinary.uploader.upload(photo);
    
        const newCompany = await Company.create({
            title,
            description,
            gigType,
            location,
            price,
            photo: photoUrl.url,
            creator: user._id
        });
    
        user.allCompanies.push(newCompany._id)
        await user.save({ session })
    
        await session.commitTransaction()
        res.status(200).json({message: 'Gig Created Successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
}
const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, gigType, location, price, photo } = req.body;
    
        const photoUrl = await cloudinary.uploader.upload(photo);
    
        await Company.findByIdAndUpdate({ _id: id}, {
          title,
          description,
          gigType,
          location,
          price,
          photo: photoUrl.url || photo
        })
    
        res.status(200).json({ message: 'Gig updated successfully' })
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
}

const deleteCompany = async (req, res) => {
    let companyToDelete;
    try {
        const { id } = req.params;
        companyToDelete = await Company.findById({ _id: id }).populate('creator');

        if (!companyToDelete) {
        throw new Error('Gig not found');
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        
        companyToDelete.deleteOne({session})
        // companyToDelete.remove({session});
        companyToDelete.creator.allCompanies.pull(companyToDelete);
    
        await companyToDelete.creator.save({session});
        await session.commitTransaction();
            res.status(200).json({ message: 'Gig deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message })
     }
  };

export {
    getAllCompanies,
    getCompanyDetail,
    createCompany,
    updateCompany,
    deleteCompany
}