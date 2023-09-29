import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: String,
    email:{
        type:String,
    },
    address:String,
    profession:String,
    phone:String,
    userId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;