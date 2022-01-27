for (let i = 0; i < playersPos.length; i++) {
    let p = playersPos[i]
    let xPos = Math.floor((p.pl+p.pr)*0.5);
    let yPos = Math.floor((p.pt+p.pb)*0.5);
    let blockX = Math.floor(xPos / 36);
    let blockY = Math.floor((yPos - disp.height) / 36)-23;
    console.log(`(${blockX}, ${blockY})`)
    for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
            ws.send(`build|${blockY+y}|${blockX+x}|7|${sid}`);
        }
    }
}