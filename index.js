const express = require('express'); // requiring express
const app = express(); //creating a new express app.
const port= 8000;
//requiring our db configuration
const db= require('./configs/mongoose');
const Task = require('./models/tasks')

//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//acquiring our static files
app.use(express.static('assets'));
//reading the form data
app.use(express.urlencoded());


app.listen(port, function(err){

    if(err){
        //used interpolation here, used backticks
        console.log(`Error in running the server:${err}`)
    }

    console.log(`Server is running on port:${port}`);

})


//iterating through the array
app.get('/', function(req,res){
    
    Task.find({},function(err,tasks){
        
        if(err)
        {
            console.log('Error in fetching contacts from DB')
        }

        return res.render('home',{

            title:"memo",
            task_list:tasks


        })

    });

});

//new task creation
app.post('/create-task', function(req,res){

    console.log(req.body);

    //pushing a new task from the form

    Task.create({
        
        description:req.body.description,
        category:req.body.category,
        date:req.body.date

    }, function(err,newTask){

        if(err){
            console.log('error in creating a contact')
            return;
        }
        console.log('****',newTask)
        return res.redirect('/');
    });
   

});

//Deleting a contact
// app.post('/delete-task/', function(req,res){
//     console.log(req.body);
//     let date =req.body; 
  

//         let taskIndex= taskList.findIndex(task => task.date == date);
    

//         if(taskIndex != -1)
//         {
//             taskList.splice(taskIndex,1);
//         }

      
//     return res.redirect('/');
// })

app.get('/delete-task/', function(req,res){

    console.log(req.query)

    let id = req.query.id

    Task.findByIdAndDelete(id, function(err){

        if(err)
        {
            console.log('Error in deleting object from Database')
        }

        return res.redirect('/')

    })

})