const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({

    description:{
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },
    
    date:{
        type: String,
        required: true
    }

});

//modelname
const Task = mongoose.model('Tasks',tasksSchema);

//exporting the model 
module.exports = Task;

//the Schema should be acquired in Index.js