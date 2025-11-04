// get elements
const showBtn = document.getElementById("show-button");
const closeBtn = document.getElementById("close-button");
const rules = document.getElementById("rules");
// should get canvas before using it
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// game counts
let score = 0;
const brickRow = 9;
const brickCol = 5;

// struct ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  visible: true,
};

// struct brick
const brick = {
  w: 70,
  h: 20,
  offsetX: 45, // start position
  offsetY: 20,
  padding: 10,
  visible: true,
};

// struct paddle
const paddle = {
  x: canvas.width / 2, // start position
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 4,
  visible: true,
};

// create bricks
const bricks = [];
for (let i = 0; i < brickRow; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickCol; j++) {
    const x = i * (brick.w + brick.padding) + offsetX;
    const y = j * (brick.h + brick.padding) + offsetY;
    bricks[i][j] = { x, y, ...brick };
  }
}

// draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); // x y r start-angle end-angle
  ctx.fillStyle = ball.visible ? "#0095dd" : transparent;
  ctx.fill();
  ctx.closePath();
}

// draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ? "#0095dd" : transparent;
  ctx.fill();
  ctx.closePath();
}

// draw bricks
function drawBricks() {
  for (let i = 0; i < brickRow; i++) {
    for (let j = 0; j < brickCol; j++) {
      ctx.beginPath();
      ctx.rect(bricks[i][j].x, bricks[i][j].x, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : transparent;
      ctx.fill();
      ctx.closePath();
    }
  }
}

// move paddle
function movePaddle() {
  paddle.x += paddle.dx;
  // should move within border
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  // detect border
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // move the opposite way
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    // TODO: collide bottom should end game
    ball.dy *= -1;
  }

  // paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y - ball.size < paddle.y
  ) {
    ball.dy *= -1;
    // TODO: other ways to change speed?
  }
}

// controll rules page
showBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
