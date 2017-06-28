$(document).ready(function() {
    var lat, lon, api_url;
    
    if ("geolocation" in navigator) {
        
        $('#showTemp').on('click', function() {
           navigator.geolocation.getCurrentPosition(gotLocation);
            
            function gotLocation(position) {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
               
                api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + 
                lat + '&lon=' +
                lon +  '&units=metric&appid=f8a0958cd809d850a142c6839dd2107d';   
            
                $.ajax({
                    url: api_url,
                    method: 'GET',
                    success: function(data) {
						var main = Math.round(((data.wind.speed) * 2.23693629)*100)/100;
						var mainWeather = (data.weather[0].description);
                        var tempr = Math.round(((data.main.temp) * 9/5 + 32)*100)/100;
						var humid = (data.main.humidity);
						var city = (data.name);
                        $('#result').text(tempr + ' degrees');
						$('#wind').text(main + ' mph');
						$('#sky').text(mainWeather);
						$('#humid').text(humid + ' %');
						$('#city').text(city);
                    }
                });
            
            }
        });
    
    } else {
        alert("Your browser doesn't support geolocation, sorry!");
    }
});