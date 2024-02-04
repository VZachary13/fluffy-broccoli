
$(function(){
var city;
var today = dayjs().format("MM/DD/YYYY");
var todaysIcon;
var cityList={};
    let weather = {
        apiKey: "51e27b761dce727f99c66d0530db9b8c",
        fetchWeather: function (city) {
            fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+ this.apiKey +'&units=imperial').then((response) => response.json())
            .then((data) => this.displayWeather(data))
        },
        displayWeather: function (data) {
            console.log(data);

            var counter = 0;
            $("#five-day-display").children('section').each(function(){

                do {
                    var tempIcon = data.list[counter].weather[0].icon.substr(2, 1);
                    console.log(tempIcon);
                    var todaysIconTemp = todaysIcon.substr(2,1);
                    console.log(todaysIconTemp);
                    var tempDate = data.list[counter].dt_txt.slice('', 10);
                    var year = tempDate.substr(0, 4);
                    var month = tempDate.substr(5, 2);
                    var day = tempDate.substr(8, 2);
                    var date = month +"/"+ day + "/" + year;
                    counter++;
                } while ((date == today) || (tempIcon != todaysIconTemp))
                $(this).children('.date').text(date);
                $(this).children('img').attr('src', "http://openweathermap.org/img/w/"+data.list[counter].weather[0].icon+".png");
                $(this).children().children('.forecast-temp').text(data.list[counter].main.temp);
                $(this).children().children('.forecast-wind').text(data.list[counter].wind.speed);
                $(this).children().children('.forecast-humidity').text(data.list[counter].main.humidity);

                counter +=8;
            })
        },
        fetchTodaysWeather: function (city) {
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+ this.apiKey +'&units=imperial').then((response) => response.json())
            .then((data) => this.displayTodaysWeather(data))
        },
        displayTodaysWeather: function (data) {
            console.log(data);
            todaysIcon = data.weather[0].icon;
            $('#city').text(data.name);
            $('#currentIcon').attr('src', "http://openweathermap.org/img/w/"+todaysIcon+".png");
            $('#current-date').text(today);
            $('#tempNum').text(data.main.temp);
            $('#wind').text(data.wind.speed);
            $('#humidity').text(data.main.humidity);
        }
    }
;

$('#submit').on('click', function(){
    city = $(this).siblings('#cityname').val();
    event.preventDefault();
    getCity(city);
    if(city){
        saveCity(city);
        makeButtons();
    }
});

$('#search-history').click(function(){
    event.preventDefault();
    city = event.target.textContent;
    getCity(city);
});

$('#clearHistory').click(clearSearchHistory);
makeButtons();



setInterval(function(){
    $('#time').text(dayjs().format('h:mm:ss a'));
    $("#date").text(dayjs().format('MMM DD, YYYY'));
}, 1000)

function getCity(city) {
    if(city){
        weather.fetchTodaysWeather(city);
        weather.fetchWeather(city);
        $("#weather").attr('style', 'display: block;');
    }else {
        alert("Please Enter A City");
    }
}

function saveCity(city) {
    cityList[city] = city;
    localStorage.setItem("searchHistory", JSON.stringify(cityList));
}

function makeButtons() {
    var searchHistory = $('#search-history');
    cityList = JSON.parse(localStorage.getItem("searchHistory"));
    searchHistory.html('');
    for (var key in cityList) {
    var button = document.createElement('button');
    searchHistory.append(button);
    button.textContent = cityList[key];
    }
}

function clearSearchHistory() {
    var searchHistory = $('#search-history');
    searchHistory.html('');
    localStorage.setItem("searchHistory", '');
    cityList = {};
}





})//MUST BE AT BOTTOM