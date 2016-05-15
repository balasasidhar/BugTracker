/**
 * Created by SASi on 21-Apr-16.
 */
const mongoose = global.mongoose;
const Schema = mongoose.Schema;

const ErrorSchema = new Schema({
    error_type: String,
    error_message: String,
    url: String,
    line_number: Number,
    column_number: Number,
    stack_trace: String,
    browser_details: String,
    operating_system: String,
    time_stamp: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

ErrorSchema.pre('save', function (next) {
    next();
});

ErrorSchema.post('save', function (doc, next) {
    console.log('%s is created', doc._id);
    next();
});

var Error = mongoose.model('Error', ErrorSchema);
module.exports = Error;