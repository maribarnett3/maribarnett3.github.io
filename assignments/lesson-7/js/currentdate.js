var currDate = new Date()
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

document.getElementById(`date`).innerText=currDate.toLocaleDateString("en-US", options)