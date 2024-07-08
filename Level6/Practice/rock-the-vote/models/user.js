const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;


const userNameSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    memberSince: {
        type: Date,
        default: Date.now,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        trim: true
    }
});

userNameSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        try {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
        } catch (error) {
            return next(error)
        }
    } else {
        next()
    }
})

userNameSchema.methods.checkPassword = async function(passwordAttempt){
    try {
        return  bcrypt.compare(passwordAttempt, this.password)
    } catch (error) {
        throw(err)
    }
}

userNameSchema.methods.withoutPassword = function () {
    const user = this.toObject()
    delete user.password
    return user
}


module.exports = mongoose.model('UserName', userNameSchema);
