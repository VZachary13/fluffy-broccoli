
$(function(){
var city;
var cityArray=[];
    let weather = {
        apiKey: "51e27b761dce727f99c66d0530db9b8c",
        fetchWeather: function (city) {
            fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+ this.apiKey +'&units=imperial').then((response) => response.json())
            .then((data) => this.displayWeather(data))
        },
        displayWeather: function (data) {
            console.log(data);
        },
        fetchTodaysWeather: function (city) {
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+ this.apiKey +'&units=imperial').then((response) => response.json())
            .then((data) => this.displayTodaysWeather(data))
        },
        displayTodaysWeather: function (data) {
            console.log(data);
            $('#city').text(data.name);
            $('#currentIcon').attr('src', "http://openweathermap.org/img/w/"+data.weather[0].icon+".png");
            $('#current-date').text(dayjs().format("MM/DD/YY"))
        }
    }
;

$('#submit').on('click', function(){
    city = $(this).siblings('#testname').val();
    event.preventDefault();
    getCity(city);
    saveCity(city);
    makeButtons(city);
});
setInterval(function(){
    $('#time').text(dayjs().format('h:mm:ss a'));
    $("#date").text(dayjs().format('MMM DD, YYYY'));
}, 1000)

function getCity(city) {
    if(city){
        weather.fetchTodaysWeather(city);
        weather.fetchWeather(city);
    }else {
        alert("Please Enter A City");
    }
}

function saveCity(city) {
    cityArray.push(city);
    console.log(cityArray)
    localStorage.setItem("searchHistory", JSON.stringify(cityArray));
    cityArray = [];
}

function makeButtons(city) {
    var button = document.createElement('button');
    cityArray.push(JSON.parse(localStorage.getItem("searchHistory")));
    console.log(cityArray + "and"+ localStorage.getItem("searchHistory"));
    cityArray.forEach(element => {
        $("#search-history").append(button);
        button.textContent = element;
    });
}




// localStorage.setItem("names", JSON.stringify(names));

// //...
// var storedNames = JSON.parse(localStorage.getItem("names"));
})//MUST BE AT BOTTOM