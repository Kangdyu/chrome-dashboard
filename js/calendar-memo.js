const LOCAL_STORAGE_CAL_MEMO = "calendar_memo";

let calendarMemo = {
    memo: new Map(),
    docElements: {},
    dayOfTheWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ],
    getMemoDays() {
        return Array.from(this.memo.keys()).map((day) =>
            parseToCalendarDate(day)
        );
    },
    setDate(date) {
        const dow = new Date(date.year, date.month - 1, date.day).getDay();
        this.docElements.date.innerText = `${pad2(date.month)}. ${pad2(
            date.day
        )}, ${this.dayOfTheWeek[dow]}`;
    },
    clearInput() {
        this.docElements.input.value = "";
    },
    getInput() {
        return this.docElements.input.value;
    },
    clearMemoDiv() {
        const items = document.querySelectorAll(".memo-item");
        for (let item of items) {
            item.remove();
        }
    },
    updateLocalStorage() {
        localStorage.setItem(
            LOCAL_STORAGE_CAL_MEMO,
            JSON.stringify(Object.fromEntries(this.memo.entries()))
        );
    },
    saveMemo(date, id, text) {
        let memoList = this.memo.get(date.toString()) || [];
        memoList.push({ id, text });
        this.memo.set(date.toString(), memoList);
        this.updateLocalStorage();
        this.createMemo(id, text);

        if (calendar.doesCalendarInclude(date)) {
            calendar.drawMarker(date, "white");
        }
    },
    loadMemoAll() {
        const memoJSON = localStorage.getItem(LOCAL_STORAGE_CAL_MEMO);
        if (!memoJSON) return;

        const memoObj = JSON.parse(memoJSON);
        this.memo = new Map(Object.entries(memoObj));

        calendar.drawMemoMarkers(this.getMemoDays());
    },
    loadMemo(date) {
        const memos = this.memo.get(date.toString());
        if (!memos) return;
        for (let memo of memos) {
            this.createMemo(memo.id, memo.text);
        }
    },
    createMemo(id, text) {
        const memoItem = document.createElement("li");
        const memoText = document.createElement("span");
        const deleteIcon = document.createElement("img");

        memoItem.className = "memo-item";
        memoItem.id = id;

        memoText.innerText = `• ${text}`;
        deleteIcon.setAttribute("src", "images/icons/close-outline.svg");

        deleteIcon.addEventListener("click", (event) => {
            this.deleteMemo(event.target.parentNode);
        });

        memoItem.appendChild(memoText);
        memoItem.appendChild(deleteIcon);
        this.docElements.list.appendChild(memoItem);
    },
    deleteMemo(item) {
        let memoList = this.memo.get(calendar.selected.toString());
        const after = memoList.filter((memo) => memo.id != item.id);
        if (after.length !== 0) {
            this.memo.set(calendar.selected.toString(), after);
        } else {
            this.memo.delete(calendar.selected.toString());
        }
        this.updateLocalStorage();
        item.remove();
        this.loadMemoAll();
    },
    setHandlers() {
        this.docElements.inputForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.saveMemo(
                calendar.selected,
                new Date().getTime(),
                this.getInput()
            );
            this.clearInput();
        });
    },
};

function initCalendarMemo() {
    calendarMemo.docElements = {
        container: document.querySelector(".calendar-memo"),
        header: document.querySelector(".memo-header"),
        inputForm: document.querySelector(".memo-header__form"),
        input: document.querySelector(".memo-header__form input"),
        date: document.querySelector(".memo-header__date"),
        list: document.querySelector(".memo-list"),
    };
    calendarMemo.setDate(calendar.today);
    calendarMemo.setHandlers();
    calendarMemo.loadMemoAll();
    calendarMemo.loadMemo(calendar.today);
}

function init() {
    initCalendarMemo();
}

init();
