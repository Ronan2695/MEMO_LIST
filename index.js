const express = require('express'); // requiring express
const app = express(); //creating a new express app.
const port= 8000;
// var bodyParser = require('body-parser');

//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//acquiring our static files
app.use(express.static('assets'));
//reading the form data
// app.use(bodyParser());
app.use(express.urlencoded());


app.listen(port, function(err){

    if(err){
        //used interpolation here, used backticks
        console.log(`Error in running the server:${err}`)
    }

    console.log(`Server is running on port:${port}`);

})

//Defining a taskList

var taskList =[

    {
        description: 'Buy Vegetables',
        category:'PERSONAL',
        date:'26-08-2020'
    },

    {
        description: 'Deposit Cheques',
        category:'BANK',
        date:'30-08-2020'
    },

    {
        description: 'Visit Mom',
        category:'PERSONAL',
        date:'07-08-2020'
    },

]




//rendering our first page
app.get('/', function(req,res){
    return res.render('home',{

        title:"memo",
        task_list:taskList

    })


})

app.post('/create-task', function(req,res){

    console.log(req.body);

    //pushing a new task from the form
    taskList.push({

        description:req.body.description,
        category: req.body.category,
        date:req.body.date   

    })

    return res.redirect('/');

})

//Deleting a contact
app.post('/delete-task/', function(req,res){
    console.log(req.body);
    let date =req.body; 
  

        let taskIndex= taskList.findIndex(task => task.date == date);
    

        if(taskIndex != -1)
        {
            taskList.splice(taskIndex,1);
        }

      
    return res.redirect('/');
})