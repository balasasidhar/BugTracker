/**
 * Created by SASi on 21-Apr-16.
 */
const mongoose = global.mongoose;
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    error_type: String,
    error_message: String,
    url: String,
    line_number: Number,
    column_number: Number,
    stack_trace: String,
    browser_details: String,
    operating_system: String,
    time_stamp: Number,
    is_resolved: {type: Boolean, default: false},
    occurrences: {type: Number, default: 1},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

ReportSchema.pre('save', function (next) {
    next();
});

ReportSchema.post('save', function (doc, next) {
    console.log('%s is created', doc._id);
    next();
});

var Report = mongoose.model('Report', ReportSchema);
module.exports = Report;