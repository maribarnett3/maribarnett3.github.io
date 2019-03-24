var requestURL = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&APPID=e6a792fe2410d6dfcc36e069a159484b&units=imperial';
var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=' + cityId + '&APPID=e6a792fe2410d6dfcc36e069a159484b&units=imperial';

var noapi = { value: false };

function requestData(requestURL, type) {

    var request = new XMLHttpRequest();

    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var weatherData = request.response;
        if (type == 'weather') {
            summary(weatherData);
        } else {
            forecast(weatherData);
        }
    }
}

requestData(requestURL, 'weather');
requestData(forecastURL, 'forecast');


function summary(jsonObj) {
    document.getElementById(`clouds`).innerText = jsonObj.weather[0].description // or main?
    document.getElementById('average').innerText = jsonObj.main.temp_max
    document.getElementById('speed').innerText = jsonObj.wind.speed
    document.getElementById('humidity').innerText = jsonObj.main.humidity
    calcChill()
}

function forecast(jsonObj) {
    var events = jsonObj['list'];

    var forecastsAt18 = []

    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    for (let i = 0; i < events.length; i++) {
        var a = new Date(events[i].dt_txt)
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        if (hour != 18)
            continue
        var min = a.getMinutes();
        var sec = a.getSeconds();

        var weekday = weekdays[a.getDay()];
        events[i].weekday = weekday

        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        forecastsAt18.push(events[i])
    }

    for (let i = 0; i < forecastsAt18.length; i++) {
        var innerHTML = `<img src="https://openweathermap.org/img/w/` + forecastsAt18[i].weather[0].icon + `.png" alt="` + forecastsAt18[i].weather[0].description + `" width="50">` + forecastsAt18[i].main.temp + `&#176;`
        document.getElementById('f' + i).innerHTML = innerHTML
        document.getElementById('f' + i + 'd').innerText = forecastsAt18[i].weekday
    }
}