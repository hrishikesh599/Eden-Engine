*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{

  --panel-bg:
    rgba(20,25,35,0.35);

  --panel-border:
    rgba(255,255,255,0.12);

  --text:
    #ffffff;

  --accent:
    #7cff90;

  --shadow:
    rgba(0,0,0,0.35);
}

html,
body{

  width:100%;
  height:100%;
  overflow:hidden;

  font-family:
    Inter,
    Segoe UI,
    sans-serif;

  background:black;
}

/* ========================= */
/* CANVAS */
/* ========================= */

#garden{

  position:fixed;

  inset:0;

  width:100%;
  height:100%;

  display:block;

  z-index:1;
}

/* ========================= */
/* LOADING SCREEN */
/* ========================= */

#loadingScreen{

  position:fixed;

  inset:0;

  display:flex;

  justify-content:center;
  align-items:center;

  background:
    radial-gradient(
      circle at center,
      #17212f,
      #070b12
    );

  z-index:9999;
}

.loadingCard{

  width:420px;

  padding:40px;

  border-radius:24px;

  text-align:center;

  backdrop-filter:blur(20px);

  background:
    rgba(255,255,255,0.05);

  border:
    1px solid rgba(255,255,255,0.08);

  box-shadow:
    0 20px 60px rgba(0,0,0,0.45);
}

.loadingCard h1{

  color:white;

  font-size:48px;

  letter-spacing:4px;

  margin-bottom:12px;
}

.loadingCard p{

  color:rgba(255,255,255,0.7);

  margin-bottom:25px;
}

.loadingBar{

  width:100%;
  height:12px;

  overflow:hidden;

  border-radius:20px;

  background:
    rgba(255,255,255,0.08);
}

#loadingFill{

  width:0%;

  height:100%;

  border-radius:20px;

  background:
    linear-gradient(
      90deg,
      #56ff8c,
      #5fd9ff
    );

  animation:
    loadingMove 3s linear infinite;
}

@keyframes loadingMove{

  0%{
    width:0%;
  }

  50%{
    width:75%;
  }

  100%{
    width:100%;
  }
}

/* ========================= */
/* HUD */
/* ========================= */

#hud{

  position:fixed;

  top:20px;
  left:20px;
  right:20px;

  display:flex;

  justify-content:space-between;

  z-index:100;
}

.hudLeft,
.hudRight{

  display:flex;

  gap:12px;

  flex-wrap:wrap;
}

.hudItem{

  padding:10px 16px;

  color:white;

  font-size:14px;

  border-radius:14px;

  backdrop-filter:blur(14px);

  background:
    var(--panel-bg);

  border:
    1px solid var(--panel-border);

  box-shadow:
    0 6px 18px var(--shadow);
}

/* ========================= */
/* CONTROL PANEL */
/* ========================= */

#controlPanel{

  position:fixed;

  left:20px;
  top:100px;

  width:260px;

  z-index:100;

  padding:22px;

  border-radius:24px;

  color:white;

  backdrop-filter:blur(18px);

  background:
    var(--panel-bg);

  border:
    1px solid var(--panel-border);

  box-shadow:
    0 10px 30px var(--shadow);
}

#controlPanel h2{

  margin-bottom:18px;

  font-size:24px;
}

.section{

  margin-bottom:24px;
}

.section h3{

  margin-bottom:10px;

  opacity:.8;

  font-size:15px;
}

.buttonGrid{

  display:grid;

  grid-template-columns:
    repeat(2,1fr);

  gap:10px;
}

/* ========================= */
/* BUTTONS */
/* ========================= */

button{

  border:none;

  cursor:pointer;

  padding:12px;

  border-radius:14px;

  color:white;

  font-weight:600;

  backdrop-filter:blur(10px);

  background:
    rgba(255,255,255,0.08);

  transition:
    transform .2s,
    background .2s;
}

button:hover{

  transform:
    translateY(-2px);

  background:
    rgba(255,255,255,0.18);
}

button:active{

  transform:
    scale(.96);
}

/* ========================= */
/* STATS PANEL */
/* ========================= */

#statsPanel{

  position:fixed;

  top:100px;
  right:20px;

  width:280px;

  padding:22px;

  z-index:100;

  color:white;

  border-radius:24px;

  backdrop-filter:blur(18px);

  background:
    var(--panel-bg);

  border:
    1px solid var(--panel-border);

  box-shadow:
    0 10px 30px var(--shadow);
}

#statsPanel h2{

  margin-bottom:18px;
}

