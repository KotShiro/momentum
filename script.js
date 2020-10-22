const weekList = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday'};
const monthList = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'};
const fonList = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20'];

welcomeLine = document.querySelector('header > div > h4');

let fonNight = localStorage.getItem('fonNight') ? localStorage.getItem('fonNight') : localStorage.setItem('fonNight', 1);
let fonMorning = localStorage.getItem('fonMorning') ? localStorage.getItem('fonMorning') : localStorage.setItem('fonMorning', 1);
let fonDay = localStorage.getItem('fonDay') ? localStorage.getItem('fonDay') : localStorage.setItem('fonDay', 1);
let fonEvening = localStorage.getItem('fonEvening') ? localStorage.getItem('fonEvening') : localStorage.setItem('fonEvening', 1);
let numThisFone = localStorage.getItem('numThisFone') ? localStorage.getItem('numThisFone') : localStorage.setItem('numThisFone', 1);
let standingBg = localStorage.getItem('standingBg') ? localStorage.getItem('standingBg') : localStorage.setItem('standingBg', 1);

let nameInput = '';
let masFone = [fonNight, fonMorning, fonDay, fonEvening];

console.log(localStorage);

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
            console.log(`url('/assets/images/${folder}/${fonDay.toString().padStart(2,0)}.jpg')`);
            console.log(numFon);
        }
        if (dateTime.getHours() > 18) {
            folder = 'evening';
            fonEvening <= 20 ? localStorage.setItem('fonEvening', Number(fonEvening) + 1) : localStorage.setItem('fonEvening', 1);
            numFon = localStorage.getItem('fonEvening');
        }
        console.log(`url('/assets/images/${folder}/${numFon.toString().padStart(2,0)}.jpg')`);
        //setTimeout(1000);
        document.body.style.backgroundImage = `url('/assets/images/${folder}/${numFon.toString().padStart(2,0)}.jpg')`;
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
        document.body.style.backgroundImage = `url('/assets/images/${folder}/${numFon.toString().padStart(2,0)}.jpg')`;
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
        document.body.style.backgroundImage = `url('/assets/images/${folder}/${standingBg.toString().padStart(2,0)}.jpg')`;
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


// backgroundImg();


const base = '/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

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
    const index = i % images.length;
    const dateTime = new Date();
    let folder = '';
    if (dateTime.getHours() >= 0 && dateTime.getHours() < 6)  folder = 'night';
    if (dateTime.getHours() > 6) folder = 'morning';
    if (dateTime.getHours() > 12) folder = 'day';
    if (dateTime.getHours() > 18) folder = 'evening';

  const imageSrc = base + folder + '/' + images[index];
  viewBgImage(imageSrc);
  localStorage.setItem('standingBg', index + 1);
  console.log(imageSrc, images.length+1, i % images.length+1, localStorage.getItem('standingBg'));

  i++;
  backgroundImg();
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
}
const btnAuto = () => {
    localStorage.setItem('standingBg', 0);
    backgroundImg('new');
}
const btn = document.querySelector('.backgroundСhange');
const btnRes = document.querySelector('.backgroundAuto');
btn.addEventListener('click', getImage);
btnRes.addEventListener('click', btnAuto);