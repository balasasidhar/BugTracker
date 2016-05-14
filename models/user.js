/**
 * Created by SASi on 21-Apr-16.
 */
const mongoose = global.mongoose;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: Number,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [{type: Schema.ObjectId, ref: 'Project'}],
    meta: {
        role: {
            type: String,
            default: 'user'
        },
        verification_token: {
            type: String,
            required: true
        },
        is_verified: {
            type: Boolean,
            default: false
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    next();
});

UserSchema.post('save', function (doc, next) {
    console.log('%s is created', doc._id);
    next();
});

var User = mongoose.model('User', UserSchema);
module.exports = User;