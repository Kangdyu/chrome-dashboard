const menuContainer = document.querySelector(".menu-container");
const calendarDiv = document.querySelector(".calendar");
const toDoListDiv = document.querySelector(".todo-list");
const calendarBtn = document.querySelector(".calendar-icon");
const toDoListBtn = document.querySelector(".todo-icon");

function drawLayout() {
    if (
        !calendarBtn.classList.contains("selected") &&
        !toDoListBtn.classList.contains("selected")
    ) {
        menuContainer.classList.add("hidden");
    } else if (calendarBtn.classList.contains("selected")) {
        menuContainer.classList.remove("hidden");
        calendarDiv.classList.remove("hidden");
        toDoListDiv.classList.add("hidden");
    } else if (toDoListBtn.classList.contains("selected")) {
        menuContainer.classList.remove("hidden");
        toDoListDiv.classList.remove("hidden");
        calendarDiv.classList.add("hidden");
    }
}

function init() {
    calendarBtn.addEventListener("click", () => {
        calendarBtn.classList.toggle("selected");
        toDoListBtn.classList.remove("selected");
        drawLayout();
    });
    toDoListBtn.addEventListener("click", () => {
        toDoListBtn.classList.toggle("selected");
        calendarBtn.classList.remove("selected");
        drawLayout();
    });
}

init();
