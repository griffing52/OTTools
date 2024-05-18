// made originally 2019

let prevContent;

const descenders = "gjpqy"
const ascenders = "bdfhiklt!@#$%&(){}[]?/;:|\\"

const editor = document.getElementById("editor");
const ctx = editor.getContext("2d");

const startup = () => {
    editor.width = editor.parentElement.offsetWidth
    editor.height = editor.parentElement.offsetHeight

    clearCanvas(ctx);

    let step = drawPDF(ctx)(9)(18/951)
    // drawText(ctx)("")(step)(editor.width)
}

window.addEventListener("load", startup, false);

/** temporary event listener for testing */
document.querySelector("#input").addEventListener("input", () => {
    clearCanvas(ctx);

    let step = drawPDF(ctx)(9)(18/951)
    drawText(ctx)(document.querySelector("#input").value)(step)(editor.width)
}, false);

/**
 * The `loadContent` function takes user input, creates a canvas element, and draws the input text on
 * the canvas.
 */
const loadContent = () => {
    let text = document.getElementById("input").value
    prevContent = document.body.innerHTML
    // document.body.innerHTML = "<hr><br><br><hr class='striped-border'>"
    document.body.innerHTML = "<div id='printContent'><canvas style='width: 100%; height: 100%;' id='canvas'></canvas></div>"
    
    var canvas = document.getElementById('canvas')
    canvas.width = canvas.parentElement.offsetWidth
    canvas.height = canvas.parentElement.offsetHeight
    var ctx = canvas.getContext('2d')
  
	clearCanvas(ctx);

    let step = drawPDF(ctx)(9)(18/951)
    drawText(ctx)(text)(step)(canvas.width)


    // var dataUrl = document.getElementById('canvas').toDataURL();
    // document.body.innerHTML = "<img width='21cm' height='29.7cm' style='margin: 1in;' src='" + dataUrl + "'>"
    // document.body.innerHTML += text
    // document.body.innerHTML = "<h1>Testing!!!</h1>"
}

window.onbeforeprint = loadContent
window.onafterprint = () => document.body.innerHTML = prevContent