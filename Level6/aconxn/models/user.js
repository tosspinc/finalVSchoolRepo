const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

//auth schema
const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        default: Date.now,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true, //makes sure no duplicate values.
        trim: true
    },
    memberSince: {
        type: Date,
        default: Date.now,
        required: false,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        trim: true
    }
})

//pre-save hook that encrypts password on signup
userSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

//method to check encrypted password on login
userSchema.methods.checkPassword = async function(passwordAttempt) {
    return bcrypt.compare(passwordAttempt, this.password)
}

//method to remove password for token/sending the response
userSchema.methods.withoutPassword = function() {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)