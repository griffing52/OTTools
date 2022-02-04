let dict = [[160, 41], [202, 41], [317, 114], [334, 152], [310, 292], [280, 322], [206, 354], [164, 354], [49, 281], [32, 242], [56, 103], [86, 73], [310, 41], [354, 29], [56, 354], [13, 368]]
let balls = [];

const cycle = id => {
    const elm = document.getElementById('outline'+id);
    (elm.selected) ? reset(id) : update(id);
}

const update = id => {
    if (balls.length >= 9) return;
    
    balls.push(id);

    let t = document.getElementById('value' + balls.length)
    t.setAttribute("x", dict[id][0])
    t.setAttribute("y", dict[id][1])
    
    const elm = document.getElementById('outline'+id);
    elm.style.stroke = '#ffcd45';
    elm.style.strokeWidth = '4.0';
    elm.selected = true;
}

const reset = (id, c) => {            
    let t = document.getElementById('value'+(balls.indexOf(id)+1))
    t.setAttribute("x", 1000)
    t.setAttribute("y", 1000)
    
    let temp = []
    // replace with "and" condition
    if (balls.length > balls.indexOf(id)+1) {
        if (!c) {
            // reset greater balls and udpate in order
            for (let i = balls.indexOf(id)+1; balls.length > i; i++) {
                temp.push(balls[i])
            }
            temp.forEach(v => {
                reset(v, true)
            })
            balls = balls.filter(x => x != -1);
        }
    }
    
    const elm = document.getElementById('outline'+id);
    elm.style.stroke = '#d9d9d9';
    elm.style.strokeWidth = '1.0';
    elm.selected = false;
    
    if (c) balls[balls.indexOf(id)] = -1;
    else balls.splice(balls.indexOf(id), 1)
    
    temp.forEach(v => {
        update(v)
    })
}