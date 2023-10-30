const request = require('postman-request')
const forecast=(lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a2537ff034f0fd5d02dfc1604d009d18&query='+lat+','+long+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            const current =body.current
            callback(undefined,current.weather_descriptions[0]+'. It is currently '+ current.temperature + ' degrees out. It feels like '+current.feelslike+ ' out. Its humidity is '+current.humidity+"%")
        }
    })
}
module.exports=forecast