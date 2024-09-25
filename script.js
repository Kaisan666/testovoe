const setImg = function (hoursNow) {
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

  // default :
  //     imgUrl = "url(images/night.jpg)"
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
const setDayAndTime = function () {
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


const setCityAndWeather = function (data) {
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
  console.log(img);
  document.getElementById("weather_img").appendChild(img);
};


async function GetCity(CITY_DEFAULT) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      // console.log(cords)
      // const response = await fetch(`https://api.weatherbit.io/v2.0/current`);
      // const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=afbd98a0-0f3e-4ee1-a753-6463537773f1&geocode=${longitude},${latitude}&format=json`);

      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=1bcd9d1208eedecb0421b3765625edc7&query=${latitude},${longitude}`
      );
      const data = await response.json();

      console.log(data); // Выводим данные
      // console.log(data.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(",")[0]); //
      console.log(latitude);
      console.log(longitude);
      localStorage.setItem("city", `${data.location.region}` )
      setCityAndWeather(data)
      console.log(localStorage.getItem('city'))
      // const
    },
    async (error) => {
      if(localStorage.getItem('city') !== null){
        const response = await fetch(
          `https://api.weatherstack.com/current?access_key=1bcd9d1208eedecb0421b3765625edc7&query=${localStorage.getItem('city')}`
        );
        const data = await response.json();
        setCityAndWeather(data);
      }
      else {
      console.log(CITY_DEFAULT);
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=1bcd9d1208eedecb0421b3765625edc7&query=${CITY_DEFAULT}`
      );
      const data = await response.json();
      setCityAndWeather(data);

      console.log(data);
      console.log("что то пошло не так или вы запретили доступ к геопозиции");
    }}
  );
}
const GetCityInterval = function(){
  return GetCity(CITY_DEFAULT)
}
GetCity(CITY_DEFAULT);
setInterval(GetCityInterval, 3600000);

