// Use jQuery to declare DOMs
let newDogButton = $('#newDogButton');
let dogImg = $('#dogImg');
let weatherForm = $('form');
let cityInput = $('#cityInput');


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

weatherForm.on('submit', function(){
    console.log(cityInput.val());
    alert(cityInput.val())
    // fetch(`https://goweather.herokuapp.com/weather/${cityInput.val()}`).then(
    //     function(httpRes){
    //         return httpRes.json();
    //     }
    // ).then(
    //     function(data){
    //         console.log(data.message);
    //     }
    // )
})


