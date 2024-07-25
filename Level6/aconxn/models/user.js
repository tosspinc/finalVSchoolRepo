const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

//auth schema
const userSchema = new Schema ({
    username: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        default: Date.now,
        require: true,
        trim: true
    },
    memberSince: {
        type: Date,
        default: Date.now,
        require: false,
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
userSchema.methods.checkPassword = function(passwordAttemp, callback) {
    bcrypt.compare(passwordAttemp, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

//method to remove password for token/sending the response
userSchema.methods.withoutPassword = function() {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("username", userSchema)