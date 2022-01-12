let prevContent;

const descenders = "gjpqy"
const ascenders = "bdfhiklt!@#$%&(){}[]?/;:|\\"

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

const drawBoundingBox = ctx => letter => metric => x => y => {
    let h = metric.actualBoundingBoxAscent*-1-metric.actualBoundingBoxDescent
    if (ascenders.includes(letter)) h = -1*metric.actualBoundingBoxAscent
    else if (descenders.includes(letter)) h = metric.actualBoundingBoxDescent
    drawBox(ctx)(x)(y)(metric.actualBoundingBoxRight)(h)
}

const drawText = ctx => text => step => {
    let words = text.split(' ')
    let y = step*2
    let x = 0;

    ctx.fontSize = Math.floor(step*1.8)+"px"
    ctx.beginPath()
    words.forEach(word => {
        let letters = word.split('')
        letters.forEach(letter => {
            let metric = ctx.measureText(letter)
            drawBoundingBox(ctx)(letter)(metric)(x)(y)
            x+=metric.actualBoundingBoxRight
        })
    })
    ctx.stroke()
}

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
    drawText(ctx)(text)(s)


    // var dataUrl = document.getElementById('canvas').toDataURL();
    // document.body.innerHTML = "<img width='21cm' height='29.7cm' style='margin: 1in;' src='" + dataUrl + "'>"
    // document.body.innerHTML += text
    // document.body.innerHTML = "<h1>Testing!!!</h1>"
}

window.onbeforeprint = loadContent
window.onafterprint = () => document.body.innerHTML = prevContent