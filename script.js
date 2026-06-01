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

const seasons = [
    "Spring",
    "Summer",
    "Autumn",
    "Winter"
];

let seasonTimer = 0;
function updateSeason(){

    seasonTimer +=
        0.01 * timeScale;

    if(seasonTimer > 1500){

        seasonTimer = 0;

        let current =
            seasons.indexOf(season);

        season =
            seasons[
                (current + 1)
                %
                seasons.length
            ];

        console.log(
            "Season:",
            season
        );
    }
}



window.addEventListener("load", () => {
  const loading = document.getElementById("loadingScreen");

  setTimeout(() => {
    loading.style.opacity = "0";

    setTimeout(() => {
      loading.style.display = "none";
    }, 800);

  }, 1000);
});