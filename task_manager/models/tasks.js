const mongoos = require('mongoose');

const TaskSchema = new mongoos.Schema({
    name: {
        type:String,
        required:[true,'Must provide the name of task.'],
        trim: true,
        maxlength: [20,'Task name can not be more than 20 char.']
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoos.model('Task',TaskSchema);