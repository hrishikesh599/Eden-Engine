// ======================================
// EDEN ENGINE V2
// PART 1
// CORE WORLD ENGINE
// ======================================

// ----------------------
// CANVAS SETUP
// ----------------------

const canvas = document.getElementById("garden");
const ctx = canvas.getContext("2d");

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

// ----------------------
// GLOBAL STATE
// ----------------------

let worldTime = 0;

let timeScale = 1;

let fps = 0;

let frameCount = 0;

let fpsTimer = 0;

let mouseX = 0;
let mouseY = 0;

let cameraX = 0;
let cameraY = 0;

let zoom = 1;

// ----------------------
// WORLD ARRAYS
// ----------------------

const seeds = [];
const plants = [];

const rainParticles = [];
const snowParticles = [];

const fireflies = [];

const fallingLeaves = [];

// ----------------------
// SEASONS
// ----------------------

const seasons = [
    "Spring",
    "Summer",
    "Autumn",
    "Winter"
];

let currentSeason = 0;

let seasonTimer = 0;

// 1 season ≈ 2.5 minutes
const SEASON_LENGTH = 1500;

// ----------------------
// WEATHER
// ----------------------

const weatherTypes = [
    "Clear",
    "Rain",
    "Storm",
    "Snow"
];

let currentWeather = "Clear";

let weatherTimer = 0;

const WEATHER_CHANGE_TIME = 500;

// ----------------------
// TIME CONTROL
// ----------------------

function setTimeScale(value){

    timeScale = value;
}

// make buttons work

window.setTimeScale = setTimeScale;

// ----------------------
// MOUSE TRACKING
// ----------------------

window.addEventListener(
    "mousemove",
    e => {

        mouseX = e.clientX;
        mouseY = e.clientY;
    }
);

// ----------------------
// SEASON UPDATE
// ----------------------

function updateSeason(){

    seasonTimer += 1 * timeScale;

    if(
        seasonTimer >
        SEASON_LENGTH
    ){

        seasonTimer = 0;

        currentSeason++;

        if(
            currentSeason >=
            seasons.length
        ){

            currentSeason = 0;
        }
    }
}

// ----------------------
// WEATHER UPDATE
// ----------------------

function updateWeather(){

    weatherTimer +=
        1 * timeScale;

    if(
        weatherTimer >
        WEATHER_CHANGE_TIME
    ){

        weatherTimer = 0;

        const roll =
            Math.random();

        if(roll < 0.40){

            currentWeather =
                "Clear";
        }

        else if(
            roll < 0.65
        ){

            currentWeather =
                "Rain";
        }

        else if(
            roll < 0.85
        ){

            currentWeather =
                "Storm";
        }

        else{

            currentWeather =
                "Snow";
        }
    }
}

// ----------------------
// SEASON COLORS
// ----------------------

function getSeasonColors(){

    const season =
        seasons[
            currentSeason
        ];

    switch(season){

        case "Spring":

            return {
                top:
                "#78c7ff",

                bottom:
                "#dff4ff"
            };

        case "Summer":

            return {
                top:
                "#3fa9ff",

                bottom:
                "#eefbff"
            };

        case "Autumn":

            return {
                top:
                "#ff9a55",

                bottom:
                "#ffe0b8"
            };

        case "Winter":

            return {
                top:
                "#6f89c2",

                bottom:
                "#edf5ff"
            };
    }
}

// ----------------------
// DAY/NIGHT BRIGHTNESS
// ----------------------

function getDaylight(){

    return (
        Math.sin(
            worldTime
        ) + 1
    ) / 2;
}

// ----------------------
// SKY
// ----------------------

