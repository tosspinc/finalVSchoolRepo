import mongoose from 'mongoose';
const { Schema } = mongoose

//bounties Schema or blueprint
const bountySchema = new Schema({
    fName: {
        type: String,
        required: [true, "First name is required"],
        trim: true  //removes whites before and after.
    },
    lName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    living: {
        type: String,
        required: true,
        trim: true
    },
    bountyAmt: {
        type: Number,
        required: [true, "Amount is required"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    }
})

export default mongoose.model('Bounty', bountySchema)