const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000 ;
app.listen(port,() =>  console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();
app.get('/api',(request,response) => {
    
    database.find({}).sort({ timestamp: -1 }).exec(function (err, data) {
  // docs is [doc1, doc3, doc2]
   if(err){
    		respond.end();
    		return;
    	}
        response.json(data);
});
});

app.post('/api',(request,response) => {
	console.log('I got request');
	const data = request.body;
	database.insert(data);
	response.json(data);
});


app.get('/weather/:latlong',async(request,response) => {
	console.log(request.params);
	const latlong = request.params.latlong.split(',');
	console.log(latlong);
	const lat = latlong[0];
	const long = latlong[1];
	console.log(lat,long);
	const api_key = process.env.API_KEY;
	const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${long}/?units=si`;
	const weather_response = await fetch(weather_url);
	const weather_data = await weather_response.json();

    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${long}`;
	const aq_response = await fetch(aq_url);
	const aq_data = await aq_response.json();

	const data = {
		weather: weather_data,
		air_quality: aq_data
	}


	response.json(data);
})





