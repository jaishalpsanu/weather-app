const bgimage = document.getElementById("theme");

// DARK / LIGHT

bgimage.addEventListener("click", function(){


document.body.classList.toggle("changebg");

if(document.body.classList.contains("changebg")){

    bgimage.textContent = "☀️ Light";

} else {

    bgimage.textContent = "🌙 Dark";

}


});

// ELEMENTS

const searchBox = document.querySelector(".inputbox");
const searchBtn = document.getElementById("searchbtn");

const locationText = document.querySelector(".error");
const temperature = document.querySelector(".temparature");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");

const favoriteBtn = document.getElementById("favoriteBtn");

const favoriteList = document.getElementById("favoriteList");

const API_KEY = "c1357be71b354e3c80561738261909";

let currentCity = "";

// SEARCH BUTTON

searchBtn.addEventListener("click", function(){


const city = searchBox.value.trim();

if(city === ""){

    locationText.textContent = "Enter location";

    return;

}

getWeather(city);


});

// GET WEATHER

async function getWeather(city){


try{

    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );


    const data = await response.json();

    console.log(data);


    // CHECK API ERROR

if(data.error){

    locationText.textContent = "City not found";

    temperature.textContent = "0°C";
    condition.textContent = "----";
    humidity.textContent = "Humidity : 0%";
    windSpeed.textContent = "Wind Speed : 0 km/h";

    currentCity = "";

    return;
}


// CHECK SEARCHED CITY

const searchedCity = city.toLowerCase().trim();

const foundCity = data.location.name.toLowerCase().trim();

if(
    !foundCity.includes(searchedCity) &&
    !searchedCity.includes(foundCity)
){

    locationText.textContent = "City not found";

    temperature.textContent = "0°C";
    condition.textContent = "----";
    humidity.textContent = "Humidity : 0%";
    windSpeed.textContent = "Wind Speed : 0 km/h";

    currentCity = "";

    return;
}

    // CITY

    currentCity = data.location.name;

    locationText.textContent = currentCity;


    // TEMPERATURE

    temperature.textContent =
        Math.round(data.current.temp_c) + "°C";


    // CONDITION

    condition.textContent =
        data.current.condition.text;


    // HUMIDITY

    humidity.textContent =
        "Humidity : " + data.current.humidity + "%";


    // WIND SPEED

    windSpeed.textContent =
        "Wind Speed : " + data.current.wind_kph + " km/h";


}

catch(error){

    console.log(error);

}


};

// ADD FAVORITE

favoriteBtn.addEventListener("click", function(){


if(currentCity === ""){

    return;

}


let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];


// CHECK DUPLICATE

if(favorites.includes(currentCity)){

    return;

}


favorites.push(currentCity);


localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
);


showFavorites();


});

// SHOW FAVORITES

function showFavorites(){


let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];


favoritesTitle.innerHTML = "Favorites";


favorites.forEach(function(city, index){

    const item = document.createElement("div");

    item.className = "favoriteItem";


    const cityName = document.createElement("span");

    cityName.textContent = "⭐ " + city;


    const removeBtn = document.createElement("button");

    removeBtn.className = "removeBtn";

    removeBtn.textContent = "×";


    removeBtn.addEventListener("click", function(){

        favorites.splice(index, 1);


        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );


        showFavorites();

    });


    item.appendChild(cityName);

    item.appendChild(removeBtn);


    favoritesTitle.appendChild(item);

});

}

showFavorites();


// SHOW FAVORITES

function showFavorites(){

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favoriteList.innerHTML = "";


    favorites.forEach(function(city, index){

        const item = document.createElement("div");

        item.className = "favoriteItem";


        const cityName = document.createElement("span");

        cityName.textContent = "⭐ " + city;


        const removeBtn = document.createElement("button");

        removeBtn.className = "removeBtn";

        removeBtn.textContent = "×";


        removeBtn.addEventListener("click", function(){

            favorites.splice(index, 1);


            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );


            showFavorites();

        });


        item.appendChild(cityName);

        item.appendChild(removeBtn);


        favoriteList.appendChild(item);

    });

}

showFavorites();
