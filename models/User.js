const mongoose = require('mongoose');
// Setup schema
const userSchema = mongoose.Schema({

    firstname:String,
    lastname: String,
    email: String,
    age: Number
});





// Export User model
const User = module.exports = mongoose.model('users', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}
