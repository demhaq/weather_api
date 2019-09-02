
	let latitude = document.querySelector('#latitude');
	let longitude = document.querySelector('#longitude');	
	let button = document.querySelector('#button');
	let summary = document.querySelector('#summary');
	let temperature = document.querySelector('#temperature');
	let parameters = document.querySelector('#aq_parameter');
	let reading = document.querySelector('#aq_value');
	let unit = document.querySelector('#aq_unit');
	let lastupdate = document.querySelector('#aq_date');

    var lat,long,weather,air;
    
	if('geolocation' in navigator){
			console.log('i know your location');
			navigator.geolocation.getCurrentPosition( async position =>{
            try{
				lat = position.coords.latitude;
				long = position.coords.longitude;
				latitude.textContent = lat;
			    longitude.textContent = long;
			    const api_url = `/weather/${lat},${long}`;
				const response = await fetch(api_url);
				const json = await response.json();
				console.log(json);
				 weather = json.weather.currently;
				 air = json.air_quality.results[0].measurements[0];
				temperature.textContent = weather.temperature;
				summary.textContent = weather.summary;
	            parameters.textContent = air.parameter;  
			    reading.textContent = air.value;
			    unit.textContent = air.unit;
			    lastupdate.textContent = air.lastUpdated;
			   } catch(error){
			   	  console.error(error);
			   	  air = { value: -1 };
                  reading.textContent = 'NO READING';
			   }
			   const data = { lat,long,weather,air};
			  const options = {
				method:'POST',
				headers:{
					'Content-Type':'application/json'
				},
				body: JSON.stringify(data)
			   }
			  const db_response = await fetch('/api',options);
			  const db_json = await db_response.json();
			  console.log("be me",db_json);
		});
		
	} else{
		'geolcation is not available'
	}
	
	




