let addSwatch = document.getElementById("add-swatch");
let modeToggle = document.getElementById("mode-toggle");
let swatches = document.getElementsByClassName("default-swatches")[0];
let colorIndicator = document.getElementById("color-indicator");
let userSwatches = document.getElementById("user-swatches");

let spectrumCanvas = document.getElementById("spectrum-canvas");
let spectrumCtx = spectrumCanvas.getContext("2d");
let spectrumCursor = document.getElementById("spectrum-cursor");
let spectrumRect = spectrumCanvas.getBoundingClientRect();

let hueCanvas = document.getElementById("hue-canvas");
let hueCtx = hueCanvas.getContext("2d");
let hueCursor = document.getElementById("hue-cursor");
let hueRect = hueCanvas.getBoundingClientRect();

let currentColor = "#ffffff";
let hue = 0;
let saturation = 0;
let lightness = 1;

let rgbFields = document.getElementById("rgb-fields");
let hexField = document.getElementById("hex-field");

let red = document.getElementById("red");
let blue = document.getElementById("blue");
let green = document.getElementById("green");
let hex = document.getElementById("hex");

class ColorPicker {
  defaultSwatches = [
    "#FFFFFF",
    "#FFFB0D",
    "#0532FF",
    "#FF9300",
    "#00F91A",
    "#FF2700",
    "#000000",
    "#686868",
    "#EE5464",
    "#D27AEE",
    "#5BA8C4",
    "#E64AA9"
  ];
  constructor() {
    this.addDefaultSwatches();
    createShadeSpectrum();
    createHueSpectrum();
    setCurrentColor(currentColor);
  }
  addDefaultSwatches() {
    for (let i = 0; i < this.defaultSwatches.length; i++) {
      createSwatch(swatches, this.defaultSwatches[i]);
    }
  }
}

function createSwatch(target, color) {
  let swatch = document.createElement("button");
  swatch.classList.add("swatch");
  swatch.setAttribute("title", color);
  swatch.style.backgroundColor = color;
  swatch.addEventListener("click", function () {
    let color = tinycolor(this.style.backgroundColor);
    colorToPosition(color);
    setColorValues(color);
  });
  target.appendChild(swatch);
  refreshElementRects();
}


function refreshElementRects() {
  spectrumRect = spectrumCanvas.getBoundingClientRect();
  hueRect = hueCanvas.getBoundingClientRect();
}

function createShadeSpectrum(color) {
  let canvas = spectrumCanvas;
  let ctx = spectrumCtx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!color) {
    color = "#FF0000";
  }
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  whiteGradient.addColorStop(0, "#FFFFFF");
  whiteGradient.addColorStop(1, "transparent");
  ctx.fillStyle = whiteGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  blackGradient.addColorStop(0, "transparent");
  blackGradient.addColorStop(1, "#000000");
  ctx.fillStyle = blackGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener("mousedown", function (e) {
    startGetSpectrumColor(e);
  });
}

function createHueSpectrum() {
  let canvas = hueCanvas;
  let ctx = hueCtx;
  let hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  hueGradient.addColorStop(0.00, "hsl(0, 100%, 50%)");
  hueGradient.addColorStop(0.17, "hsl(298.8, 100%, 50%)");
  hueGradient.addColorStop(0.33, "hsl(241.2, 100%, 50%)");
  hueGradient.addColorStop(0.50, "hsl(180, 100%, 50%)");
  hueGradient.addColorStop(0.67, "hsl(118.8, 100%, 50%)");
  hueGradient.addColorStop(0.83, "hsl(61.2, 100%, 50%)");
  hueGradient.addColorStop(1.00, "hsl(360, 100%, 50%)");
  ctx.fillStyle = hueGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  canvas.addEventListener("mousedown", function (e) {
    startGetHueColor(e);
  });
}

function colorToHue(color) {
  color = tinycolor(color);
  let hueString = tinycolor(`hsl ${color.toHsl().h} 1 .5`).toHslString();
  return hueString;
}

function colorToPosition(color) {
  color = tinycolor(color);
  let hsl = color.toHsl();
  let rgb = color.toRgb();
  let isBlackWhite = rgb.r === rgb.g && rgb.g === rgb.b
  if (!isBlackWhite) {
    hue = hsl.h;
  }
  let hsv = color.toHsv();
  let x = spectrumRect.width * hsv.s;
  let y = spectrumRect.height * (1 - hsv.v);
  let hueY = hueRect.height - ((hue / 360) * hueRect.height);
  updateSpectrumCursor(x, y);
  updateHueCursor(hueY);
  setCurrentColor(color);
  if (!isBlackWhite) {
    createShadeSpectrum(colorToHue(color));
  }
}

