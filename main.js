// Use jQuery to declare DOMs
let newDogButton = $('#newDogButton');
let dogImg = $('#dogImg');
let weatherForm = $('form');
let cityInput = $('#cityInput');
let weatherContent = $('#weather-content');
let weatherCard = $('<div class="card-body weatherCard"></div>').css('margin-top', '20px', 'margin-bottom', '20px');


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
    weatherContent.append(weatherCard);
    weatherCard.append(weatherTitle)  
    fetch(`https://goweather.herokuapp.com/weather/${city}`).then(
        function(httpRes){
            return httpRes.json();
        }
    ).then(
        function(data){
            console.log(data.temperature);
            let temp = convertCelsiusToFahrenheit(data.temperature);
            let wind = convertKphToMph(data.wind);
            let weatherDesc = $(`<p class="card-text">Today's weather in ${city} is ${temp.toFixed()} °F, ${data.description.toLowerCase()}, with ${wind.toFixed()} mph winds.</p>`);
            weatherCard.append(weatherDesc);
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


