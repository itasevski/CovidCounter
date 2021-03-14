const total_cases_url = "https://covid2019-api.herokuapp.com/v2/total";
const macedonia_cases_url = "https://covid2019-api.herokuapp.com/v2/current";
const usa_cases_url = "https://covid2019-api.herokuapp.com/v2/country/US";
var d;

var days = new Array(7);
days[0] = "Sunday";
days[1] = "Monday";
days[2] = "Tuesday";
days[3] = "Wednesday";
days[4] = "Thursday";
days[5] = "Friday";
days[6] = "Saturday";

async function GET_CASES() {
    var response = await fetch(total_cases_url);
    var DATA = await response.json();

    var confirmed = DATA.data.confirmed;
    var deaths = DATA.data.deaths;
    var recoveries = DATA.data.recovered;

    confirmed = numberWithCommas(confirmed);
    deaths = numberWithCommas(deaths);
    recoveries = numberWithCommas(recoveries);

    document.getElementById("total_cases").textContent = confirmed;
    document.getElementById("deaths").textContent = "Deaths: " + deaths;
    document.getElementById("recoveries").textContent = "Recoveries: " + recoveries;
}

async function GET_CASES_COUNTRIES() {
    var response_us = await fetch(usa_cases_url);
    var response_mk = await fetch(macedonia_cases_url);

    var data_us = await response_us.json();
    var data_mk = await response_mk.json();

    var confirmed_us = data_us.data.confirmed;
    var deaths_us = data_us.data.deaths;
    var recoveries_us = data_us.data.recovered;

    confirmed_us = numberWithCommas(confirmed_us);
    deaths_us = numberWithCommas(deaths_us);
    recoveries_us = numberWithCommas(recoveries_us);

    var confirmed_mk = data_mk.data[82].confirmed;
    var deaths_mk = data_mk.data[82].deaths;
    var recoveries_mk = data_mk.data[82].recovered;

    confirmed_mk = numberWithCommas(confirmed_mk);
    deaths_mk = numberWithCommas(deaths_mk);
    recoveries_mk = numberWithCommas(recoveries_mk);

    document.getElementById("us-confirmed-cases").innerHTML = "TOTAL CASES: " + confirmed_us;
    document.getElementById("us-deaths").innerHTML = "DEATHS: " + deaths_us;
    document.getElementById("us-recoveries").innerHTML = "RECOVERIES: " + recoveries_us;

    document.getElementById("mk-confirmed-cases").innerHTML = "TOTAL CASES: " + confirmed_mk;
    document.getElementById("mk-deaths").innerHTML = "DEATHS: " + deaths_mk;
    document.getElementById("mk-recoveries").innerHTML = "RECOVERIES: " + recoveries_mk;
}

function setDate() {
    d = new Date();
    document.getElementById("date").textContent = days[d.getDay()] + ", " + d.toLocaleDateString();
}

setInterval(setDate, 3600000);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

GET_CASES_COUNTRIES();
setInterval(GET_CASES_COUNTRIES, 900000);

GET_CASES();
setInterval(GET_CASES, 900000);

