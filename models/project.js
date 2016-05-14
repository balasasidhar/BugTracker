/**
 * Created by SASi on 21-Apr-16.
 */
const mongoose = global.mongoose;
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
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

ProjectSchema.pre('save', function (next) {
    next();
});

ProjectSchema.post('save', function (doc, next) {
    console.log('%s is created', doc._id);
    next();
});

var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;