const CONFIG = {
  currency: "$",
  selectors: {
    textRight:       "#count-right",
    textBottom:      "#count-bottom",
    containerRight:  ".textright",
    containerBottom: ".textbottom",
    particleLayer:   "#particle-layer",
    heartBurst:      "#heart-burst"
  }
};

const PARTICLE_SHAPES = {
  starLarge:
    "M52.77,86.45l-9.36-9.46c-1.72-1.74-4.19-2.52-6.6-2.09l-13.09,2.35C17.66,78.34,12.98,72,15.8,66.52l6.1-11.82c1.12-2.17,1.1-4.76-0.05-6.92l-6.28-11.73c-2.91-5.43,1.67-11.84,7.76-10.85l13.13,2.15c2.42,0.4,4.87-0.42,6.57-2.19l9.21-9.6c4.27-4.45,11.78-2.07,12.71,4.02l2.01,13.15c0.37,2.42,1.91,4.5,4.11,5.57l11.97,5.8c5.55,2.69,5.61,10.57,0.1,13.34l-11.88,5.98c-2.19,1.1-3.69,3.21-4.03,5.63l-1.81,13.18C64.59,88.33,57.11,90.83,52.77,86.45z",
  starThin:
    "M52.77,86.45l-9.36-9.46c-1.72-1.74-4.19-2.52-6.6-2.09l-13.09,2.35C17.66,78.34,12.98,72,15.8,66.52l6.1-11.82c1.12-2.17,1.1-4.76-0.05-6.92l-6.28-11.73c-2.91-5.43,1.67-11.84,7.76-10.85l13.13,2.15c2.42,0.4,4.87-0.42,6.57-2.19l9.21-9.6c4.27-4.45,11.78-2.07,12.71,4.02l2.01,13.15c0.37,2.42,1.91,4.5,4.11,5.57l11.97,5.8c5.55,2.69,5.61,10.57,0.1,13.34l-11.88,5.98c-2.19,1.1-3.69,3.21-4.03,5.63l-1.81,13.18C64.59,88.33,57.11,90.83,52.77,86.45z",
  sparkDiamond:
    "M50 8 C73 8 92 27 92 50 C92 73 73 92 50 92 C27 92 8 73 8 50 C8 27 27 8 50 8 Z",
  dot:
    "M50 8 C73 8 92 27 92 50 C92 73 73 92 50 92 C27 92 8 73 8 50 C8 27 27 8 50 8 Z"
};

const HEART_PATH =
  "M181.07,113.46l-16.01,11.34c-9.49,6.7-16.35,16.48-19.38,27.7l-4.25,15.67l-0.94,3.44l-0.58,1.76l-0.78-1.7l-1.27-3.33 l-5.76-15.18c-4.11-10.87-11.9-19.93-22-25.67l-17.04-9.72l15.89-12.26c8.35-6.46,14.45-15.39,17.42-25.5l7.62-25.98l0.08,0.14 l0.03-0.15l10.12,25.11c3.95,9.77,10.89,18.06,19.83,23.68L181.07,113.46z";

// ── SVG Shape Constants (extracted so buildWidgetTemplate stays clean) ───────

const STAR_PATHS = {
  s1: "M181.07,113.46l-16.01,11.34c-9.49,6.7-16.35,16.48-19.38,27.7l-4.25,15.67l-0.94,3.44l-0.58,1.76l-0.78-1.7l-1.27-3.33 l-5.76-15.18c-4.11-10.87-11.9-19.93-22-25.67l-17.04-9.72l15.89-12.26c8.35-6.46,14.45-15.39,17.42-25.5l7.62-25.98l0.08,0.14 l0.03-0.15l10.12,25.11c3.95,9.77,10.89,18.06,19.83,23.68L181.07,113.46z",
  s2: "M162.29,119.84l-10.66,7.55c-6.31,4.46-10.88,10.97-12.9,18.44l-2.83,10.43l-0.62,2.29l-0.38,1.17l-0.52-1.13l-0.85-2.22 l-3.83-10.1c-2.74-7.23-7.92-13.26-14.64-17.08l-11.34-6.47l10.58-8.16c5.56-4.3,9.61-10.24,11.59-16.97l5.07-17.29l0.05,0.1 l0.02-0.1L137.76,97c2.63,6.5,7.24,12.02,13.2,15.76L162.29,119.84z",
  s3: "M153.85,119.89l-7.59,5.37c-4.49,3.17-7.75,7.81-9.18,13.12l-2.01,7.42l-0.44,1.63l-0.27,0.83l-0.37-0.8l-0.6-1.58l-2.73-7.19c-1.95-5.15-5.64-9.44-10.42-12.16l-8.07-4.6l7.53-5.81c3.96-3.06,6.84-7.29,8.25-12.08l3.61-12.31l0.04,0.07l0.01-0.07l4.8,11.9c1.87,4.63,5.16,8.56,9.4,11.22L153.85,119.89z",
  s4: "M157.28,111.06l-10.71,7.46c-6.35,4.41-10.97,10.88-13.04,18.33l-2.91,10.41l-0.64,2.28l-0.39,1.17l-0.51-1.13 l-0.83-2.22l-3.76-10.13c-2.68-7.25-7.82-13.33-14.51-17.2l-11.29-6.55l10.64-8.07c5.59-4.26,9.69-10.17,11.72-16.88l5.2-17.25 l0.05,0.1l0.02-0.1l6.61,16.76c2.58,6.52,7.15,12.08,13.08,15.86L157.28,111.06z M163.32,152.15c-2.1-1.34-3.72-3.31-4.63-5.61 l-2.34-5.94l-0.01,0.04l-0.02-0.03l-1.84,6.11c-0.72,2.38-2.17,4.47-4.15,5.98l-3.77,2.86l4,2.32c2.37,1.37,4.19,3.52,5.14,6.09 l1.33,3.59l0.29,0.79l0.18,0.4l0.14-0.41l0.23-0.81l1.03-3.68c0.73-2.64,2.37-4.93,4.62-6.49l3.79-2.64L163.32,152.15z"
};

