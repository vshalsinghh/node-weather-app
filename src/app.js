const express= require('express');
const path= require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//Define Paths for express config
const publicDir = path.join(__dirname,'../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');
//set up views location and handlebars engine
app.set('views', viewsDir);
app.set('view engine','hbs');
hbs.registerPartials(partialsDir);

//setup static directory to serve
app.use(express.static(publicDir));

app.get('',(req,res) => {
    res.render('index' , {
        title:'Weather App',
        name:'Vishal Singh'
    })
})
app.get('/about',(req,res) => {
    res.render('about' , {
        title:'About',
        name:'Vishal Singh'
    })
})
app.get('/help',(req,res) => {
    res.render('help' , {
        title:'Help',
        message:'Contact us if u need any help.',
        name:'Vishal Singh'
    })
})


app.get('/weather', (req, res) => {

    const address = req.query.address ;
    if(!req.query.address){
        return res.send({
            error: 'Must add address in the query string'
        })
    }
    geocode(address , (error, { lattitude, longitude, location} = {}) => {
        if(error){
           return  res.send({ error})
        }
        else{
           forecast( lattitude, longitude, (forecastError, forecastData) => {
               if(error){
                   return res.send({error: forecastError})
               }
               else{
                    res.send({
                        forecast: forecastData,
                        location,
                        address,
                    })
               }
           })
        }
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Vishal Singh',
        errorMessage: 'Help article not found.',
    })
})
app.get('*', (req, res) => {
    res.render('404' , {
        title: '404',
        name: 'Vishal Singh',
        errorMessage: 'Page not found.',
        
    })
})
app.listen(port, () => {
    console.log('The server is up at port ' + port);
})
