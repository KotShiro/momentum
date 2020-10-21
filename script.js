const weekList = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday'};
const monthList = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'};
const fonList = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20'];

welcomeLine = document.querySelector('header > div > h4');

let fonNight = localStorage.getItem('fonNight') ? localStorage.getItem('fonNight') : localStorage.setItem('fonNight', 1);
let fonMorning = localStorage.getItem('fonMorning') ? localStorage.getItem('fonMorning') : localStorage.setItem('fonMorning', 1);
let fonDay = localStorage.getItem('fonDay') ? localStorage.getItem('fonDay') : localStorage.setItem('fonDay', 1);
let fonEvening = localStorage.getItem('fonEvening') ? localStorage.getItem('fonEvening') : localStorage.setItem('fonEvening', 1);
let nameInput = '';
let masFone = [fonNight, fonMorning, fonDay, fonEvening];

console.log(localStorage);

const time = () => {
    let dateTime = new Date();
    document.getElementById("time").innerHTML = `${addZero(dateTime.getHours())} : ${addZero(dateTime.getMinutes())} : ${addZero(dateTime.getSeconds())}`;
    document.getElementById("date").innerHTML = `${weekList[dateTime.getDay()]} ${dateTime.getDate()} ${monthList[Number(dateTime.getMonth() + 1)]}`;
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

const backgroundImg = () => {
    const dateTime = new Date();
    let folder = ''; let numFon = 1;
        if ((dateTime.getHours() >= 0 && dateTime.getHours() < 6) || dateTime.getHours() === 24) {
            folder = 'night';
            numFon = masFone[0];
        }
        else {
            if (dateTime.getHours() > 6) {
                folder = 'morning';
                numFon = masFone[1];
            }
            if (dateTime.getHours() > 12) {
                folder = 'day';
                numFon = masFone[2];
            }
            if (dateTime.getHours() > 18) {
                folder = 'evening';
                numFon = masFone[3];
            }
        }

    document.body.style.backgroundImage = `url('/assets/images/${folder}/${getRandomInt().toString().padStart(2,0)}.jpg')`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    
    setTimeout(backgroundImg, 3600000);
}

const getRandomInt = () => Math.floor(Math.random() * (20 - 1)) + 1;

// background-repeat: no-repeat;
// background-size: cover;

start();
welcome();
time();
backgroundImg();