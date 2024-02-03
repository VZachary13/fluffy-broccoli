//51e27b761dce727f99c66d0530db9b8c
//api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=51e27b761dce727f99c66d0530db9b8c';

fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })



setInterval(function(){
    $('#time').text(dayjs().format('h:mm:ss a'));
    $("#date").text(dayjs().format('MMM DD, YYYY'));
}, 1000)