const HANG_PATHS = {
  h1: "M57.69,26.76v-0.42c0-1.11,0.9-2.01,2.01-2.01c1.11,0,2.01,0.9,2.01,2.01v0.42c0,1.11-0.9,2.01-2.01,2.01 C58.59,28.77,57.69,27.87,57.69,26.76z M59.7,36.92c1.11,0,2.01-0.9,2.01-2.01v-0.24c0-1.11-0.9-1.89-2.01-1.89 c-1.11,0-2.01,1.02-2.01,2.13S58.59,36.92,59.7,36.92z M59.7,48.05c1.11,0,2.01-0.91,2.01-2.02v-0.42c0-1.11-0.9-2.01-2.01-2.01 c-1.11,0-2.01,0.9-2.01,2.01v0.42C57.69,47.13,58.59,48.05,59.7,48.05z M58.7,94.33c0,0.56,0.45,1,1,1c0.56,0,1.01-0.44,1.01-1 v-0.21c0-0.56-0.45-1.01-1.01-1.01c-0.55,0-1,0.45-1,1.01V94.33z M59.7,17.82c1.11,0,2.01-0.91,2.01-2.02v-0.42 c0-1.11-0.9-2.01-2.01-2.01c-1.11,0-2.01,0.9-2.01,2.01v0.42C57.69,16.92,58.59,17.82,59.7,17.82z M59.7,6.86 c1.11,0,2.01-0.89,2.01-2.01V4.44c0-1.12-0.9-2.01-2.01-2.01c-1.11,0-2.01,0.89-2.01,2.01v0.41C57.69,5.98,58.59,6.86,59.7,6.86z M73.12,68.31l-9.27-1.34l-3.94-7.99c1.01-0.11,1.8-0.96,1.8-2v-0.43c0-1.1-0.9-2.01-2.01-2.01c-1.11,0-2.01,0.91-2.01,2.01v0.43 c0,1.04,0.79,1.89,1.8,2l-3.93,7.99l-9.27,1.34l6.7,6.55l-1.58,9.24l8.29-4.36l8.29,4.36l-1.58-9.24L73.12,68.31z M59.7,84.39 c0.56,0,1.01-0.46,1.01-1.01v-0.21c0-0.56-0.45-1.01-1.01-1.01c-0.55,0-1,0.45-1,1.01v0.21C58.7,83.93,59.15,84.39,59.7,84.39z M58.7,88.86c0,0.55,0.45,1,1,1c0.56,0,1.01-0.45,1.01-1v-0.21c0-0.56-0.45-1.01-1.01-1.01c-0.55,0-1,0.45-1,1.01V88.86z M59.7,97.36c-2.19,0-3.97,1.78-3.97,3.98c0,2.19,1.78,3.97,3.97,3.97s3.97-1.78,3.97-3.97C63.67,99.13,61.89,97.36,59.7,97.36z",
  h2: "M84.9,129.17c0-0.81,0.66-1.48,1.48-1.48s1.48,0.67,1.48,1.48v0.31c0,0.82-0.66,1.49-1.48,1.49 s-1.48-0.67-1.48-1.49V129.17z M86.38,69.36c1.63,0,2.96-1.33,2.96-2.96v-0.63c0-1.63-1.33-2.96-2.96-2.96s-2.96,1.33-2.96,2.96 v0.63C83.42,68.03,84.75,69.36,86.38,69.36z M86.38,122.9c0.82,0,1.48-0.67,1.48-1.48v-0.31c0-0.82-0.66-1.49-1.48-1.49 s-1.48,0.67-1.48,1.49v0.31C84.9,122.23,85.56,122.9,86.38,122.9z M84.9,137.54c0,0.83,0.66,1.48,1.48,1.48s1.48-0.65,1.48-1.48 v-0.3c0-0.83-0.66-1.48-1.48-1.48s-1.48,0.65-1.48,1.48V137.54z M86.38,8.72c1.63,0,2.96-1.32,2.96-2.97V5.14 c0-1.65-1.33-2.96-2.96-2.96s-2.96,1.31-2.96,2.96v0.61C83.42,7.4,84.75,8.72,86.38,8.72z M86.38,24.85c1.63,0,2.96-1.33,2.96-2.96 v-0.63c0-1.63-1.33-2.96-2.96-2.96s-2.96,1.33-2.96,2.96v0.63C83.42,23.52,84.75,24.85,86.38,24.85z M86.38,40.98 c1.63,0,2.96-1.33,2.96-2.96V37.4c0-1.63-1.33-2.96-2.96-2.96s-2.96,1.33-2.96,2.96v0.62C83.42,39.65,84.75,40.98,86.38,40.98z M86.38,52.97c1.63,0,2.96-1.33,2.96-2.95v-0.36c0-1.63-1.33-2.78-2.96-2.78s-2.96,1.5-2.96,3.13 C83.42,51.65,84.75,52.97,86.38,52.97z M86.38,142c-3.23,0-5.85,2.62-5.85,5.85c0,3.23,2.62,5.85,5.85,5.85s5.85-2.62,5.85-5.85 C92.23,144.62,89.61,142,86.38,142z M106.14,99.23l-13.65-1.99l-5.8-11.76c1.49-0.15,2.65-1.43,2.65-2.95v-0.62 c0-1.64-1.33-2.97-2.96-2.97s-2.96,1.33-2.96,2.97v0.62c0,1.52,1.16,2.8,2.65,2.95l-5.8,11.76l-13.65,1.99l9.88,9.64l-2.33,13.61 l12.21-6.43l12.21,6.43l-2.33-13.61L106.14,99.23z",
  h3: "M41.39,2.59V2.28c0-0.82,0.66-1.48,1.48-1.48c0.81,0,1.48,0.66,1.48,1.48v0.31c0,0.82-0.67,1.48-1.48,1.48 C42.05,4.07,41.39,3.41,41.39,2.59z M52.75,49.32l-6.83-0.99l-2.9-5.89c0.74-0.06,1.33-0.7,1.33-1.47v-0.31 c0-0.81-0.67-1.48-1.48-1.48c-0.82,0-1.48,0.67-1.48,1.48v0.31c0,0.77,0.58,1.41,1.33,1.47l-2.91,5.89l-6.82,0.99l4.94,4.82 l-1.17,6.81l6.11-3.21l6.1,3.21l-1.16-6.81L52.75,49.32z M42.87,61.16c0.41,0,0.74-0.33,0.74-0.74v-0.16c0-0.41-0.33-0.74-0.74-0.74 s-0.74,0.33-0.74,0.74v0.16C42.13,60.83,42.46,61.16,42.87,61.16z M42.13,64.45c0,0.41,0.33,0.74,0.74,0.74s0.74-0.33,0.74-0.74 V64.3c0-0.41-0.33-0.74-0.74-0.74s-0.74,0.33-0.74,0.74V64.45z M42.87,34.39c0.81,0,1.48-0.67,1.48-1.48V32.6 c0-0.82-0.67-1.49-1.48-1.49c-0.82,0-1.48,0.67-1.48,1.49v0.31C41.39,33.72,42.05,34.39,42.87,34.39z M42.13,68.48 c0,0.41,0.33,0.74,0.74,0.74s0.74-0.33,0.74-0.74v-0.15c0-0.41-0.33-0.74-0.74-0.74s-0.74,0.33-0.74,0.74V68.48z M42.87,20.2 c0.81,0,1.48-0.66,1.48-1.48v-0.31c0-0.82-0.67-1.48-1.48-1.48c-0.82,0-1.48,0.66-1.48,1.48v0.31C41.39,19.54,42.05,20.2,42.87,20.2 z M42.87,12.14c0.81,0,1.48-0.67,1.48-1.49v-0.31c0-0.82-0.67-1.48-1.48-1.48c-0.82,0-1.48,0.66-1.48,1.48v0.31 C41.39,11.47,42.05,12.14,42.87,12.14z M42.87,26.2c0.81,0,1.48-0.67,1.48-1.48v-0.18c0-0.82-0.67-1.39-1.48-1.39 c-0.82,0-1.48,0.75-1.48,1.57C41.39,25.53,42.05,26.2,42.87,26.2z M42.87,70.71c-1.62,0-2.93,1.31-2.93,2.92 c0,1.62,1.31,2.93,2.93,2.93c1.61,0,2.92-1.31,2.92-2.93C45.79,72.02,44.48,70.71,42.87,70.71z"
};

