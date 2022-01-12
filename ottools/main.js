let prevContent = document.body.innerHTML
// let newContent
window.addEventListener('beforeprint', () => {
    
})
window.addEventListener('afterprint', () => {
    document.body.innerHTML = prevContent;
})