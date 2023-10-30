const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const PORT = process.env.PORT || 3000
//Define paths for Express Config
const publicDirectory=path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Panshul Jindal'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About us',
        name: 'Panshul Jindal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Help Me!',
        title: 'Help',
        name: 'Panshul Jindal'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error: "You must enter an address"});
    }
    geoCode(req.query.address,(error,{longitude, latitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Panshul Jindal',
        error: "Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Panshul Jindal',
        error: "Page not found"
    })
})

app.listen(PORT,()=>{
    console.log('Server is up on port '+PORT)
})


// app.get('/help',(req,res)=>{
//     res.send([{
//             name: 'Pankhu',
//             age: 1
//         },{
//             name: 'Panshul'
        
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
// })