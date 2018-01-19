const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Error logging to file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text)  {
    //console.log(JSON.stringify(arguments, undefined, 2));
    return text.toUpperCase();
});

// Params: Request, Response
app.get('/', (req, res) => {
    //res.send('<h1>Ponies</h1>')
    // res.send({
    //     name: 'Lyra',
    //     likes: ['Food', 'Walking', 'Sleeping']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Sweet Home',
        welcomeMessage: "please go away!!!!",
        mittens: 'hhhhhhhhhhh'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Project Page'
    });
});

app.get('/mittens', (req, res) => {
    res.send('<h1>Mittens are lovely</h1>')
});

app.get('/bad', (req, res) => {
    //res.send('<h1>Ponies</h1>')
    res.send({
        errorMessage: 'Oh'
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

