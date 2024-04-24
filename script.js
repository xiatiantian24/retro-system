const powerpointButton = document.getElementById("powerpoint-button");
const wordButton = document.getElementById("word-button");
const excelButton = document.getElementById("excel-button");

const prevBlockButton = document.getElementById("prev-block");
const prevRowButton = document.getElementById("prev-row");
const prevColumnButton = document.getElementById("prev-column");
const prevCanvasButton = document.getElementById("prev-canvas");
const nextBlockButton = document.getElementById("next-block");
const nextRowButton = document.getElementById("next-row");
const nextColumnButton = document.getElementById("next-column");
const nextCanvasButton = document.getElementById("next-canvas");

function loadScript(src) {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
}

function loadScriptBasedOnButtonClass() {
    if (wordButton.classList.contains("btn-default")) {
        loadScript("script-word.js");
    } else if (excelButton.classList.contains("btn-default")) {
        loadScript("script-excel.js");
    } else {
        loadScript("script-powerpoint.js");
    }
}

loadScript("script-powerpoint.js");


powerpointButton.addEventListener("click", function () {
  wordButton.classList.remove("btn-default");
  excelButton.classList.remove("btn-default");
  powerpointButton.classList.add("btn-default");
  loadScriptBasedOnButtonClass();
});

wordButton.addEventListener("click", function () {
  powerpointButton.classList.remove("btn-default");
  excelButton.classList.remove("btn-default");
  wordButton.classList.add("btn-default");
  loadScriptBasedOnButtonClass();
});

excelButton.addEventListener("click", function () {
  powerpointButton.classList.remove("btn-default");
  wordButton.classList.remove("btn-default");
  excelButton.classList.add("btn-default");
  loadScriptBasedOnButtonClass();
});

//TODO: link scripts dynamically