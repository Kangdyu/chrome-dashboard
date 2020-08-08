const IMG_COUNT = 5;

function randomNumGenerator(max) {
    return Math.ceil(Math.random() * max);
}

function paintBackground(num) {
    const image = new Image();
    image.src = `images/backgrounds/${num}.jpg`;
    image.classList.add("background-image");
    document.body.appendChild(image);
}

function init() {
    paintBackground(randomNumGenerator(IMG_COUNT));
}

init();
