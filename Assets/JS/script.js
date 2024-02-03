//51e27b761dce727f99c66d0530db9b8c
//api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
var city = 'new york city';
var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=51e27b761dce727f99c66d0530db9b8c&units=imperial';

fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.list[0].dt_txt);
    })


setInterval(function(){
    $('#time').text(dayjs().format('h:mm:ss a'));
    $("#date").text(dayjs().format('MMM DD, YYYY'));
}, 1000)