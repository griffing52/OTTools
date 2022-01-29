let balls = []

const cycle = id => {
    const elm = document.getElementById('outline'+id);
    (elm.selected) ? reset(elm) : update(elm);
}

const update = elm => {
    elm.style.stroke = '#ffcd45';
    elm.style.strokeWidth = '4.0';
    elm.selected = true;
}

const reset = elm => {
    elm.style.stroke = '#d9d9d9';
    elm.style.strokeWidth = '1.0';
    elm.selected = false;
}