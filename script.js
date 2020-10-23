const weekList = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday'};
const monthList = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'};
const fonList = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20'];

welcomeLine = document.querySelector('header > div > h4');

let fonNight = localStorage.getItem('fonNight') ? localStorage.getItem('fonNight') : localStorage.setItem('fonNight', 1);
let fonMorning = localStorage.getItem('fonMorning') ? localStorage.getItem('fonMorning') : localStorage.setItem('fonMorning', 1);
let fonDay = localStorage.getItem('fonDay') ? localStorage.getItem('fonDay') : localStorage.setItem('fonDay', 1);
let fonEvening = localStorage.getItem('fonEvening') ? localStorage.getItem('fonEvening') : localStorage.setItem('fonEvening', 1);
let numThisFone = localStorage.getItem('numThisFone') ? localStorage.getItem('numThisFone') : localStorage.setItem('numThisFone', 1);
let standingBg = localStorage.getItem('standingBg') ? localStorage.getItem('standingBg') : localStorage.setItem('standingBg', 0);
// function loadJSON(path, success, error)
// {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function()
//     {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 if (success)
//                     success(JSON.parse(xhr.responseText));
//             } else {
//                 if (error)
//                     error(xhr);
//             }
//         }
//     };
//     xhr.open("GET", path, true);
//     xhr.send();
//     console.log();
// }
// let dareJsonCitys;
// loadJSON('assets/cityList.json',
//         function(data) { dareJsonCitys = data; console.log(data); },
//         function(xhr) { console.error(xhr); }
// );

// console.log(IP);
let nameInput = '';
console.log(localStorage);
// console.log('dareJsonCitys',dareJsonCitys);



const time = () => {
    let dateTime = new Date();
    document.getElementById("time").innerHTML = `${addZero(dateTime.getHours())} : ${addZero(dateTime.getMinutes())} : ${addZero(dateTime.getSeconds())}`;
    document.getElementById("date").innerHTML = `${weekList[dateTime.getDay()]} ${dateTime.getDate()} ${monthList[Number(dateTime.getMonth() + 1)]}`;
    if (dateTime.getMinutes() === 59 && dateTime.getSeconds() === 10 ) backgroundImg('new');
    setTimeout(time, 1000)
  }
const addZero = (item) =>  String(item).length < 2 ?`0${item}`:item;
const welcome = () => {
    const dateTime = new Date();
    if ((dateTime.getHours() >= 0 && dateTime.getHours() < 6) || dateTime.getHours() === 24) welcomeLine.innerHTML = 'goodnight';
    else {
        if (dateTime.getHours() > 6) welcomeLine.innerHTML = 'good morning ';
        if (dateTime.getHours() > 12) welcomeLine.innerHTML = 'good day ';
        if (dateTime.getHours() > 18) welcomeLine.innerHTML = 'good evening ';
    }
}

const start = () => {
    if (localStorage.getItem('userName')) document.querySelector('header > div > p').innerHTML = `&ensp; ${localStorage.getItem('userName')} <button onclick="editLine('header > div > p','userName','${localStorage.getItem('userName')}')">edit text</button>`;
    if (localStorage.getItem('taskToday')) document.querySelector('div.taskBox > p').innerHTML = `Your goal today: ${localStorage.getItem('taskToday')} <button onclick="editLine('div.taskBox > p','taskToday','${localStorage.getItem('taskToday')}')">edit text</button>`;
    backgroundImg('old');
}

const editLine = (to, name, locLet) => {
    document.querySelector(to).innerHTML = `
        <input type="text" name="${name}" id="${name}" value="${locLet}">
        <button onclick="writeLine('input#${name}','${to}')">enter task</button>`;
}

