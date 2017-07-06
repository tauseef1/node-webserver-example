const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});
app.set('view engine', 'hbs');


app.use((req, res, next) =>{
    var now = new Date().toString();
    var log= `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + "\n", function(error){
        console.log("Unable to write log to server.log file.")
    });
    next();
});

// app.use((req, res, next) =>{
//     res.render('test.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{    
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'This is a test message'
    });
});

app.get('/about', (req, res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});



app.listen(3000, function(){
    console.log("Example app listening on port 3000");
});

