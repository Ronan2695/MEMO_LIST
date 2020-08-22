const mongoose = require('mongoose');

//tasks_lists_db is the db name
//this is how momngoose will connect to the DB
mongoose.connect('mongodb://localhost/task_list_db');

//verifying the connection 
const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to db'));

db.once('open',function(){

    console.log('sucessfully connected to the DB');

});

