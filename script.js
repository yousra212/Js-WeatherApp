const apikey="e0c6f55242733ea77e93c9ec49796b3f";
window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon= position.coords.longitude;
            let lat= position.coords.latitude;
            const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;
            
            fetch(url).then((res)=>{
                return res.json();
            }).then((data)=>{
                console.log(data);
                console.log(new Date().getTime())
                let dat= new Date(data.dt)
                console.log(dat.toLocaleString(undefined,'Europe/Aalst'))
                console.log(new Date().getMinutes())
                weatherReport(data);
            })
        })
        };
    }
)

function searchByCity(){
    let place = document.getElementById('input').value;
    let urlsearch= `https://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${apikey}`;

    fetch(urlsearch).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        weatherReport(data);
    })
    document.getElementById('input').value='';

    const unsplashAPIKey = "MInddK7MyhW9b24BAfiJbYlPC0LDYEkuRcvf0lNotjQ";
    const city = 'place';

    fetch(`https://api.unsplash.com/photos/random?query=landscape&${place}&client_id=${unsplashAPIKey}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)

    const imageUrl = data.urls.regular;
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";

    });
}

setInterval(function(){
    let time = document.getElementById('time');
    let currentTime = new Date().toLocaleTimeString();
    time.innerText = currentTime;
  }, 1000);  

function weatherReport(data){
    let urlcast= `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;

    fetch(urlcast).then((res)=>{
        return res.json();
    }).then((forecast)=>{
        console.log(forecast.city);
        dayForecast(forecast)
        console.log(data);
        
        document.getElementById('city').innerText= data.name + ', ' + data.sys.country;
        
        document.getElementById('temperature').innerText= Math.floor(data.main.temp-273)+ ' °C';
    
        document.getElementById('humidity').innerText= 'Humidity' + ' ' + ':' + ' ' + data.main.humidity + ' '+ '%';

        document.getElementById('wind').innerText= 'Wind Speed' + ' ' + ':' + ' ' + data.wind.speed + 'km/h';

        let icon = document.createElement('img');
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png`);
        icon.setAttribute('alt', 'weather icon');
        icon.setAttribute('class', 'w-icon');
        div.appendChild(icon);
        
    })
}

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''
    for (let i = 7; i < forecast.list.length; i+=7) {
        console.log(forecast.list[i]);
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        
        console.log(forecast.main) 
        let day= document.createElement('p');
        day.setAttribute('class','date')
        day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Europe/Aalst');
        // new date 
        div.appendChild(day);

        let icon = document.createElement('img');
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png`);
        icon.setAttribute('alt', 'weather icon');
        icon.setAttribute('class', 'w-icon');
        div.appendChild(icon);

        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C';
        div.appendChild(temp)

        let humidity = document.createElement('p');
        humidity.setAttribute('class','humidity-days');
        humidity.innerText = 'Humidity' + ' ' + ':' +' '+ forecast.list[i].main.humidity + ' ' + '%';
        div.appendChild(humidity);

        document.querySelector('.weekF').appendChild(div)
    }
} 
