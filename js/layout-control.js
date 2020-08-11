const LOCAL_STORAGE_TODO_SEL = "todo_selected";
const LOCAL_STORAGE_CALENDAR_SEL = "calendar_selected";

init();

function init() {
    const calendarDiv = document.querySelector(".calendar");
    const toDoListDiv = document.querySelector(".todo");
    const calendarBtn = document.querySelector(".calendar-icon");
    const toDoListBtn = document.querySelector(".todo-icon");

    calendarBtn.addEventListener("click", () => {
        calendarBtn.classList.toggle("selected");
        //toDoListBtn.classList.remove("selected");
        saveStatus(calendarBtn, toDoListBtn);

        drawLayout(calendarBtn, toDoListBtn, calendarDiv, toDoListDiv);
    });
    toDoListBtn.addEventListener("click", () => {
        toDoListBtn.classList.toggle("selected");
        //calendarBtn.classList.remove("selected");
        saveStatus(calendarBtn, toDoListBtn);

        drawLayout(calendarBtn, toDoListBtn, calendarDiv, toDoListDiv);
    });

    loadStatus(calendarBtn, toDoListBtn);
    drawLayout(calendarBtn, toDoListBtn, calendarDiv, toDoListDiv);
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

function drawLayout(cBtn, tBtn, cDiv, tDiv) {
    cBtn.classList.contains("selected")
        ? cDiv.classList.remove("hidden")
        : cDiv.classList.add("hidden");
    tBtn.classList.contains("selected")
        ? tDiv.classList.remove("hidden")
        : tDiv.classList.add("hidden");
}