.statRow{

  display:flex;

  justify-content:space-between;

  margin-bottom:10px;

  padding-bottom:8px;

  border-bottom:
    1px solid rgba(255,255,255,0.05);
}

/* ========================= */
/* HELP OVERLAY */
/* ========================= */

#helpOverlay{

  position:fixed;

  bottom:20px;
  left:20px;

  width:300px;

  padding:20px;

  color:white;

  border-radius:22px;

  z-index:100;

  backdrop-filter:blur(16px);

  background:
    rgba(0,0,0,0.25);

  border:
    1px solid rgba(255,255,255,0.08);
}

#helpOverlay h2{

  margin-bottom:12px;
}

#helpOverlay ul{

  padding-left:20px;
}

#helpOverlay li{

  margin-bottom:8px;

  opacity:.85;
}

/* ========================= */
/* VERSION */
/* ========================= */

#versionTag{

  position:fixed;

  bottom:20px;
  right:20px;

  z-index:100;

  padding:10px 16px;

  border-radius:14px;

  color:white;

  font-size:13px;

  backdrop-filter:blur(14px);

  background:
    rgba(255,255,255,0.08);
}

/* ========================= */
/* SEASON BANNER */
/* ========================= */

#seasonBanner{

  position:fixed;

  top:50%;

  left:50%;

  transform:
    translate(-50%,-50%);

  font-size:72px;

  font-weight:900;

  letter-spacing:8px;

  color:
    rgba(255,255,255,0.08);

  pointer-events:none;

  z-index:5;
}

/* ========================= */
/* RESPONSIVE */
/* ========================= */

@media(max-width:900px){

  #controlPanel{

    width:220px;
  }

  #statsPanel{

    width:220px;
  }

  #seasonBanner{

    font-size:48px;
  }
}

@media(max-width:700px){

  #hud{

    flex-direction:column;

    gap:10px;
  }

  #statsPanel{

    display:none;
  }

  #helpOverlay{

    width:240px;
  }
}
// =====================================================
// TIME
// =====================================================

let timeScale = 1;

let worldTime = 0;

let dayCount = 1;

function setTimeScale(scale){

  timeScale = scale;
}

function updateTime(){

  worldTime +=
  0.00015 * timeScale;

  if(worldTime > Math.PI * 2){

    worldTime = 0;

    dayCount++;
  }
}
// =====================================================
// SEASONS
// =====================================================

const Seasons = {

  SPRING:"Spring",
  SUMMER:"Summer",
  AUTUMN:"Autumn",
  WINTER:"Winter"
};

let season = Seasons.SPRING;

function updateSeason(){

  const cycle =
  dayCount % 120;

  if(cycle < 30){

    season =
    Seasons.SPRING;
  }

  else if(cycle < 60){

    season =
    Seasons.SUMMER;
  }

  else if(cycle < 90){

    season =
    Seasons.AUTUMN;
  }

  else{

    season =
    Seasons.WINTER;
  }

  const seasonUI =
  document.getElementById(
    "seasonDisplay"
  );

  if(seasonUI){

    seasonUI.textContent =
    season;
  }
}
// =====================================================
// WEATHER
// =====================================================

const Weather = {

  CLEAR:"Clear",

  RAIN:"Rain",

  STORM:"Storm",

  SNOW:"Snow"
};

let weather =
Weather.CLEAR;

let weatherTimer = 0;

function updateWeather(){

  weatherTimer +=
  0.001 * timeScale;

  if(weatherTimer > 25){

    weatherTimer = 0;

    const r =
    Math.random();

    if(r < 0.45){

      weather =
      Weather.CLEAR;
    }

    else if(r < 0.7){

      weather =
      Weather.RAIN;
    }

    else if(r < 0.9){

      weather =
      Weather.SNOW;
    }

    else{

      weather =
      Weather.STORM;
    }
  }

  const weatherUI =
  document.getElementById(
    "weatherDisplay"
  );

  if(weatherUI){

    weatherUI.textContent =
    weather;
  }
}
function getSkyColors(){

  switch(season){

    case Seasons.SPRING:

      return [
        "#4da6ff",
        "#b8ecff"
      ];

    case Seasons.SUMMER:

      return [
        "#3f8dff",
        "#fff1a3"
      ];

    case Seasons.AUTUMN:

      return [
        "#ff9966",
        "#ffd199"
      ];

    case Seasons.WINTER:

      return [
        "#8aa7d8",
        "#dce9ff"
      ];
  }
}
function drawBackground(){

  const colors =
  getSkyColors();

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

  ctx.fillStyle =
  gradient;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}
