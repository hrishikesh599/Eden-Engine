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
let weather = "Clear";

let weatherTimer = 0;
function updateWeather(){

    weatherTimer +=
        0.01 * timeScale;

    if(weatherTimer > 400){

        weatherTimer = 0;

        const roll =
            Math.random();

        if(roll < 0.25)
            weather = "Clear";

        else if(roll < 0.5)
            weather = "Rain";

        else if(roll < 0.75)
            weather = "Storm";

        else
            weather = "Snow";

        console.log(
            "Weather:",
            weather
        );
    }
}
function getSeasonSky(){

    switch(season){

        case "Spring":
            return [
                "#6db8ff",
                "#bfe7ff"
            ];

        case "Summer":
            return [
                "#3f9dff",
                "#dff6ff"
            ];

        case "Autumn":
            return [
                "#ff9455",
                "#ffd9a8"
            ];

        case "Winter":
            return [
                "#6d88b8",
                "#e6eefc"
            ];
    }

    return [
        "#6db8ff",
        "#bfe7ff"
    ];
}
function drawBackground(){

    const cycle =
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

    // Night overlay

    ctx.fillStyle =
        `rgba(
            0,
            0,
            30,
            ${1-cycle}
        )`;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Stars

    if(cycle < 0.4){

        ctx.fillStyle =
            `rgba(
                255,
                255,
                255,
                ${(0.4-cycle)*2}
            )`;

        for(
            let i=0;
            i<150;
            i++
        ){

            const x =
                (i*73) %
                canvas.width;

            const y =
                (i*97) %
                (canvas.height*0.7);

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                1,
                0,
                Math.PI*2
            );

            ctx.fill();
        }
    }

    // Ground

    ctx.fillStyle =
        "#1f4f1f";

    ctx.fillRect(
        0,
        canvas.height-80,
        canvas.width,
        80
    );
}
function drawSunMoon(){

    const centerX =
        canvas.width/2;

    const centerY =
        canvas.height*5.15;

    const radiusX =
        canvas.width*0.45;

    const radiusY =
        canvas.height*1.05;

    const sunX =
        centerX +
        Math.cos(
            worldTime-Math.PI
        )*radiusX;

    const sunY =
    centerY +
    Math.sin(worldTime-Math.PI) * radiusY;

    const moonX =
        centerX +
        Math.cos(
            worldTime
        )*radiusX;

    const moonY =
    centerY +
    Math.sin(worldTime) * radiusY;

    // Sun

    ctx.beginPath();

    ctx.arc(
        sunX,
        sunY,
        40,
        0,
        Math.PI*2
    );

    ctx.fillStyle =
        "#FFD966";

    ctx.shadowBlur = 60;
    ctx.shadowColor = "#FFD966";

    ctx.fill();

    // Moon

    ctx.beginPath();

    ctx.arc(
        moonX,
        moonY,
        28,
        0,
        Math.PI*2
    );

    ctx.fillStyle =
        "#E8F0FF";

    ctx.shadowBlur = 30;
    ctx.shadowColor =
        "#E8F0FF";

    ctx.fill();

    ctx.shadowBlur = 0;
}
function animate(){

    requestAnimationFrame(
        animate
    );

    worldTime +=
        0.001 *
        timeScale;

    updateSeason();

    updateWeather();

    drawBackground();
    drawSunMoon();
}

animate();
window.addEventListener("load", () => {
  const loading = document.getElementById("loadingScreen");

  setTimeout(() => {
    loading.style.opacity = "0";

    setTimeout(() => {
      loading.style.display = "none";
    }, 800);

  }, 1000);
});
