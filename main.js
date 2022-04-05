// Use jQuery to declare DOMs
let newDogButton = $('#newDogButton');
let dogImg = $('#dogImg');
// let body = $('body');
// let header = $('<div></div>');
// body.append(header);
// header.text('HELLO');


// use eventlistener 
newDogButton.on('click', function(){
// Use API to fetch random dog img
    fetch('https://dog.ceo/api/breeds/image/random').then(
        function(httpRes){
            return httpRes.json();
        }
    ).then(
        function(data){
            console.log(data.message)
            dogImg.attr("src", data.message);
        }
    );
});


