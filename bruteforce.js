const getCharCode = num => (num === 31) ? "" : num;

var current = "";
var vals = [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31]

const save = str => {
    const a = document.createElement('a')
    a.download = "password.txt";
    a.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(str)
    a.click()
}

const run = a => b => c => d => e => f => g => h => i => j => k => l => m => n => o => p => q => r => s => t => {
    current = String.fromCharCode(getCharCode(a), getCharCode(b), getCharCode(c), getCharCode(d), getCharCode(e), getCharCode(f), getCharCode(g), getCharCode(h), getCharCode(i), getCharCode(j), getCharCode(k), getCharCode(l), getCharCode(m), getCharCode(n), getCharCode(o), getCharCode(p), getCharCode(q), getCharCode(r), getCharCode(s), getCharCode(t))
    socket.emit('tryauth', current);
}

// TODO range 31-127

socket.on('authreturn', success => {
    if (success) save(current)
    else run()
})

run(vals[0])(vals[1])(vals[2])(vals[3])(vals[4])(vals[5])(vals[6])(vals[7])(vals[8])(vals[9])(vals[10])(vals[11])(vals[12])(vals[13])(vals[14])(vals[15])(vals[16])(vals[17])(vals[18])(vals[19])