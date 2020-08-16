function CalendarDate(year, month, day, index) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.index = index;

    this.toString = function () {
        return `${this.year}${pad2(this.month)}${pad2(this.day)}`;
    };
}

let calendar = {
    year: null,
    month: null,
    range: {
        min: null,
        max: null,
    },
    today: new CalendarDate(),
    selected: new CalendarDate(),
    dayIndex: [],
    docElements: {},
    setCalendarRange() {
        this.range.min = new Date(
            this.year,
            this.month - 1,
            -this.dayIndex[0] + 1
        );
        this.range.max = new Date(
            this.year,
            this.month,
            42 - this.dayIndex[this.dayIndex.length - 1] - 1
        );
    },
    doesCalendarInclude(date) {
        const target = new Date(date.year, date.month - 1, date.day);
        return target >= this.range.min && target <= this.range.max;
    },
    setDate(year, month) {
        this.dayIndex = [];
        this.year = year;
        this.month = month;

        // Date 객체는 1월 32일같이 일수가 초과할 경우 월이 넘어간다는 것을
        // 이용하여 해당 월의 일자 및 달력 위치를 구함
        let date = new Date(year, month - 1, 1);
        const startIndex = date.getDay();
        this.dayIndex.push(startIndex);
        for (let i = 2; ; i++) {
            date = new Date(year, month - 1, i);
            if (date.getMonth() !== month - 1) break;
            this.dayIndex.push(startIndex + i - 1);
        }
        this.setCalendarRange();
    },
    updateSelectedIndex() {
        if (!this.doesCalendarInclude(this.selected)) return;

        if (this.month === this.selected.month) {
            this.selected.index = this.dayIndex[this.selected.day - 1];
        } else {
            const targetClass =
                this.month > this.selected.month ? "prev-day" : "next-day";
            this.selected.index = Array.from(
                this.docElements.dayDivs
            ).findIndex(
                (div) =>
                    div.classList.contains(targetClass) &&
                    div.innerText == this.selected.day
            );
        }
        if (this.doesCalendarInclude(this.selected)) {
            this.drawBorder(this.selected, "white");
        }
    },
    clearBorder() {
        this.docElements.dayDivs.forEach((div) => {
            div.style.border = "none";
        });
    },
    clearPaint() {
        this.docElements.dayDivs.forEach((div) => {
            div.style.backgroundColor = "";
        });
    },
    drawBorder(date, color) {
        const dayDivs = this.docElements.dayDivs;
        dayDivs[date.index].style.border = `1px solid ${color}`;
    },
    drawMarker(date, color) {
        const dayDivs = this.docElements.dayDivs;
        const circle = document.createElement("div");
        circle.className = "calendar-marker";
        circle.style.position = "absolute";
        circle.style.top = "5px";
        circle.style.right = "5px";
        circle.style.width = "5px";
        circle.style.height = "5px";
        circle.style.borderRadius = "50%";
        circle.style.backgroundColor = color;
        dayDivs[date.index].appendChild(circle);
    },
    paintDiv(date, color) {
        const dayDivs = this.docElements.dayDivs;
        dayDivs[date.index].style.backgroundColor = `${color}`;
    },
    draw() {
        this.clearBorder();
        this.clearPaint();

        const monthText = this.docElements.monthDiv;
        const dayDivs = this.docElements.dayDivs;

        monthText.innerText = `${this.year}.${pad2(this.month)}`;
        const start = this.dayIndex[0];
        const end = this.dayIndex[this.dayIndex.length - 1] + 1;

        for (let i = 0; i < start; i++) {
            const div = dayDivs[i];
            div.innerText = new Date(
                this.year,
                this.month - 1,
                -(start - i - 1)
            ).getDate();
            div.classList.remove("active-day");
            div.classList.add("prev-day");
        }
        for (let i = 1; i <= this.dayIndex.length; i++) {
            const div = dayDivs[this.dayIndex[i - 1]];
            div.innerText = i;
            div.classList.remove("prev-day");
            div.classList.remove("next-day");
            div.classList.add("active-day");
        }
        for (let i = end; i < 42; i++) {
            const div = dayDivs[i];
            div.innerText = new Date(
                this.year,
                this.month,
                i - end + 1
            ).getDate();
            div.classList.remove("active-day");
            div.classList.add("next-day");
        }

        if (this.doesCalendarInclude(this.today)) {
            this.paintDiv(this.today, "rgba(231, 76, 60, 0.3)");
        }
    },
    adjustDate(date) {
        if (date.month > 12) {
            date.year++;
            date.month = 1;
        } else if (date.month < 1) {
            date.year--;
            date.month = 12;
        }
    },
    prevMonth() {
        this.month--;
        this.adjustDate(this);
        this.setDate(this.year, this.month);
    },
    nextMonth() {
        this.month++;
        this.adjustDate(this);
        this.setDate(this.year, this.month);
    },
    select(dayDiv, date) {
        if (dayDiv) {
            this.selected.year = this.year;
            this.selected.month = this.month;
            this.selected.day = +dayDiv.innerText;
            this.selected.index = Array.from(this.docElements.dayDivs).indexOf(
                dayDiv
            );

            if (dayDiv.classList.contains("prev-day")) {
                this.selected.month--;
                this.adjustDate(this.selected);
            } else if (dayDiv.classList.contains("next-day")) {
                this.selected.month++;
                this.adjustDate(this.selected);
            }
        } else if (date) {
            this.selected.year = date.year;
            this.selected.month = date.month;
            this.selected.day = date.day;
            this.selected.index = this.dayIndex[date.day - 1];
        }

        this.clearBorder();
        this.drawBorder(this.selected, "white");
    },
    setHandlers() {
        this.docElements.prevBtn.addEventListener("click", () => {
            this.prevMonth();
            this.draw();
            this.updateSelectedIndex();
        });
        this.docElements.nextBtn.addEventListener("click", () => {
            this.nextMonth();
            this.draw();
            this.updateSelectedIndex();
        });
        this.docElements.dayDivs.forEach((day) => {
            day.addEventListener("click", (event) => {
                this.select(event.target);
                calendarMemo.setDate(this.selected);
                calendarMemo.clearMemoDiv();
                calendarMemo.loadMemo(this.selected);
            });
        });
    },
};

function initCalendar() {
    const today = new Date();

    calendar.docElements = {
        monthDiv: document.querySelector(".calendar-month__text"),
        dayDivs: document.querySelectorAll(".calendar-day"),
        prevBtn: document.querySelector(".calendar-month__prev"),
        nextBtn: document.querySelector(".calendar-month__next"),
    };
    calendar.setHandlers();
    calendar.today.year = today.getFullYear();
    calendar.today.month = today.getMonth() + 1;
    calendar.today.day = today.getDate();
    calendar.setDate(today.getFullYear(), today.getMonth() + 1);
    calendar.today.index = calendar.dayIndex[calendar.today.day - 1];
    calendar.select(null, calendar.today);
    calendar.draw();
    calendar.drawBorder(calendar.selected, "white");
}

function init() {
    initCalendar();
}

init();
