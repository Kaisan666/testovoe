const options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
}
const setDayAndTime = function(){
    let date = new Date()
    let time = date.toLocaleTimeString()
    const day = date.toLocaleDateString(undefined, options).split(",")
    const dayHtml = document.getElementById("day")
    dayHtml.innerHTML =  day.reverse().join(", ")
    const clockHtml = document.getElementById("clock")
    clockHtml.innerHTML = time
}

setDayAndTime()
setInterval(setDayAndTime, 1000)


  


async function GetCity() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(`https://api.weatherstack.com/current?access_key=1bcd9d1208eedecb0421b3765625edc7&query=${latitude},${longitude}`);
        // const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=afbd98a0-0f3e-4ee1-a753-6463537773f1&geocode=${longitude},${latitude}&format=json`);
        
        const data = await response.json(); // Не забудьте парсить ответ

        console.log(data); // Выводим данные
        // console.log(data.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(",")[0]); // Выводим данные
        console.log(latitude);
        console.log(longitude);
    }, (error) => {
        console.error("Ошибка получения геолокации: ", error);
    });
}

GetCity();

