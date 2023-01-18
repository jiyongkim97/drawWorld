const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const languageChange = document.getElementById("language-change");
const modeErase = document.getElementById("mode-erase");
const modeDestroy = document.getElementById("mode-destroy");
const modeBtn = document.getElementById("mode-btn");
const colorOption = Array.from(document.getElementsByClassName("color-option"))
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
ctx.lineWidth = 2;

let ispainting = false;
let isFilling = false;
let isEnglish = true;

function onMove(event) {
  if (ispainting) {

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown() {
  ispainting = true;
}

function onMouseUp() {
  ispainting = false;
}


function onLineChange(event) {
  ctx.lineWidth = event.target.value
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false
    modeBtn.innerText = "fill"
  } else {
    isFilling = true
    modeBtn.innerText = "draw"
  }
}

function onFillCanvas() {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800)
  }
}

function onModeDestroy() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 800, 800)
}

function onModeErase() {
  ctx.strokeStyle = "white"
  if (isEnglish) {
    isEnglish = false;
    modeBtn.innerText = "fill"
  } else {
    modeBtn.innerText = "그리기"
  }
}

function onLangChange() {
  if (isEnglish) {
    isEnglish = false;
    modeBtn.innerText = "fill"
    modeDestroy.innerText = "destroy"
    modeErase.innerText = "erase"
  } else {
    isEnglish = true;
    modeBtn.innerText = "그리기"
    modeDestroy.innerText = "전체지우기"
    modeErase.innerText = "지우기"
  }
}

function onFileChange(event) {
  const file = event.target.files[0]
  const url = URL.createObjectURL(file)
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0)
  }
}

function onDoubleClick(event) {

  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  if (confirm("정말 저장하시겠습니까?") == true) {
    const url = canvas.toDataURL();
    const a = document.createElement("a")
    a.href = url
    a.download = "name"
    a.click();
  } else {
    return false;
  }
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("click", onFillCanvas);
modeDestroy.addEventListener("click", onModeDestroy);
modeErase.addEventListener("click", onModeErase);

lineWidth.addEventListener("change", onLineChange)
color.addEventListener("change", onColorChange)

colorOption.forEach(color => color.addEventListener("click", onColorClick))
modeBtn.addEventListener("click", onModeClick)
languageChange.addEventListener("click", onLangChange)
fileInput.addEventListener("change", onFileChange)
saveBtn.addEventListener("click", onSaveClick)