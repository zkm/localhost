const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const binary = "01".split("");

let columns = canvas.width / 15;
let drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00FF41";
  ctx.font = "15px Arial";
  for (let i = 0; i < drops.length; i++) {
    let text = binary[Math.floor(Math.random() * binary.length)];
    ctx.fillText(text, i * 15, drops[i] * 15);

    if (drops[i] * 15 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 90);