const writeLine = (from, to) => {
    const val = document.querySelector(from);
    localStorage.setItem(val.id, val.value);
    start ();
}
const backgroundImg = (newFon) => {
    const dateTime = new Date();
    let folder = ''; let numFon = 1;
    if (newFon === 'new' && standingBg <= 0) {
        console.log('new')
        if (dateTime.getHours() >= 0 && dateTime.getHours() < 6) {
            folder = 'night';
            numFon = fonNight <= 20 ? localStorage.setItem('fonNight', Number(fonNight) + 1) : localStorage.setItem('fonNight', 1);
        }
        if (dateTime.getHours() > 6) {
            folder = 'morning';
            numFon = fonMorning <= 20 ? localStorage.setItem('fonMorning', Number(fonMorning) + 1) : localStorage.setItem('fonMorning', 1);
        }
        if (dateTime.getHours() > 12) {
            folder = 'day';
            fonDay <= 20 ? localStorage.setItem('fonDay', Number(fonDay) + 1) : localStorage.setItem('fonDay', 1);
            numFon = localStorage.getItem('fonDay');
            console.log(url('assets/images/${folder}/${fonDay.toString().padStart(2,0)}.jpg'));
            console.log(numFon);
        }
        if (dateTime.getHours() > 18) {
            folder = 'evening';
            fonEvening <= 20 ? localStorage.setItem('fonEvening', Number(fonEvening) + 1) : localStorage.setItem('fonEvening', 1);
            numFon = localStorage.getItem('fonEvening');
        }
        console.log(url('assets/images/${folder}/${numFon.toString().padStart(2,0)}.jpg'));
        document.body.style.backgroundImage = url('assets/images/${folder}/${numFon.toString().padStart(2,0)}.jpg');
        setTimeout(1000);
    }
    else if(standingBg <= 0) {
        console.log('old')
        if (dateTime.getHours() >= 0 && dateTime.getHours() < 6) {
            folder = 'night';
            numFon = fonNight;
        }
        if (dateTime.getHours() > 6) {
            folder = 'morning';
            numFon = fonMorning;
        }
        if (dateTime.getHours() > 12) {
            folder = 'day';
            numFon = fonDay;
        }
        if (dateTime.getHours() > 18) {
            folder = 'evening';
            numFon = fonEvening;
        }
        document.body.style.backgroundImage = `url('assets/images/${folder}/${numFon.toString().padStart(2,0)}.jpg')`;
    }
    else if (standingBg > 0) {
        if (dateTime.getHours() >= 0 && dateTime.getHours() < 6) {
            folder = 'night';
            numFon = fonNight;
        }
        if (dateTime.getHours() > 6) {
            folder = 'morning';
            numFon = fonMorning;
        }
        if (dateTime.getHours() > 12) {
            folder = 'day';
            numFon = fonDay;
        }
        if (dateTime.getHours() > 18) {
            folder = 'evening';
            numFon = fonEvening;
        }
        document.body.style.backgroundImage = `url('assets/images/${folder}/${standingBg.toString().padStart(2,0)}.jpg')`;
        setTimeout(1000);
    }
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
}


const getRandomInt = () => Math.floor(Math.random() * (20 - 1)) + 1;

start();
welcome();
time();
/////////////////////////////////////////////// start change bgBodi
function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');

  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}
function getImage() {
    const dateTime = new Date();
    let folder = '';
    if (dateTime.getHours() >= 0 && dateTime.getHours() < 6)  folder = 'night';
    if (dateTime.getHours() > 6) folder = 'morning';
    if (dateTime.getHours() > 12) folder = 'day';
    if (dateTime.getHours() > 18) folder = 'evening';
    standingBg = localStorage.getItem('standingBg');
    standingBg < 20 ? localStorage.setItem('standingBg', Number(standingBg) + 1) : localStorage.setItem('standingBg', 1);
    numFon = localStorage.getItem('standingBg');
    const imageSrc = `assets/images/${folder}/${addZero(numFon)}.jpg`;
    console.log(imageSrc);
    viewBgImage(imageSrc);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
}
const btnAuto = () => {
    localStorage.setItem('standingBg', 0);
    localStorage.setItem('fonNight', 1);
    localStorage.setItem('fonMorning', 1);
    localStorage.setItem('fonDay', 1);
    localStorage.setItem('fonEvening', 1);
    backgroundImg('new');
}
const btn = document.querySelector('.backgroundСhange');
const btnRes = document.querySelector('.backgroundAuto');
btn.addEventListener('click', getImage);
btnRes.addEventListener('click', btnAuto);
/////////////////////////////////////////////// end change bgBodi
/////////////////////////////////////////////// start Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;    const res = await fetch(url);
    const data = await res.json();
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
console.log(getWeather());
function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }

  document.addEventListener('DOMContentLoaded', getWeather);
  city.addEventListener('keypress', setCity);
/////////////////////////////////////////////// end Weather
/////////////////////////////////////////////// start Quote
// async function getQuote() {
//     const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
//     const res = await fetch(url, {
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest'
//         }
//       });
//     const data = await res.json();
//     console.log(data.quoteText);
// }
// console.log(getQuote());



// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
// const btn = document.querySelector('.btn');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked
async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();

  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

/////////////////////////////////////////////// start Quote

