var noapi = noapi || { value: true };
function calcChill() {
    let s = parseInt(document.getElementById('speed').innerHTML);
    let t = parseInt(document.getElementById('average').innerHTML);


    // Processing - some random formula processing with the variable
    let result = 35.74 + .6215 * t - 35.75 * Math.pow(s, .16) + .4275 * t * Math.pow(s, .16)

    document.getElementById('factor').innerHTML = "<strong>" + result.toFixed(1) + "</strong>";
}

if(noapi.value){
    calcChill()
}