const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoPending = document.querySelector(".todo-pending__list");
const todoFinished = document.querySelector(".todo-finished__list");

const LOCAL_STORAGE_PENDING = "pending";
const LOCAL_STORAGE_FINISHED = "finished";

let pendingArr = [];
let finishedArr = [];

init();

function init() {
    todoForm.addEventListener("submit", handleInput);
    loadLists();
}

/* ====================== handlers ====================== */
function handleInput(event) {
    event.preventDefault();
    if (todoInput.value.trim() === "") {
        return;
    }
    addToLocalStorage("pending", pendingArr, todoInput.value);
    todoInput.value = "";
}

function handleDelete(event) {
    const li = event.target.parentNode.parentNode;

    if (li.parentNode.classList.contains("todo-pending__list")) {
        removeFromLocalStorage("pending", pendingArr, li);
    } else if (li.parentNode.classList.contains("todo-finished__list")) {
        removeFromLocalStorage("finished", finishedArr, li);
    }
}

function handleStatus(event) {
    const li = event.target.parentNode.parentNode;

    if (li.parentNode.classList.contains("todo-pending__list")) {
        addToLocalStorage(
            "finished",
            finishedArr,
            li.querySelector("span[class='todo-text']").innerText
        );
        removeFromLocalStorage("pending", pendingArr, li);
    } else if (li.parentNode.classList.contains("todo-finished__list")) {
        addToLocalStorage(
            "pending",
            pendingArr,
            li.querySelector("span[class='todo-text']").innerText
        );
        removeFromLocalStorage("finished", finishedArr, li);
    }
}

/* =============== local storage functions =============== */
function addToLocalStorage(status, arr, text) {
    const time = new Date();
    const newTodo = { id: time.getTime(), text };
    arr.push(newTodo);

    if (status === "pending") {
        printList("pending", newTodo);
    } else if (status === "finished") {
        printList("finished", newTodo);
    }
    updateLocalStorage(status);
}

function removeFromLocalStorage(status, arr, li) {
    const target = arr.findIndex((item) => item.id == li.id);
    arr.splice(target, 1);
    li.parentNode.removeChild(li);
    updateLocalStorage(status);
}

function updateLocalStorage(status) {
    if (status === "pending") {
        localStorage.setItem(LOCAL_STORAGE_PENDING, JSON.stringify(pendingArr));
    } else if (status === "finished") {
        localStorage.setItem(
            LOCAL_STORAGE_FINISHED,
            JSON.stringify(finishedArr)
        );
    }
}

/* ============== todo list manage functions ============== */
function loadLists() {
    const pendingData = localStorage.getItem(LOCAL_STORAGE_PENDING);
    const finishedData = localStorage.getItem(LOCAL_STORAGE_FINISHED);

    if (pendingData !== null) {
        const pendingJson = JSON.parse(pendingData);
        pendingJson.forEach((list) => {
            pendingArr.push(list);
            printList("pending", list);
        });
    }
    if (finishedData !== null) {
        const finishedJson = JSON.parse(finishedData);
        finishedJson.forEach((list) => {
            finishedArr.push(list);
            printList("finished", list);
        });
    }
}

function printList(status, list) {
    const todo = document.createElement("li");
    const todoText = document.createElement("span");
    const todoBtns = document.createElement("span");
    const deleteBtn = document.createElement("img");
    const statusBtn = document.createElement("img");

    todo.id = list.id;
    todoText.innerText = list.text;

    todoText.classList.add("todo-text");
    todoBtns.classList.add("todo-button");
    deleteBtn.classList.add("todo-button__delete");
    statusBtn.classList.add("todo-button__status");

    deleteBtn.setAttribute("src", "images/icons/close-outline.svg");

    deleteBtn.addEventListener("click", handleDelete);
    statusBtn.addEventListener("click", handleStatus);

    todoBtns.appendChild(statusBtn);
    todoBtns.appendChild(deleteBtn);
    todo.appendChild(todoText);
    todo.appendChild(todoBtns);

    if (status === "pending") {
        statusBtn.setAttribute("src", "images/icons/checkmark-outline.svg");
        todoPending.appendChild(todo);
    } else if (status === "finished") {
        statusBtn.setAttribute("src", "images/icons/refresh-outline.svg");
        todoFinished.appendChild(todo);
    }
}
