const canvas = document.getElementById("garden");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let timeScale = 1;
let worldTime = 0;

function setTimeScale(scale){
    timeScale = scale;
}
const plants = [];
const seeds = [];

const rainParticles = [];
const snowParticles = [];

const fireflies = [];

const fallingSeeds = [];

let mouseX = 0;
let mouseY = 0;

let watering = false;
