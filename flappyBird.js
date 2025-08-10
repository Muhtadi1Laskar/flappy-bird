let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();










bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

let gap = 80;
let constantGap = pipeNorth.height + gap;
let bX = 10;
let bY = 150;
let gravity = 1.5;
let score = 0;

document.addEventListener("keydown", () => {
    bY -= 25;
})

let pipe = [];
pipe[0] = {
    x: canvas.clientWidth,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constantGap);

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: canvas.clientWidth,
                y: Math.floor(Math.random() * pipeNorth.height - pipeNorth.height)
            })
        }
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constantGap) || bY + bird.height >= canvas.height - fg.height) {
            location.reload();
        }

        if (pipe[i].x === 5) {
            score++;
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, bX, bY);


    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw()
