const modePill = document.querySelector("#modePill");
const modeLabel = document.querySelector("#modeLabel");
const switchState = document.querySelector("#switchState");
const routeNote = document.querySelector("#routeNote");
const toggleMode = document.querySelector("#toggleMode");
const controlLock = document.querySelector("#controlLock");
const stopAll = document.querySelector("#stopAll");
const presetLoop = document.querySelector("#presetLoop");
const routeRelay = document.querySelector(".route-relay");
const legacyRoute = document.querySelector(".legacy");
const digitalRoute = document.querySelector(".digital");
const controls = [
  document.querySelector("#throwerA"),
  document.querySelector("#throwerB"),
  document.querySelector("#feeder"),
];

const labels = {
  throwerA: document.querySelector("#throwerAValue"),
  throwerB: document.querySelector("#throwerBValue"),
  feeder: document.querySelector("#feederValue"),
};

let smartMode = false;

function setControlValue(control, value) {
  control.value = value;
  labels[control.id].value = `${value}%`;
}

function stopMotors() {
  controls.forEach((control) => setControlValue(control, 0));
}

function renderMode() {
  document.body.classList.toggle("smart-mode", smartMode);
  modeLabel.textContent = smartMode ? "Mode Smart" : "Mode Manual";
  switchState.textContent = smartMode ? "Toggle LOW" : "Toggle HIGH";
  routeNote.textContent = smartMode
    ? "Relay aktif di jalur NO. PWM ESP32 mengendalikan BTS7960 dan L298N secara digital."
    : "Jalur motor tetap tersambung ke sistem analog bawaan. ESP32 menjaga relay OFF.";
  controlLock.textContent = smartMode ? "Aktif" : "Terkunci";
  controlLock.classList.toggle("unlocked", smartMode);
  controls.forEach((control) => {
    control.disabled = !smartMode;
  });
  routeRelay.classList.toggle("active", true);
  legacyRoute.classList.toggle("active", !smartMode);
  digitalRoute.classList.toggle("active", smartMode);
  modePill.setAttribute("aria-label", modeLabel.textContent);

  if (!smartMode) {
    stopMotors();
  }
}

controls.forEach((control) => {
  control.addEventListener("input", () => setControlValue(control, control.value));
});

toggleMode.addEventListener("click", () => {
  smartMode = !smartMode;
  renderMode();
});

stopAll.addEventListener("click", stopMotors);

presetLoop.addEventListener("click", () => {
  if (!smartMode) return;
  setControlValue(controls[0], 62);
  setControlValue(controls[1], 58);
  setControlValue(controls[2], 34);
});

renderMode();