function drawSky(){

    const colors =
        getSeasonColors();

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            canvas.height
        );

    gradient.addColorStop(
        0,
        colors.top
    );

    gradient.addColorStop(
        1,
        colors.bottom
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

// ----------------------
// NIGHT OVERLAY
// ----------------------

function drawNightOverlay(){

    const daylight =
        getDaylight();

    const darkness =
        1 - daylight;

    ctx.fillStyle =
        `rgba(
            0,
            0,
            35,
            ${darkness * 0.75}
        )`;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

// ----------------------
// STARS
// ----------------------

function drawStars(){

    const daylight =
        getDaylight();

    if(daylight > 0.4)
        return;

    const alpha =
        (0.4 - daylight)
        * 2;

    ctx.fillStyle =
        `rgba(
            255,
            255,
            255,
            ${alpha}
        )`;

    for(
        let i = 0;
        i < 180;
        i++
    ){

        const x =
            (i * 97)
            % canvas.width;

        const y =
            (i * 173)
            %
            (
                canvas.height
                * 0.75
            );

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            1.3,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

// ----------------------
// SUN + MOON
// ----------------------

function drawSunMoon(){

    const centerX =
        canvas.width / 2;

    const centerY =
        canvas.height * 1.15;

    const radiusX =
        canvas.width * 0.45;

    const radiusY =
        canvas.height * 0.65;

    const sunX =
        centerX +
        Math.cos(
            worldTime - Math.PI
        ) * radiusX;

    const sunY =
        centerY +
        Math.sin(
            worldTime - Math.PI
        ) * radiusY;

    const moonX =
        centerX +
        Math.cos(
            worldTime
        ) * radiusX;

    const moonY =
        centerY +
        Math.sin(
            worldTime
        ) * radiusY;

    // SUN

    ctx.beginPath();

    ctx.arc(
        sunX,
        sunY,
        42,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#ffd75c";

    ctx.shadowBlur = 80;
    ctx.shadowColor =
        "#ffd75c";

    ctx.fill();

    // MOON

    ctx.beginPath();

    ctx.arc(
        moonX,
        moonY,
        30,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#eaf2ff";

    ctx.shadowBlur = 40;
    ctx.shadowColor =
        "#eaf2ff";

    ctx.fill();

    ctx.shadowBlur = 0;
}

// ----------------------
// GROUND
// ----------------------

function drawGround(){

    const season =
        seasons[
            currentSeason
        ];

    let color =
        "#1d5f25";

    if(
        season === "Summer"
    ){

        color =
        "#2b742f";
    }

    if(
        season === "Autumn"
    ){

        color =
        "#56732a";
    }

    if(
        season === "Winter"
    ){

        color =
        "#dbe8ef";
    }

    ctx.fillStyle =
        color;

    ctx.fillRect(
        0,
        canvas.height - 90,
        canvas.width,
        90
    );
}

// ----------------------
// HUD
// ----------------------

function updateHUD(){

    const seasonEl =
        document.getElementById(
            "seasonDisplay"
        );

    const weatherEl =
        document.getElementById(
            "weatherDisplay"
        );

    const timeEl =
        document.getElementById(
            "timeDisplay"
        );

    const fpsEl =
        document.getElementById(
            "fpsCounter"
        );

    if(seasonEl)
        seasonEl.textContent =
        `Season: ${
            seasons[
                currentSeason
            ]
        }`;

    if(weatherEl)
        weatherEl.textContent =
        `Weather: ${
            currentWeather
        }`;

    if(timeEl)
        timeEl.textContent =
        `Day ${
            Math.floor(
                worldTime * 2
            )
        }`;

    if(fpsEl)
        fpsEl.textContent =
        `FPS: ${fps}`;
}

// ----------------------
// FPS
// ----------------------

function updateFPS(){

    frameCount++;

    fpsTimer++;

    if(fpsTimer >= 60){

        fps = frameCount;

        frameCount = 0;

        fpsTimer = 0;
    }
}

// ----------------------
// LOADING SCREEN
// ----------------------

window.addEventListener(
    "load",
    () => {

        const loading =
            document.getElementById(
                "loadingScreen"
            );

        if(!loading)
            return;

        setTimeout(() => {

            loading.style.opacity =
                "0";

            setTimeout(() => {

                loading.style.display =
                    "none";

            },800);

        },1000);
    }
);

// ----------------------
// MAIN LOOP
// ----------------------

function animate(){

    requestAnimationFrame(
        animate
    );

    worldTime +=
        0.001 *
        timeScale;

    updateSeason();

    updateWeather();

    drawSky();

    drawStars();

    drawSunMoon();

    drawNightOverlay();

    drawGround();

    updateHUD();

    updateFPS();
}

animate();
