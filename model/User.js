const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        match: /.+\@.+\..+/, //https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email still barely understand Regex
        unique: true
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const User = model('User', UserSchema);

module.exports = User;