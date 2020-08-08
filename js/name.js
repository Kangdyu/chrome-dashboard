const nameForm = document.querySelector(".js-form");
const nameInput = nameForm.querySelector("input");
const greetingDiv = document.querySelector(".js-greeting");
const greetingText = greetingDiv.querySelector("span");

const LOCAL_STORAGE_NAME = "name";

function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem(LOCAL_STORAGE_NAME, nameInput.value);
    greeting(nameInput.value);
}

function handleFocusOut() {
    nameForm.classList.add("hidden");
    greetingDiv.classList.remove("hidden");
    nameInput.value = "";
}

function changeName() {
    greetingDiv.classList.add("hidden");
    nameForm.classList.remove("hidden");
    nameInput.focus();
    nameInput.addEventListener("blur", handleFocusOut);
    nameForm.addEventListener("submit", handleSubmit);
}

function greeting(name) {
    nameForm.classList.add("hidden");
    greetingDiv.classList.remove("hidden");
    greetingText.innerText = `Hello, ${name}!`;
    greetingDiv.addEventListener("click", changeName);
}

function loadName() {
    const name = localStorage.getItem("name");

    if (name === null) {
        nameForm.addEventListener("submit", handleSubmit);
    } else {
        greeting(name);
    }
}

function init() {
    loadName();
}

init();