function setColorValues(color) {
  color = tinycolor(color);
  let rgbValues = color.toRgb();
  let hexValue = color.toHex();

  red.value = rgbValues.r;
  green.value = rgbValues.g;
  blue.value = rgbValues.b;
  hex.value = hexValue;
}

function setCurrentColor(color) {
  color = tinycolor(color);
  currentColor = color.toHexString();
  colorIndicator.style.backgroundColor = color;
  document.body.style.backgroundColor = color;
  spectrumCursor.style.backgroundColor = color;

  let hueColor = tinycolor(`hsl ${hue} 1 .5`);
  hueCursor.style.backgroundColor = hueColor;
}

function updateHueCursor(y) {
  hueCursor.style.top = `${y}px`;
}

function updateSpectrumCursor(x, y) {
  spectrumCursor.style.left = `${x}px`;
  spectrumCursor.style.top = `${y}px`;
}

let startGetSpectrumColor = function (e) {
  getSpectrumColor(e);
  spectrumCursor.classList.add("dragging");
  window.addEventListener("mousemove", getSpectrumColor);
  window.addEventListener("mouseup", endGetSpectrumColor);
}

function getSpectrumColor(e) {
  e.preventDefault();

  let x = e.pageX - (spectrumRect.left + window.scrollX);
  let y = e.pageY - (spectrumRect.top + window.scrollY);

  if (x > spectrumRect.width) {
    x = spectrumRect.width;
  }
  if (x < 0) {
    x = 0;
  }
  if (y > spectrumRect.height) {
    y = spectrumRect.height;
  }
  if (y < 0) {
    y = .1;
  }

  let xRatio = x / spectrumRect.width * 100;
  let yRatio = y / spectrumRect.height * 100;
  let hsvValue = 1 - (yRatio / 100);
  let hsvSaturation = xRatio / 100;
  lightness = (hsvValue / 2) * (2 - hsvSaturation);
  saturation = (hsvValue * hsvSaturation) / (1 - Math.abs(2 * lightness - 1));
  let color = tinycolor(`hsl ${hue} ${saturation} ${lightness}`);
  setCurrentColor(color);
  setColorValues(color);
  updateSpectrumCursor(x, y);
}

function endGetSpectrumColor(e) {
  spectrumCursor.classList.remove("dragging");
  window.removeEventListener("mousemove", getSpectrumColor);
}

function startGetHueColor(e) {
  getHueColor(e);
  hueCursor.classList.add("dragging");
  window.addEventListener("mousemove", getHueColor);
  window.addEventListener("mouseup", endGetHueColor);
}

function getHueColor(e) {
  e.preventDefault();
  let y = e.pageY - hueRect.top;
  if (y > hueRect.height) {
    y = hueRect.height;
  }
  if (y < 0) {
    y = 0;
  }
  let percent = y / hueRect.height;
  hue = 360 - (360 * percent);
  let hueColor = tinycolor(`hsl ${hue} 1 .5`).toHslString();
  let color = tinycolor(`hsl ${hue} ${saturation} ${lightness}`).toHslString();
  createShadeSpectrum(hueColor);
  updateHueCursor(y);
  setCurrentColor(color);
  setColorValues(color);
}

function endGetHueColor(e) {
  hueCursor.classList.remove("dragging");
  window.removeEventListener("mousemove", getHueColor);
}

red.addEventListener("change", function () {
  let color = tinycolor(`rgb ${red.value} ${green.value} ${blue.value}`);
  colorToPosition(color);
});

green.addEventListener("change", function () {
  let color = tinycolor(`rgb ${red.value} ${green.value} ${blue.value}`);
  colorToPosition(color);
});

blue.addEventListener("change", function () {
  let color = tinycolor(`rgb ${red.value} ${green.value} ${blue.value}`);
  colorToPosition(color);
});

addSwatch.addEventListener("click", function () {
  createSwatch(userSwatches, currentColor);
});

modeToggle.addEventListener("click", function () {
  rgbFields.classList.contains("active")
    ? rgbFields.classList.remove("active")
    : rgbFields.classList.add("active");

  hexField.classList.contains("active")
    ? hexField.classList.remove("active")
    : hexField.classList.add("active");
});

window.addEventListener("resize", function () {
  refreshElementRects();
});

new ColorPicker();