// made originally 2019

let prevContent;

const descenders = "gjpqy"
const ascenders = "bdfhiklt!@#$%&(){}[]?/;:|\\"


/**
 * The function `drawPDF` takes a canvas context and returns the step size for drawing rows on the
 * canvas based on the number of rows per page and the number of dots per pixel.
 * @returns The function `drawPDF` returns the value of the variable `step`.
 */
const drawPDF = ctx => rowsPerPage => dotsPerPixel => {
    let numOfSpaces = rowsPerPage*3-1
    let step = ctx.canvas.height/numOfSpaces

    let numOfDots = Math.floor(ctx.canvas.width * dotsPerPixel);
    numOfDots = (numOfDots % 2 == 0) ? numOfDots + 1 : numOfDots;
    let dottedStep = ctx.canvas.width/(numOfDots * 2+1);

    let lineY = 0
    ctx.beginPath()
    ctx.fillStyle = 'black'
    for (let r = 0; r < rowsPerPage; r++) {
        // top line
        ctx.moveTo(0, lineY)
        ctx.lineTo(ctx.canvas.width, lineY)
        lineY += step
        
        // dotted line
        let x = 0;
        for (let d = 0; d < numOfDots+1; d++) {  
            ctx.moveTo(x, lineY)
            ctx.lineTo(x + dottedStep, lineY)
            x += 2 * dottedStep
        }
        
        //bottom line
        lineY += step
        ctx.moveTo(0, lineY)
        ctx.lineTo(ctx.canvas.width, lineY)
        lineY += step
    }
    ctx.stroke()
    return step
}

/**
 * The function `drawBox` takes a canvas context and returns a function that draws a box on the canvas
 * given the coordinates and dimensions.
 */
const drawBox = ctx => x => y => w => h => {
    ctx.moveTo(x, y)
    ctx.lineTo(x+w, y)
    ctx.moveTo(x+w, y)
    ctx.lineTo(x+w, y+h)
    ctx.moveTo(x+w, y+h)
    ctx.lineTo(x, y+h)
    ctx.moveTo(x, y+h)
    ctx.lineTo(x, y)
}

/**
 * The function `drawBoundingBox` takes in a canvas context (`ctx`), a letter, a metric object, and x,
 * y, and s values, and draws a bounding box around the letter on the canvas.
 */
const drawBoundingBox = ctx => letter => metric => x => y => s => {
    // ctx.setLineDash([6])
    ctx.lineWidth = 4;

    let descenderO = 1.3
    let ascenderO = 1.3

    let h = s*metric.actualBoundingBoxAscent*-1-s*metric.actualBoundingBoxDescent
    if (ascenders.includes(letter) || letter == letter.toUpperCase()) h = -ascenderO*s*metric.actualBoundingBoxAscent
    // else if (descenders.includes(letter)) h = -descenderO*s*(metric.actualBoundingBoxDescent+metric.actualBoundingBoxAscent)
    else if (descenders.includes(letter)) {
        h=-metric.actualBoundingBoxAscent-metric.actualBoundingBoxDescent*descenderO
        y+=metric.actualBoundingBoxDescent*descenderO
        // y+=h-(h*=descenderO)        
    }
    drawBox(ctx)(x)(y)(s*metric.actualBoundingBoxRight)(h)
    // drawBox(ctx)(x-s*metric.actualBoundingBoxLeft)(y)(s*metric.actualBoundingBoxRight)(h)
    // drawBox(ctx)(x)(y)(s*metrics.width)(h)
}

/**
 * The `drawText` function takes a canvas context (`ctx`), a text string (`text`), a step size
 * (`step`), and a maximum x-boundary (`xBound`), and draws the text on the canvas with the specified
 * font size and line breaks.
 */
const drawText = ctx => text => step => xBound => {
    let y = step*2
    let x = 0;


    ctx.font = `${Math.floor(step*1.8)}px Comic Sans MS, Comic Sans, cursive`
    // ctx.font = `${Math.floor(step*1.8)}px Arial, Helvetica`
    // ctx.font = Math.floor(step*1.8)+"px"
    ctx.beginPath()

    let s = 1;
    space = ctx.measureText(' ').width
    text.split('\n').forEach(line => {
        line.split(' ').forEach(word => {
            if (ctx.measureText(word).width + x > xBound) {
                x = 0;
                y+=6*step;
            }
            word.split('').forEach(letter => {
                let metric = ctx.measureText(letter)
                
                // if (x + metric.actualBoundingBoxRight*s > xBound) {
                //     x = 0;
                //     y+=6*step;
                // }
                
                ctx.fillText(letter, x, y);
                drawBoundingBox(ctx)(letter)(metric)(x)(y+3*step)(s)
                // drawBoundingBox(ctx)(letter)(metric)(x)(y+2*step)(Math.floor(step*1.8)/9)
                // x+=metric.actualBoundingBoxRight*Math.floor(step*1.8)/9
                x+=metric.actualBoundingBoxRight
            })
            x+=space;
        })
        x = 0
        y+=6*step
    })
    ctx.stroke()
}

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
  
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
  	ctx.fillStyle = 'white'
  	ctx.fill()
    
    let s = drawPDF(ctx)(9)(18/951)
    drawText(ctx)(text)(s)(canvas.width)


    // var dataUrl = document.getElementById('canvas').toDataURL();
    // document.body.innerHTML = "<img width='21cm' height='29.7cm' style='margin: 1in;' src='" + dataUrl + "'>"
    // document.body.innerHTML += text
    // document.body.innerHTML = "<h1>Testing!!!</h1>"
}

    

const startup = () => {
    window.onbeforeprint = loadContent
    window.onafterprint = () => document.body.innerHTML = prevContent
}
window.addEventListener("load", startup, false);
