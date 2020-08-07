const nameForm = document.querySelector(".js-form");
const nameInput = nameForm.querySelector("input");
const greetingText = document.querySelector(".js-greeting");

const LOCAL_STORAGE_NAME = "name";

function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem(LOCAL_STORAGE_NAME, nameInput.value);
    greeting(nameInput.value);
}

function greeting(name) {
    nameForm.classList.add("hidden");
    greetingText.classList.remove("hidden");
    greetingText.innerText = `Hello, ${name}!`;
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
