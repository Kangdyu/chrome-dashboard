const LOCAL_STORAGE_MENU_SEL = "menu_selected";

init();

function init() {
    const calendarDiv = document.querySelector(".calendar");
    const toDoListDiv = document.querySelector(".todo");
    const calendarBtn = document.querySelector(".calendar-icon");
    const toDoListBtn = document.querySelector(".todo-icon");

    calendarBtn.addEventListener("click", () => {
        calendarBtn.classList.toggle("activated");
        saveStatus(calendarBtn, toDoListBtn);

        drawLayout(calendarBtn, toDoListBtn, calendarDiv, toDoListDiv);
    });
    toDoListBtn.addEventListener("click", () => {
        toDoListBtn.classList.toggle("activated");
        saveStatus(calendarBtn, toDoListBtn);

        drawLayout(calendarBtn, toDoListBtn, calendarDiv, toDoListDiv);
    });

    loadStatus(calendarBtn, toDoListBtn);
    drawLayout(calendarBtn, toDoListBtn, calendarDiv, toDoListDiv);
}

function saveStatus(cBtn, tBtn) {
    const status = {
        calendar: cBtn.classList.contains("activated"),
        todo: tBtn.classList.contains("activated"),
    };
    localStorage.setItem(LOCAL_STORAGE_MENU_SEL, JSON.stringify(status));
}

function loadStatus(cBtn, tBtn) {
    const statusJSON = localStorage.getItem(LOCAL_STORAGE_MENU_SEL);
    if (!statusJSON) return;
    const status = JSON.parse(statusJSON);

    if (status.calendar) cBtn.classList.add("activated");
    if (status.todo) tBtn.classList.add("activated");
}

function drawLayout(cBtn, tBtn, cDiv, tDiv) {
    cBtn.classList.contains("activated")
        ? cDiv.classList.add("open")
        : cDiv.classList.remove("open");
    tBtn.classList.contains("activated")
        ? tDiv.classList.add("open")
        : tDiv.classList.remove("open");
}
