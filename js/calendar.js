function getDays(year, month) {
    let dayIndex = [];
    let date = new Date(year, month, 1);
    const startIndex = date.getDay();
    dayIndex.push(startIndex);

    for (let i = 2; ; i++) {
        date = new Date(year, month, i);
        if (date.getMonth() !== month) break;
        dayIndex.push(startIndex + i - 1);
    }

    return dayIndex;
}

function printDays(monthDiv, dayDivs, year, month, days) {
    monthDiv.innerText = `${year}.${pad2(month + 1)}`;
    for (let div of dayDivs) {
        div.innerText = "";
    }
    for (let i = 1; i <= days.length; i++) {
        dayDivs[days[i - 1]].innerText = i;
    }
}

function init() {
    const monthDiv = document.querySelector(".calendar-month__text");
    const dayDivs = document.querySelectorAll(".calendar-day");
    const prevMonthBtn = document.querySelector(".calendar-month__prev");
    const nextMonthBtn = document.querySelector(".calendar-month__next");

    const today = new Date();
    let targetYear = today.getFullYear();
    let targetMonth = today.getMonth();

    const days = getDays(targetYear, targetMonth);
    printDays(monthDiv, dayDivs, targetYear, targetMonth, days);

    prevMonthBtn.addEventListener("click", () => {
        targetMonth--;
        if (targetMonth < 0) {
            targetYear--;
            targetMonth = 11;
        }
        const days = getDays(targetYear, targetMonth);
        printDays(monthDiv, dayDivs, targetYear, targetMonth, days);
    });
    nextMonthBtn.addEventListener("click", () => {
        targetMonth++;
        if (targetMonth > 11) {
            targetYear++;
            targetMonth = 0;
        }
        const days = getDays(targetYear, targetMonth);
        printDays(monthDiv, dayDivs, targetYear, targetMonth, days);
    });
}

init();
