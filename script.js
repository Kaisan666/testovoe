function setImg(hoursNow) {
  const timesOfDay = {
    morningHours: new Date("December 17, 1995 6:00:00").getHours(),
    dayHours: new Date("December 17, 1995 12:00:00").getHours(),
    eveningHours: new Date("December 17, 1995 18:00:00").getHours(),
    nightHours: new Date("December 17, 1995 24:00:00").getHours(),
  };
  let imgUrl = "url(images/night.jpg)";
  const body = document.querySelector(".wrapper");
  if (hoursNow >= timesOfDay.morningHours && hoursNow < timesOfDay.dayHours) {
    imgUrl = "url(images/morning.jpg)";
  }
  if (hoursNow >= timesOfDay.dayHours && hoursNow < timesOfDay.eveningHours) {
    imgUrl = "url(images/day.jpg)";
  }
  if (hoursNow >= timesOfDay.eveningHours) {
    imgUrl = "url(images/evening.jpg)";
  }

  document.body.style.backgroundImage = imgUrl;
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
};
const options = {
  month: "long",
  day: "numeric",
  weekday: "long",
};
function setDayAndTime() {
  const date = new Date();
  const hoursNow = date.getHours();
  const time = date.toLocaleTimeString();
  const day = date.toLocaleDateString(undefined, options).split(",");
  const dayHtml = document.getElementById("day");
  dayHtml.innerHTML = day.reverse().join(", ");
  const clockHtml = document.getElementById("clock");
  clockHtml.innerHTML = time;
  setImg(hoursNow);
};
setDayAndTime();
setInterval(setDayAndTime, 1000);

const CITY_DEFAULT = "Krasnodar";


function setCityAndWeather(data) {
  const img = document.createElement("img");
  const city = document.getElementById("city");
  const weather = document.getElementById("weather");
  const temperature = document.getElementById("temperature");
  const imgUrl = data.current.weather_icons[0];
  weather.innerHTML = data.current.weather_descriptions[0];
  temperature.innerHTML = data.current.temperature + "°C";
  city.innerHTML = data.location.region;
  img.src = imgUrl;
  img.alt = data.current.weather_descriptions[0];
  document.getElementById("weather_img").appendChild(img);
};

const APIKEY = "bcf17a714cfce1a17a34a7b5b1c99fb8"
async function GetCity(CITY_DEFAULT) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${APIKEY}&query=${latitude},${longitude}`
      );
      const data = await response.json();
      localStorage.setItem("city", `${data.location.region}` )
      setCityAndWeather(data)
      // const
    },
    async (error) => {
      if(localStorage.getItem('city') !== null){
        const response = await fetch(
          `https://api.weatherstack.com/current?access_key=${APIKEY}&query=${localStorage.getItem('city')}`
        );
        const data = await response.json();
        setCityAndWeather(data);
      }
      else {
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${APIKEY}&query=${CITY_DEFAULT}`
      );
      const data = await response.json();
      setCityAndWeather(data);
      console.log("что то пошло не так или вы запретили доступ к геопозиции");
    }}
  );
}
function GetCityInterval(){
  return GetCity(CITY_DEFAULT)
}
GetCity(CITY_DEFAULT);

