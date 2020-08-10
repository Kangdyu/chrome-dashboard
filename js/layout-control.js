const LOCAL_STORAGE_TODO_SEL = "todo_selected";
const LOCAL_STORAGE_CALENDAR_SEL = "calendar_selected";

init();

function init() {
    const menuContainer = document.querySelector("nav");
    const calendarDiv = document.querySelector(".calendar");
    const toDoListDiv = document.querySelector(".todo");
    const calendarBtn = document.querySelector(".calendar-icon");
    const toDoListBtn = document.querySelector(".todo-icon");

    calendarBtn.addEventListener("click", () => {
        calendarBtn.classList.toggle("selected");
        toDoListBtn.classList.remove("selected");
        saveStatus(calendarBtn, toDoListBtn);

        drawLayout(
            menuContainer,
            calendarBtn,
            toDoListBtn,
            calendarDiv,
            toDoListDiv
        );
    });
    toDoListBtn.addEventListener("click", () => {
        toDoListBtn.classList.toggle("selected");
        calendarBtn.classList.remove("selected");
        saveStatus(calendarBtn, toDoListBtn);

        drawLayout(
            menuContainer,
            calendarBtn,
            toDoListBtn,
            calendarDiv,
            toDoListDiv
        );
    });

    loadStatus(calendarBtn, toDoListBtn);
    drawLayout(
        menuContainer,
        calendarBtn,
        toDoListBtn,
        calendarDiv,
        toDoListDiv
    );
}

function saveStatus(cBtn, tBtn) {
    localStorage.setItem(
        LOCAL_STORAGE_CALENDAR_SEL,
        cBtn.classList.contains("selected")
    );
    localStorage.setItem(
        LOCAL_STORAGE_TODO_SEL,
        tBtn.classList.contains("selected")
    );
}

function loadStatus(cBtn, tBtn) {
    const isCalendarSel = localStorage.getItem(LOCAL_STORAGE_CALENDAR_SEL);
    const isTodoSel = localStorage.getItem(LOCAL_STORAGE_TODO_SEL);

    if (isCalendarSel === "true") cBtn.classList.add("selected");
    if (isTodoSel === "true") tBtn.classList.add("selected");
}

function drawLayout(mCon, cBtn, tBtn, cDiv, tDiv) {
    if (
        !cBtn.classList.contains("selected") &&
        !tBtn.classList.contains("selected")
    ) {
        mCon.classList.add("hidden");
    } else if (cBtn.classList.contains("selected")) {
        mCon.classList.remove("hidden");
        cDiv.classList.remove("hidden");
        tDiv.classList.add("hidden");
    } else if (tBtn.classList.contains("selected")) {
        mCon.classList.remove("hidden");
        tDiv.classList.remove("hidden");
        cDiv.classList.add("hidden");
    }
}
