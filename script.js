const api = {
    key: "da80c4f22581a731c615c943c0b4f2b6",
    base: "https://api.openweathermap.org/data/2.5/" 
}

const api2 = {
    key: "T89XRU8S2XHX72RPHBSFH3KJM",
    base: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
}

const searchbox = document.querySelector(".search-box")

searchbox.addEventListener("keypress", (event) => {
    if(event.keyCode == 13){
        getResults(searchbox.value)
        getAlerts(searchbox.value)
        console.log(searchbox.value)
    }
})

const getResults = (query) => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => { 
           return weather.json()
        }).then(displayResults)
}

const displayResults = (weather) => {
    //console.log(weather)
    let city = document.querySelector(".location .city")
    city.innerText = `${weather.name}, ${weather.sys.country}`
    let d = document.querySelector(".location .date")
    let now = new Date()
    d.innerText = dateBuilder(now)
    let temperature = document.querySelector(".current .temp")
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`
    let weather_el = document.querySelector(".current .weather")
    weather_el.innerText = `${weather.weather[0].main}`
    let high_low = document.querySelector(".current .hi-low")
    high_low.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`

}

const getAlerts = (query) => {
    fetch(`${api2.base}${query}?q=&key=${api2.key}`).then(Response => {
        if (Response.ok){
        return Response.json()
    }}).then(displayAlert)
}

const displayAlert = (Response) => {
    console.log(Response)
    let alert = document.querySelector(".alert .alert-warning")
    let warning = document.querySelector(".alert .warning")
    //let warning = document.querySelector(".alert .warning").remove
    //onsole.log(alert.textContent)
    if(Response.alerts.length == 0){
        console.log('no warnings')
        //document.querySelectorAll(".alert")[0].style.visibility = 'hidden'
        alert.innerText = " "
        warning.innerText = " "
        //console.log(alert.innerText)
    }else{
        //console.log('WARNINGS!')
        alert.textContent = `${Response.alerts[0].event}`
        warning.textContent = "WARNING!"
        //console.log(alert.textContent)
    }
}
