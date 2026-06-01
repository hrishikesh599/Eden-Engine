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
        canvas.height * 1.15;

    const radiusX =
        canvas.width*0.45;

    const radiusY =
        canvas.height * 0.65;

    const sunX =
        centerX +
        Math.cos(
            worldTime-Math.PI
        )*radiusX;

    const sunY =
        centerY +
        Math.sin(
            worldTime-Math.PI
        )*radiusY;

    const moonX =
        centerX +
        Math.cos(
            worldTime
        )*radiusX;

    const moonY =
        centerY +
        Math.sin(
            worldTime
        )*radiusY;

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
class Firefly {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height *
            0.7;

        this.offset =
            Math.random() * 1000;

        this.size =
            1 + Math.random() * 2;

        this.speed =
            0.2 + Math.random() * 0.4;
    }

    update() {

        this.x +=
            Math.sin(
                Date.now() * 0.001 *
                this.speed +
                this.offset
            ) * 0.5;

        this.y +=
            Math.cos(
                Date.now() * 0.001 *
                this.speed +
                this.offset
            ) * 0.3;
    }

    draw() {

        const glow =

            (
                Math.sin(
                    Date.now() * 0.004 +
                    this.offset
                ) + 1
            ) / 2;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(
                255,
                255,
                120,
                ${glow}
            )`;

        ctx.shadowBlur =
            20 + glow * 15;

        ctx.shadowColor =
            "rgba(255,255,150,1)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}
for(let i = 0; i < 40; i++){

    fireflies.push(
        new Firefly()
    );
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
    for(
    let i = seeds.length - 1;
    i >= 0;
    i--
){

    const seed = seeds[i];

    seed.update();
    seed.draw();

    if(seed.germinated){

        plants.push(
            new Plant(
                seed.x,
                seed.y
            )
        );

        seeds.splice(i,1);
    }
}
plants.forEach(plant => {

    plant.update();
    plant.draw();

});
    
    drawSunMoon();
    const cycle =
    (Math.sin(worldTime)+1)/2;

if(cycle < 0.45){

    fireflies.forEach(f => {

        f.update();
        f.draw();

    });
}
}
// =========================
// PHASE 9 - SEEDS
// =========================

class Seed {

    constructor(x, y){

        this.x = x;
        this.y = y;

        this.age = 0;
        this.germinated = false;
    }

    update(){

        this.age += 0.001 * timeScale;

        if(this.age > 1){
            this.germinated = true;
        }
    }

    draw(){

        ctx.fillStyle = "#4a2d17";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}
// =========================
// PHASE 11 - SEGMENTED PLANT
// =========================

class Plant {

    constructor(x,y){

        this.x = x;
        this.y = y;

        this.segments = [];

        this.growthTimer = 0;

        this.maxSegments =
            12 +
            Math.floor(
                Math.random() * 12
            );

        this.windOffset =
            Math.random() * 1000;
    }

    growSegment(){

        let x = this.x;
        let y = this.y;

        let angle =
            -Math.PI / 2;

        if(
            this.segments.length > 0
        ){

            const prev =
                this.segments[
                    this.segments.length - 1
                ];

            x = prev.endX;
            y = prev.endY;

            angle = prev.angle;
        }

        angle +=
            (Math.random()-0.5) *
            0.25;

        const length =
            10 +
            Math.random() * 8;

        const endX =
            x +
            Math.cos(angle) *
            length;

        const endY =
            y +
            Math.sin(angle) *
            length;

        this.segments.push({

            x,
            y,

            endX,
            endY,

            angle,

            renderAngle:
                angle,

            length,

            thickness:
                Math.max(
                    1,
                    7 -
                    this.segments.length *
                    0.3
                )
        });
    }

    update(){

        this.growthTimer +=
            0.02 * timeScale;

        if(
            this.growthTimer > 1 &&
            this.segments.length <
            this.maxSegments
        ){

            this.growthTimer = 0;

            this.growSegment();
        }

        const wind =
            Math.sin(
                Date.now()*0.0008 +
                this.windOffset
            ) * 0.08;

        this.segments.forEach(
            (seg,i)=>{

            seg.renderAngle =
                seg.angle +

                Math.sin(
                    Date.now()*0.001 +
                    i*0.5 +
                    this.windOffset
                ) * 0.05 +

                wind;

            if(i > 0){

                const prev =
                    this.segments[i-1];

                seg.x =
                    prev.endX;

                seg.y =
                    prev.endY;
            }

            seg.endX =
                seg.x +
                Math.cos(
                    seg.renderAngle
                ) *
                seg.length;

            seg.endY =
                seg.y +
                Math.sin(
                    seg.renderAngle
                ) *
                seg.length;
        });
    }

    draw(){

    this.segments.forEach(
        (seg,i)=>{

        const brightness =
            25 + i * 1.5;

        ctx.strokeStyle =
            `hsl(
                110,
                40%,
                ${brightness}%
            )`;

        ctx.lineWidth =
            seg.thickness;

        ctx.beginPath();

        ctx.moveTo(
            seg.x,
            seg.y
        );

        ctx.quadraticCurveTo(

            (seg.x + seg.endX)/2 +
            Math.sin(i) * 3,

            (seg.y + seg.endY)/2,

            seg.endX,
            seg.endY

        );

        ctx.stroke();

        // leaves

        if(i > 2){

    const side =
        i % 2 === 0 ? 1 : -1;

    const offset = 10;

    drawLeaf(

        seg.endX +
        Math.cos(
            seg.renderAngle +
            side * Math.PI/2
        ) * offset,

        seg.endY +
        Math.sin(
            seg.renderAngle +
            side * Math.PI/2
        ) * offset,

        seg.renderAngle +
        side * 0.5,

        14
    );
}
    });
}
}
function drawLeaf(
    x,
    y,
    angle,
    size
){

    ctx.save();

    ctx.translate(
        x,
        y
    );

    ctx.rotate(
        angle
    );

    ctx.fillStyle =
        "rgba(80,200,80,0.9)";

    ctx.shadowBlur = 8;

    ctx.shadowColor =
        "rgba(80,255,80,0.8)";

    // left leaf

    ctx.beginPath();

    ctx.moveTo(0,0);

    ctx.quadraticCurveTo(
        -size,
        -size/2,
        -size*2,
        0
    );

    ctx.quadraticCurveTo(
        -size,
        size/2,
        0,
        0
    );

    ctx.fill();

    // right leaf

    ctx.beginPath();

    ctx.moveTo(0,0);

    ctx.quadraticCurveTo(
        size,
        -size/2,
        size*2,
        0
    );

    ctx.quadraticCurveTo(
        size,
        size/2,
        0,
        0
    );

    ctx.fill();

    ctx.restore();
}
animate();
canvas.addEventListener("click", e => {

    if(
        e.clientY >
        canvas.height - 120
    ){

        seeds.push(
            new Seed(
                e.clientX,
                e.clientY
            )
        );
    }
});

window.addEventListener("load", () => {
  const loading = document.getElementById("loadingScreen");

  setTimeout(() => {
    loading.style.opacity = "0";

    setTimeout(() => {
      loading.style.display = "none";
    }, 800);

  }, 1000);
});