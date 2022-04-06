// Use jQuery to declare DOMs
let newDogButton = $('#newDogButton');
let dogImg = $('#dogImg');
let weatherForm = $('form');
let cityInput = $('#cityInput');
let weatherContent = $('#weather-content');
let weatherCard = $('<div class="card-body weatherCard"></div>').css('margin-top', '20px', 'margin-bottom', '20px');
let weatherTable = $(`table`);
// let thead = $('thead');
// let tr = $('tr');
// let caption = $('<caption>3-Day Forecast</caption>')
let thead = $(`<caption>3-Day Forecast</caption><thead><tr>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
</tr></thead>`);


// use eventlistener 
newDogButton.on('click', function(){
// Use API to fetch random dog img
    fetch('https://dog.ceo/api/breeds/image/random').then(
        function(httpRes){
            return httpRes.json();
        }
    ).then(
        function(data){
            dogImg.attr("src", data.message);
        }
    );
});

weatherForm.on('submit', function(event){
    event.preventDefault();
    let city = $('#cityInput').val();
    let weatherTitle = $(`<h5 class="card-title">${city} Weather</h5>`);
    weatherCard.empty()
    weatherTable.empty();
    weatherContent.append(weatherCard);
    weatherCard.append(weatherTitle)  
    fetch(`https://goweather.herokuapp.com/weather/${city}`).then(
        function(httpRes){
            if (httpRes.status !== 200){
                alert(`The weather for ${city} is not available. Please try a differnt city.`);
            }
            return httpRes.json();
        }
    ).then(
        function(data){
            console.log(data);
            if (data.message === 'NOT_FOUND' || data.temperature === ''){
                let weatherDesc = $(`<p class="card-text">Not available. Please try a differnt city.</p>`);
                weatherCard.append(weatherDesc);
            } else {
                let temp = convertCelsiusToFahrenheit(data.temperature);
                let wind = convertKphToMph(data.wind);
                let weatherDesc = $(`<p class="card-text">Today's weather in ${city} is ${temp.toFixed()} °F, ${data.description.toLowerCase()}, with ${wind.toFixed()} mph winds.</p>`);
                weatherCard.append(weatherDesc);
                weatherTable.append(thead);
                let body = $(`<tbody>
                <tr>
                  <th scope="row">${getDayOfTheWeek(1)}</th>
                  <td>${convertCelsiusToFahrenheit(data.forecast[0].temperature).toFixed()} °F</td>
                  <td>${convertKphToMph(data.forecast[0].wind).toFixed()} mph winds</td>
                </tr>
                <tr>
                  <th scope="row">${getDayOfTheWeek(2)}</th>
                  <td>${convertCelsiusToFahrenheit(data.forecast[1].temperature).toFixed()} °F</td>
                  <td>${convertKphToMph(data.forecast[1].wind).toFixed()} mph winds</td>
                </tr>
                <tr>
                  <th scope="row">${getDayOfTheWeek(3)}</th>
                  <td>${convertCelsiusToFahrenheit(data.forecast[2].temperature).toFixed()} °F</td>
                  <td>${convertKphToMph(data.forecast[2].wind).toFixed()} mph winds</td>
                </tr>
              </tbody>`);
              weatherTable.append(body)
            }
        }
    )
    cityInput.val('');
});

// Helper Function
function convertCelsiusToFahrenheit(cel){
    return (parseInt(cel) * (9/5)) + 32;
}

function convertKphToMph(kph){
    return (parseInt(kph) / 1.609344);
}

function getDayOfTheWeek(num){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    return weekday[d.getDay()+num];
}


