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
            console.log('error in creating a new task')
            return;
        }
        console.log('****',newTask)
        return res.redirect('/');
    });
   

});

//Deleting a task

app.get('/delete-task/', function(req,res){

    console.log(req.query.id)

    let id = req.query.id;
   
    Task.findByIdAndDelete(id,function(err){

            if(err)
            {
                console.log('Error in deleting object from Database')
            }

      });
   
      return res.redirect('/')

})



//Deleting Multiple Tasks, Refer Tanya's Github repo

// app.get('/delete-task',function(req,res)
// {
//     console.log(req.query);
//     var id=req.query;

//     // to check the number of tasks to be deleted
//     var count=Object.keys(id).length;
//     console.log(count)
//     for(let i=0;i<count;i++)
//     {
//         // deleting the task from the database by using their individual ids
//         Task.findByIdAndDelete(Object.keys(id)[i],function(err)
//         {
//             if(err)
//             {
//                 console.log("error in deleting the task");
//             }
//         })
//     }
//     return res.redirect('back');
// });