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
    if(this.isModified('password') || this.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10)
            this.password = hashedPassword
            next()
        } catch (error) {
            next(error)
        }
    } else {
        return next()
    }
})

userNameSchema.methods.checkPassword = function(password, cb){
    bcrypt.compare(password, this.password, cb)
}

userNameSchema.methods.withoutPassword = function () {
    const user = this.toObject()
    delete user.password
    return user
}


module.exports = mongoose.model('UserName', userNameSchema);