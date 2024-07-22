const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


//author schema or blueprint
const userNameSchema = new Schema ({
    username: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    memberSince: {
        type: Date,
        default: Date.now,
        require: false,
        trim: true
    },
    cart: [{
        
    }],
    isAdmin: {
        type: Boolean,
        default: false,
        trim: true
    }
})

// pre-save hook to encrypt user password on signup
userNameSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

// method to check encrypted password on login
userNameSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

//method to remove users password for token/sending the response
userNameSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}
        
module.exports = mongoose.model("UserName", userNameSchema)