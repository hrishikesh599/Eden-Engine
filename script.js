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
let season = "Spring";
let weather = "Clear";

let seasonTimer = 0;
let weatherTimer = 0;

const seasons = [
    "Spring",
    "Summer",
    "Autumn",
    "Winter"
];
function updateSeason(){

    seasonTimer += 0.01 * timeScale;

    if(seasonTimer > 1500){

        seasonTimer = 0;

        const current =
            seasons.indexOf(season);

        season =
            seasons[
                (current + 1) %
                seasons.length
            ];

        document.getElementById(
            "seasonText"
        ).textContent =
            "Season: " + season;
    }
}
function updateWeather(){

    weatherTimer += 0.01 * timeScale;

    if(weatherTimer > 400){

        weatherTimer = 0;

        const roll = Math.random();

        if(roll < 0.25)
            weather = "Clear";

        else if(roll < 0.5)
            weather = "Rain";

        else if(roll < 0.75)
            weather = "Storm";

        else
            weather = "Snow";
    }
}
function getSeasonSky(){

    switch(season){

        case "Spring":
            return ["#6db8ff","#bfe7ff"];

        case "Summer":
            return ["#3f9dff","#dff6ff"];

        case "Autumn":
            return ["#ff9455","#ffd9a8"];

        case "Winter":
            return ["#6d88b8","#e6eefc"];
    }

    return ["#6db8ff","#bfe7ff"];
}
function drawBackground(){

    const day =
        (Math.sin(worldTime)+1)/2;

    const colors =
        getSeasonSky();

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            canvas.height
        );

    gradient.addColorStop(
        0,
        colors[0]
    );

    gradient.addColorStop(
        1,
        colors[1]
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
        "#1f4f1f";

    ctx.fillRect(
        0,
        canvas.height - 80,
        canvas.width,
        80
    );
}
function animate(){

    requestAnimationFrame(
        animate
    );

    worldTime +=
        0.001 * timeScale;

    updateSeason();
    updateWeather();

    drawBackground();
}

animate();
console.log("working")
