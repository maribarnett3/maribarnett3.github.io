// load json into index.html
var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function () {
    var towns = request.response;
    if(townName){

    } else{
    populateTowns(towns);
    }
    // populateEvents(towns);
}

function popEvents(town){
    
}

function populateTowns(jsonObj) {
    // console.log(jsonObj)

    var currTowns = ['Preston', 'Soda-Springs', 'Fish-Haven']
    for (let i = 0; i < jsonObj.towns.length; i++) {
        var town = jsonObj.towns[i];
        var townName = town.name.replace(' ', '-')
        if (currTowns.indexOf(townName) != -1) {
            // console.log(town)
            document.getElementById(townName + "-town").innerText = town.name
            document.getElementById(townName + "-motto").innerHTML = `<strong><em>`+town.motto+`</em></strong>`
            document.getElementById(townName + "-yearFounded").innerHTML = `<strong>Year Founded: </strong>`+town.yearFounded
            document.getElementById(townName + "-currentPopulation").innerHTML = `<p><strong>Population: </strong>`+town.currentPopulation
            document.getElementById(townName + "-averageRainfall").innerHTML = `<strong>Annual Rain Fall: </strong>`+town.averageRainfall+`"`
        }

    }
}