const BLOB_CLIP_D =
  "M251.34,119.08c5.03,13.02,1.66,27.93-8.78,37.18c-18.87,16.73-52.95,22.2-52.95,22.2" +
  "c-4.75,30.71-18.16,46.69-27.2,54.22c-5.26,4.38-11.89,6.79-18.73,6.79" +
  "c-39.55-0.05-55.24-49.57-55.24-49.57c-27.36,4.25-45.09,0.11-56.23-5.54" +
  "c-14.95-7.58-22.74-24.38-18.84-40.68c5.75-24.04,28.06-45.8,28.06-45.8" +
  "c-8.5-21.24-8.19-44.64-7.28-56.49c0.78-10.2,6.85-19.49,16.29-23.4" +
  "c25.22-10.46,66.87,9.87,66.87,9.87c43.3-36.15,67.74-26.01,67.74-26.01" +
  "c32.58,10.29,23.15,76.31,23.15,76.31C235.15,88.76,246.55,106.69,251.34,119.08z";

// ── Helpers ──────────────────────────────────────────────────────────────────

function applyFonts(fieldData) {
  let fontFamily = "Roboto";
  const fn = fieldData.fontName;
  if (typeof fn === "string") {
    fontFamily = fn;
  } else if (typeof fn === "object" && fn && fn.family) {
    fontFamily = fn.family;
  }

  const link = document.createElement("link");
  link.rel  = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:wght@300;400;700;900&display=swap`;
  document.head.appendChild(link);

  document.querySelectorAll(".title,.text1,.textright,.textbottom").forEach((el) => {
    el.style.fontFamily = fontFamily;
  });
}

function buildParticleMarkup(count = 38) {
  const shapes = [
    { key: "starLarge",    weight: 3, sizeMin: 6,  sizeMax: 12, cls: "is-star"  },
    { key: "starThin",     weight: 3, sizeMin: 5,  sizeMax: 10, cls: "is-star"  },
    { key: "sparkDiamond", weight: 2, sizeMin: 4,  sizeMax:  7, cls: "is-spark" },
    { key: "dot",          weight: 9, sizeMin: 2,  sizeMax:  4, cls: "is-dot"   }
  ];

  const weighted = [];
  shapes.forEach((s) => { for (let i = 0; i < s.weight; i++) weighted.push(s); });

  let html = `<div class="particle-layer" id="particle-layer">`;

  for (let i = 0; i < count; i++) {
    const shape  = weighted[Math.floor(Math.random() * weighted.length)];
    const size   = shape.sizeMin + Math.random() * (shape.sizeMax - shape.sizeMin);
    const x      = (8  + Math.random() * 84).toFixed(2);
    const startY = (80 + Math.random() * 16).toFixed(2);
    const driftX = (Math.random() * 46 - 23).toFixed(2);
    const travelY  = (65 + Math.random() * 100).toFixed(2);
    const duration = (6  + Math.random() * 8).toFixed(2);
    const delay    = (-Math.random() * 14).toFixed(2);
    const twinkle  = (0.8 + Math.random() * 1.8).toFixed(2);
    const scale    = (0.7 + Math.random() * 0.9).toFixed(2);
    const rotate   = Math.floor(Math.random() * 360);
    const sway     = (8 + Math.random() * 18).toFixed(2);

    const alpha = shape.key === "dot"
      ? (0.35 + Math.random() * 0.35).toFixed(2)
      : (0.55 + Math.random() * 0.32).toFixed(2);

    const blinkScaleMin = shape.key === "dot"
      ? (0.45 + Math.random() * 0.18).toFixed(2)
      : (0.92 + Math.random() * 0.05).toFixed(2);

    const blinkScaleMax = shape.key === "dot"
      ? (1.1  + Math.random() * 0.4).toFixed(2)
      : (1.02 + Math.random() * 0.08).toFixed(2);

    html += `
      <span class="particle ${shape.cls}" style="
        --x:${x}%;--startY:${startY}%;--driftX:${driftX}px;
        --travelY:${travelY}px;--duration:${duration}s;--delay:${delay}s;
        --size:${size}px;--scale:${scale};--rotate:${rotate}deg;
        --twinkle:${twinkle}s;--alpha:${alpha};--sway:${sway}px;
        --blinkScaleMin:${blinkScaleMin};--blinkScaleMax:${blinkScaleMax};">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="${PARTICLE_SHAPES[shape.key]}"></path>
        </svg>
      </span>`;
  }

  html += `</div>`;
  return html;
}

function buildHeartBurstMarkup(count = 10) {
  let html = `<div class="heart-burst" id="heart-burst" aria-hidden="true">`;
  for (let i = 0; i < count; i++) {
    html += `
      <span class="heart heart-${i + 1}">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="${HEART_PATH}"></path>
        </svg>
      </span>`;
  }
  html += `</div>`;
  return html;
}

/* buildWidgetTemplate
   ─────────────────────────────────────────────────────────────────────────────
   All color/title values come from fieldData (runtime API data).
   No {SE_token} literals exist here — they would never be resolved in
   an external JS file.
   ───────────────────────────────────────────────────────────────────────────── */
function buildWidgetTemplate(fieldData) {
  const topImg = fieldData.top ||
    "https://cdn.streamelements.com/uploads/1fc8930a-ea61-45cd-b24d-9078e4059a38.png";

  const goalTarget  = fieldData.goalTarget ?? fieldData.goal ?? 100;
  const backopRaw   = typeof fieldData.backop === "number" ? fieldData.backop : 2;
  const backOpacity = Math.max(0, Math.min(backopRaw / 10, 0.9));

  const particlesEnabled =
    String(fieldData.particlesToggle || "on").toLowerCase() !== "off";

  // Read colors from fieldData (set by SE at runtime via onWidgetLoad)
  const starcol    = fieldData.starcol    || "#fffefe";
  const starhangcol = fieldData.starhangcol || "#fffefe";
  const backcolor  = fieldData.backcolor  || "rgb(254,255,254)";
  const fillcolor1 = fieldData.fillcolor1 || "#fddbad";
  const fillcolor2 = fieldData.fillcolor2 || "#ffb716";
  const strokecolor = fieldData.strokecolor || "#FFFFFF";
  const title      = fieldData.title      || "My Goal";

  return `
    <div class="container" id="container">

      <img class="front" src="${topImg}">

      <!-- ── Static decorative stars ── -->
      <svg class="starst" width="60" height="60" viewBox="0 0 266 240" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${starcol};fill-opacity:1;" d="${STAR_PATHS.s1}"/>
      </svg>
      <svg class="starst_2" width="60" height="60" viewBox="0 0 266 240" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${starcol};fill-opacity:1;" d="${STAR_PATHS.s2}"/>
      </svg>
      <svg class="starst_3" width="60" height="60" viewBox="0 0 266 240" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${starcol};fill-opacity:1;" d="${STAR_PATHS.s3}"/>
      </svg>
      <svg class="starst_4" width="60" height="60" viewBox="0 0 266 240" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${starcol};fill-opacity:1;" d="${STAR_PATHS.s4}"/>
      </svg>

      <!-- ── Hanging / swinging stars ── -->
      <svg class="starsthang_1 swing" width="60" height="60" viewBox="0 0 119.41 107.74" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${starhangcol};fill-opacity:1;" d="${HANG_PATHS.h1}"/>
      </svg>
      <svg class="starsthang_2 swing" width="60" height="60" viewBox="0 0 172.77 155.88" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${starhangcol};fill-opacity:1;" d="${HANG_PATHS.h2}"/>
      </svg>
      <svg class="starsthang_3 swing" width="60" height="60" viewBox="0 0 85.73 77.35" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${starhangcol};fill-opacity:1;" d="${HANG_PATHS.h3}"/>
      </svg>

      <!-- ── Liquid fill area ── -->
      <div class="liquid">
        <div class="mask">

          <!-- SVG clip-path definition (zero-size, just holds the defs) -->
          <svg width="0" height="0" viewBox="0 0 200 200" style="position:absolute">
            <defs>
              <clipPath id="fillmask">
                <path transform="translate(-2.1 0) scale(0.80)" d="${BLOB_CLIP_D}"/>
              </clipPath>
            </defs>
          </svg>

          <!-- Back (behind) liquid layer -->
          <div class="liquid-rect-wrap liquid-rect-wrap-back" id="liquid-rect-wrap-back">
            <svg id="svg-element-back" class="liquid-rect-svg liquid-rect-svg-back"
                 viewBox="0 0 224 251" preserveAspectRatio="none">
              <path id="liquid-path-back" fill="${backcolor}" d="M0 251 L224 251 L224 251 L0 251 Z"/>
            </svg>
          </div>

          <!-- Front liquid layer (gradient fill) -->
          <div class="liquid-rect-wrap" id="liquid-rect-wrap">
            <svg id="svg-element" class="liquid-rect-svg" viewBox="0 0 224 251" preserveAspectRatio="none">
              <defs>
                <linearGradient id="front-gradient-2" gradientUnits="userSpaceOnUse"
                                x1="0" y1="251" x2="0" y2="0" gradientTransform="rotate(0)">
                  <stop offset="0%"   stop-color="${fillcolor1}"/>
                  <stop offset="100%" stop-color="${fillcolor2}"/>
                </linearGradient>
              </defs>
              <path id="liquid-path" fill="url(#front-gradient-2)" d="M0 251 L224 251 L224 251 L0 251 Z"/>
            </svg>
          </div>

          <!-- Stroke / surface line layer -->
          <div class="liquid-stroke-wrap" id="liquid-stroke-wrap">
            <svg id="svg-element-stroke" class="liquid-stroke-svg" viewBox="0 0 224 251" preserveAspectRatio="none">
              <path id="liquid-path-stroke"
                    fill="none"
                    stroke="${strokecolor}"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M0 251 L224 251"/>
            </svg>
          </div>

          ${particlesEnabled ? buildParticleMarkup(38) : ""}
        </div>

        ${buildHeartBurstMarkup(10)}
      </div>

      <!-- ── Background blob shadow ── -->
      <div class="back">
        <svg xmlns="http://www.w3.org/2000/svg" width="266.66666" height="240" viewBox="0 0 266.66666 240">
          <g>
            <path transform="translate(-2 40) scale(0.76)"
                  style="fill:#000000;fill-opacity:${backOpacity};stroke-width:8;stroke-linecap:round"
                  d="${BLOB_CLIP_D}"/>
          </g>
        </svg>
      </div>

      <!-- ── Text display ── -->
      <div class="textcontainer">
        <div class="textright">
          <div class="title">${title}</div>
          <p class="text1" id="count-right">0 / ${goalTarget}</p>
        </div>
        <div class="textbottom">
          <div class="title">${title}</div>
          <p class="text1" id="count-bottom">0 / ${goalTarget}</p>
        </div>
      </div>

    </div>
  `;
}

// ── Main Widget Class ─────────────────────────────────────────────────────────

class GoalWidget {
  constructor() {
    this.fieldData = {};

    this.state = {
      goalType:       "",
      goalTarget:     0,
      currentAmount:  0,
      startAmount:    0,
      animatedPercent: 0,
      targetPercent:  0,
      timeframe:      "total",
      countResubs:    false
    };

    /* Layer defaults — ALL color/speed values are overwritten in
       applyFieldDataToLayers() once fieldData is available.
       No {SE_tokens} here — this is an external file.            */
    this.layers = {
      front: {
        wrapId: "liquid-rect-wrap",   svgId: "svg-element",        pathId: "liquid-path",
        bottom: -70, left: -18, width: 224, height: 281,
        amplitude: 5, step: 8,
        speed:   0.07,    // overwritten from fieldData.liquidspeed
        opacity: 1,
        filterIdle:   "drop-shadow(0 0 5px rgba(255,241,190,0.45)) drop-shadow(0 0 7px rgba(255,241,190,0.45))",
        filterActive: "drop-shadow(0 0 7px rgba(255,241,190,0.45)) drop-shadow(0 0 2px rgba(255,241,190,0.45))",
        reverse: false, percentOffset: 0, phaseOffset: 0
      },
      back: {
        wrapId: "liquid-rect-wrap-back", svgId: "svg-element-back", pathId: "liquid-path-back",
        bottom: -66, left: -18, width: 224, height: 281,
        amplitude: 7, step: 8,
        speed:   0.07,    // overwritten from fieldData.liquidspeed
        opacity: 1,
        filterIdle:   "drop-shadow(0 0 4px rgba(255,241,190,0.45)) drop-shadow(0 0 6px rgba(255,241,190,0.45))",
        filterActive: "drop-shadow(0 0 6px rgba(255,241,190,0.45)) drop-shadow(0 0 10px rgba(255,241,190,0.45))",
        reverse: true,  percentOffset: -2, phaseOffset: 0
      },
      stroke: {
        wrapId: "liquid-stroke-wrap", svgId: "svg-element-stroke", pathId: "liquid-path-stroke",
        bottom: -72, left: -18, width: 224, height: 281,
        amplitude: 5, step: 8,
        speed:       0.09,        // overwritten from fieldData.strokespeed
        strokeWidth: 2,
        strokeColor: "#FFFFFF",   // overwritten from fieldData.strokecolor
        opacity: 1,
        filterIdle:   "drop-shadow(0 0 3px rgba(255,241,190,0.45)) drop-shadow(0 0 5px rgba(255,241,190,0.45))",
        filterActive: "drop-shadow(0 0 5px rgba(255,241,190,0.45)) drop-shadow(0 0 9px rgba(255,241,190,0.45))",
        reverse: false, percentOffset: 0, phaseOffset: 0
      }
    };

    this._warpFrame       = null;
    this._percentTweenFrame = null;
    this._waveOffsets     = { front: 0, back: 0, stroke: 0 };
  }

  /* ─── applyFieldDataToLayers ──────────────────────────────────────────────
     Replaces what used to be {SE_token} literals inside the JS panel.
     Called in init() after fieldData is available from onWidgetLoad.
     ───────────────────────────────────────────────────────────────────────── */
  applyFieldDataToLayers(fieldData) {
    const glow        = fieldData.glow        || "rgba(255,241,190,0.45)";
    const liquidspeed = parseFloat(fieldData.liquidspeed) || 0.07;
    const strokespeed = parseFloat(fieldData.strokespeed) || 0.09;
    const strokecolor = fieldData.strokecolor || "#FFFFFF";

    // ── Speed ──────────────────────────────────
    this.layers.front.speed  = liquidspeed;
    this.layers.back.speed   = liquidspeed;
    this.layers.stroke.speed = strokespeed;

    // ── Glow filters (match SE panel exactly) ──
    this.layers.front.filterIdle   = `drop-shadow(0 0 5px ${glow}) drop-shadow(0 0 7px ${glow})`;
    this.layers.front.filterActive = `drop-shadow(0 0 7px ${glow}) drop-shadow(0 0 2px ${glow})`;

    this.layers.back.filterIdle    = `drop-shadow(0 0 4px ${glow}) drop-shadow(0 0 6px ${glow})`;
    this.layers.back.filterActive  = `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 10px ${glow})`;

    this.layers.stroke.strokeColor  = strokecolor;
    this.layers.stroke.filterIdle   = `drop-shadow(0 0 3px ${glow}) drop-shadow(0 0 5px ${glow})`;
    this.layers.stroke.filterActive = `drop-shadow(0 0 5px ${glow}) drop-shadow(0 0 9px ${glow})`;
  }

  // ── Utility ─────────────────────────────────────────────────────────────

  getNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  getBucketKey(base, timeframe) {
    const tf = String(timeframe || "total").toLowerCase();
    if (tf === "month")   return `${base}-month`;
    if (tf === "week")    return `${base}-week`;
    if (tf === "session") return `${base}-session`;
    if (tf === "manual")  return null;
    return `${base}-total`;
  }

  computeSubscriberIncrement(event, countResubs) {
    if (countResubs) {
      if (event && event.bulkGifted) return this.getNumber(event.amount, 1);
      return 1;
    }
    const subType = String(event?.sub_type || event?.type || "").toLowerCase();
    const isResub = event?.isResub === true || event?.is_resub === true || subType.includes("resub");
    if (isResub) return 0;
    if (event && event.bulkGifted) return this.getNumber(event.amount, 1);
    return 1;
  }

  // ── DOM Build ────────────────────────────────────────────────────────────

  buildDOM(fieldData) {
    const root = document.getElementById("widget-root") || document.body;
    root.innerHTML = buildWidgetTemplate(fieldData);
  }

  // ── Layer Styling ────────────────────────────────────────────────────────

  applyLayerStyles(layer) {
    const wrap = document.getElementById(layer.wrapId);
    const svg  = document.getElementById(layer.svgId);
    const path = document.getElementById(layer.pathId);

    if (wrap) {
      wrap.style.position     = "absolute";
      wrap.style.left         = `${layer.left}px`;
      wrap.style.bottom       = `${layer.bottom}px`;
      wrap.style.width        = `${layer.width}px`;
      wrap.style.height       = `${layer.height}px`;
      wrap.style.overflow     = "hidden";
      wrap.style.pointerEvents = "none";

      if (layer === this.layers.back)   wrap.style.zIndex = "0";
      if (layer === this.layers.front)  wrap.style.zIndex = "1";
      if (layer === this.layers.stroke) wrap.style.zIndex = "3";
    }

    if (svg) {
      svg.style.position     = "absolute";
      svg.style.left         = "0";
      svg.style.bottom       = "0";
      svg.style.width        = `${layer.width}px`;
      svg.style.height       = `${layer.height}px`;
      svg.style.display      = "block";
      svg.style.overflow     = "visible";
      svg.style.pointerEvents = "none";
      svg.style.opacity      = String(layer.opacity);
      svg.style.willChange   = "transform, filter";
      svg.style.transition   =
        "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), filter 400ms ease, opacity 400ms ease";
      svg.style.filter = layer.filterIdle;
    }

    if (path && layer === this.layers.stroke) {
      path.setAttribute("fill",             "none");
      path.setAttribute("stroke",           layer.strokeColor);
      path.setAttribute("stroke-width",     String(layer.strokeWidth));
      path.setAttribute("stroke-linecap",   "round");
      path.setAttribute("stroke-linejoin",  "round");
    }
  }

  applyLiquidRectInlineStyles() {
    this.applyLayerStyles(this.layers.back);
    this.applyLayerStyles(this.layers.front);
    this.applyLayerStyles(this.layers.stroke);
  }

  // ── Wave / Liquid Animation ──────────────────────────────────────────────

  buildLiquidPath(layer, surfaceY, offset) {
    const { width, height, amplitude, step, reverse } = layer;
    const sign = reverse ? -1 : 1;
    let d = `M 0 ${surfaceY}`;

    for (let x = 0; x <= width; x += step) {
      let phase;
      if (layer === this.layers.stroke) {
        phase = reverse ? x / 35 - offset + layer.phaseOffset
                        : x / 35 + offset + layer.phaseOffset;
      } else {
        phase = reverse ? x / 23 - offset + layer.phaseOffset
                        : x / 18 + offset + layer.phaseOffset;
      }
      const y = surfaceY + sign * amplitude * Math.sin(phase);
      d += ` L ${x} ${y}`;
    }

    if (layer === this.layers.stroke) return d;
    d += ` L ${width} ${height} L 0 ${height} Z`;
    return d;
  }

  getLayerPercent(layer, basePercent) {
    return Math.max(0, Math.min(basePercent + layer.percentOffset, 100));
  }

  initLiquidWarp() {
    const frontPath  = document.getElementById(this.layers.front.pathId);
    const backPath   = document.getElementById(this.layers.back.pathId);
    const strokePath = document.getElementById(this.layers.stroke.pathId);
    if (!frontPath || !backPath || !strokePath) return;

    if (this._warpFrame) { cancelAnimationFrame(this._warpFrame); this._warpFrame = null; }

    const animate = () => {
      const mask       = document.querySelector(".mask");
      const maskHeight = mask ? mask.clientHeight : this.layers.front.height;

      this._waveOffsets.front  += this.layers.front.speed;
      this._waveOffsets.back   += this.layers.back.speed;
      this._waveOffsets.stroke += this.layers.stroke.speed;

      const fPct = this.getLayerPercent(this.layers.front,  this.state.animatedPercent);
      const bPct = this.getLayerPercent(this.layers.back,   this.state.animatedPercent);
      const sPct = this.getLayerPercent(this.layers.stroke, this.state.animatedPercent);

      frontPath.setAttribute("d",  this.buildLiquidPath(this.layers.front,  maskHeight * (1 - fPct / 100), this._waveOffsets.front));
      backPath.setAttribute("d",   this.buildLiquidPath(this.layers.back,   maskHeight * (1 - bPct / 100), this._waveOffsets.back));
      strokePath.setAttribute("d", this.buildLiquidPath(this.layers.stroke, maskHeight * (1 - sPct / 100), this._waveOffsets.stroke));

      this._warpFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  // ── Percent Tween ────────────────────────────────────────────────────────

  startPercentTween(nextPercent) {
    const start     = this.state.animatedPercent;
    const end       = Math.max(0, Math.min(nextPercent, 100));
    const duration  = 900;
    const startTime = performance.now();

    if (this._percentTweenFrame) { cancelAnimationFrame(this._percentTweenFrame); }

    const tick = (now) => {
      const t     = Math.min((now - startTime) / duration, 1);
      const eased = this.easeOutCubic(t);
      this.state.animatedPercent = start + (end - start) * eased;
      if (t < 1) {
        this._percentTweenFrame = requestAnimationFrame(tick);
      } else {
        this.state.animatedPercent  = end;
        this._percentTweenFrame = null;
      }
    };

    this._percentTweenFrame = requestAnimationFrame(tick);
  }

  // ── Particle / Burst ─────────────────────────────────────────────────────

  updateParticleProgress(percentage) {
    const layer = document.querySelector(CONFIG.selectors.particleLayer);
    if (!layer) return;

    const enabled = String(this.fieldData?.particlesToggle || "on").toLowerCase() !== "off";

    if (!enabled) {
      document.documentElement.style.setProperty("--particle-progress", "0");
      layer.classList.remove("is-active");
      return;
    }

    const clamped = Math.max(0, Math.min(percentage / 100, 1));
    document.documentElement.style.setProperty("--particle-progress", String(clamped));
    layer.classList.toggle("is-active", percentage > 0);
  }

  updateCompletionBurst(percentage) {
    const burst   = document.querySelector(CONFIG.selectors.heartBurst);
    if (!burst)   return;

    const enabled = String(this.fieldData?.heartend || "on").toLowerCase() !== "off";
    if (!enabled) { burst.classList.remove("is-full"); return; }

    burst.classList.toggle("is-full", percentage >= 100);
  }

  // ── Layer Visuals ────────────────────────────────────────────────────────

  updateLayerVisuals(layer, active) {
    const svg = document.getElementById(layer.svgId);
    if (!svg) return;
    svg.style.filter = active ? layer.filterActive : layer.filterIdle;
  }

  // ── UI Update ────────────────────────────────────────────────────────────

  updateUI() {
    const currentAmount = this.getNumber(this.state.currentAmount);
    const goalTarget    = this.getNumber(this.state.goalTarget);
    const goalType      = this.state.goalType;

    const percentage = goalTarget > 0
      ? Math.min((currentAmount / goalTarget) * 100, 100)
      : 0;

    this.state.targetPercent = percentage;
    this.startPercentTween(percentage);

    this.updateLayerVisuals(this.layers.front,  percentage > 0);
    this.updateLayerVisuals(this.layers.back,   percentage > 0);
    this.updateLayerVisuals(this.layers.stroke, percentage > 0);
    this.updateParticleProgress(percentage);
    this.updateCompletionBurst(percentage);

    let displayAmount, displayTarget;
    if (goalType === "tip") {
      displayAmount = CONFIG.currency + Math.floor(currentAmount);
      displayTarget = CONFIG.currency + Math.floor(goalTarget);
    } else {
      displayAmount = Math.floor(currentAmount);
      displayTarget = Math.floor(goalTarget);
    }

    const textStr    = `${displayAmount} / ${displayTarget}`;
    const textRight  = document.querySelector(CONFIG.selectors.textRight);
    const textBottom = document.querySelector(CONFIG.selectors.textBottom);
    if (textRight)  textRight.innerText  = textStr;
    if (textBottom) textBottom.innerText = textStr;
  }

  // ── Text Position & Layout ───────────────────────────────────────────────

  setupTextPosition(position) {
    const right  = document.querySelector(CONFIG.selectors.containerRight);
    const bottom = document.querySelector(CONFIG.selectors.containerBottom);
    if (!right || !bottom) return;

    document.body.classList.remove("pos-right", "pos-bottom");

    if (position === "right") {
      right.style.visibility  = "visible";
      bottom.style.visibility = "hidden";
      document.body.classList.add("pos-right");
    } else {
      right.style.visibility  = "hidden";
      bottom.style.visibility = "visible";
      document.body.classList.add("pos-bottom");
    }
  }

  // ── Goal Amount Init ─────────────────────────────────────────────────────

  initializeAmount(data) {
    const type      = this.state.goalType;
    const timeframe = this.state.timeframe || "total";

    const getTotal = (key, field) => {
      const obj = data[key];
      return obj ? this.getNumber(obj[field]) : 0;
    };

    if (String(timeframe).toLowerCase() === "manual") {
      this.state.currentAmount = this.getNumber(this.state.startAmount, 0);
      return;
    }

    let initialValue = 0;

    if (type === "follower") {
      initialValue = 0;
    } else {
      const mapBase = { subscriber: "subscriber", tip: "tip", cheer: "cheer", raid: "raid" };
      const base    = mapBase[type];
      if (base) {
        const bucketKey = this.getBucketKey(base, timeframe);
        if (bucketKey) {
          const field  = (type === "tip" || type === "cheer") ? "amount" : "count";
          initialValue = getTotal(bucketKey, field);
        }
      }
    }

    this.state.currentAmount =
      this.getNumber(initialValue) + this.getNumber(this.state.startAmount, 0);
  }

  // ── Event Handling ───────────────────────────────────────────────────────

  increment(value) {
    this.state.currentAmount =
      this.getNumber(this.state.currentAmount) + this.getNumber(value, 0);
  }

  handleEvent(listener, event) {
    if (!event) return;
    const num = (v) => this.getNumber(v);

    const handlers = {
      "follower-latest":    () => this.increment(1),
      "subscriber-latest":  () => this.increment(this.computeSubscriberIncrement(event, this.state.countResubs)),
      "tip-latest":         () => this.increment(num(event.amount)),
      "cheer-latest":       () => this.increment(num(event.amount)),
      "raid-latest":        () => this.increment(num(event.viewers ?? event.amount))
    };

    if (listener.startsWith(this.state.goalType) && handlers[listener]) {
      handlers[listener]();
      this.updateUI();
    }
  }

  // ── Init ─────────────────────────────────────────────────────────────────

  init(detail) {
    const { fieldData: fields, session } = detail;
    const data = session?.data || {};

    this.fieldData = fields || {};

    // 1. Build the DOM (uses fieldData for colors/title — no SE tokens)
    this.buildDOM(this.fieldData);

    // 2. Apply fieldData-driven values to layers
    //    (replaces {liquidspeed}, {strokespeed}, {glow}, {strokecolor} tokens)
    this.applyFieldDataToLayers(this.fieldData);

    // 3. Set CONFIG currency
    CONFIG.currency = String(this.fieldData.cur ?? "").trim() || "$";

    // 4. Load Google Font
    applyFonts(this.fieldData);

    // 5. State
    const validTypes = ["follower", "subscriber", "tip", "cheer", "raid"];
    let goalType = this.fieldData.goalType || "tip";
    if (!validTypes.includes(goalType)) goalType = "tip";

    this.state.goalType    = goalType;
    this.state.goalTarget  = this.getNumber(this.fieldData.goalTarget ?? this.fieldData.goal ?? 0);
    this.state.startAmount = this.getNumber(this.fieldData.startAmount || 0);
    this.state.timeframe   = this.fieldData.timeframe || "total";
    this.state.countResubs = !!this.fieldData.resubs;

    // 6. Back wave opacity toggle
    const backWaveToggle = String(this.fieldData.backWaveOpacity || "on").toLowerCase();
    this.layers.back.opacity = backWaveToggle === "off" ? 0 : 1;

    // 7. Text position
    this.setupTextPosition(this.fieldData.textPosition || this.fieldData.textpos || "bottom");

    // 8. Text layout class
    const layout = (this.fieldData.textLayout || "one").toLowerCase();
    document.body.classList.remove("layout-one", "layout-two");
    document.body.classList.add(layout === "two" ? "layout-two" : "layout-one");

    // 9. Text background toggle
    const textBgToggle = (this.fieldData.textBgToggle || "on").toLowerCase();
    document.body.classList.remove("textbg-on", "textbg-off");
    document.body.classList.add(textBgToggle === "off" ? "textbg-off" : "textbg-on");

    // 10. Calculate initial amount
    this.initializeAmount(data);

    // 11. Set animated percentage
    const initialPct = this.state.goalTarget > 0
      ? Math.min((this.state.currentAmount / this.state.goalTarget) * 100, 100)
      : 0;

    this.state.animatedPercent = initialPct;
    this.state.targetPercent   = initialPct;

    // 12. Apply layer styles then start liquid warp loop
    this.applyLiquidRectInlineStyles();
    this.initLiquidWarp();
    this.updateUI();
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

const widget = new GoalWidget();

window.addEventListener("onWidgetLoad",    (obj) => widget.init(obj.detail));
window.addEventListener("onEventReceived", (obj) => widget.handleEvent(obj.detail.listener, obj.detail.event));
