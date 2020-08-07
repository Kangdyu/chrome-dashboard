const dateText = document.querySelector(".js-date");
const clockText = document.querySelector(".js-clock");

const DAY_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad2(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

function getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const dayOfWeek = currentDate.getDay();

    dateText.innerText = `
        ${year}. ${pad2(month)}. ${pad2(day)} (${DAY_OF_WEEK[dayOfWeek]})
    `;

    getTime();
}

function getTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    clockText.innerText = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

function init() {
    getDate();
    setInterval(getTime, 1000);
}

init();
