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
  offsetY: 60,
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
    let x = i * (brick.w + brick.padding) + brick.offsetX;
    let y = j * (brick.h + brick.padding) + brick.offsetY;
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
      ctx.rect(bricks[i][j].x, bricks[i][j].y, brick.w, brick.h);
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
  // hit bottom and lose game
  if (ball.y + ball.size > canvas.height) {
    lose();
  }
  if (ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // paddle collision
  if (
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.w &&
    ball.y > paddle.y &&
    ball.y < paddle.y + paddle.h
  ) {
    ball.dy *= -1;
    // TODO: other ways to change speed?
  }

  // brick collision
  bricks.forEach((col) => {
    col.forEach((brick) => {
      if (brick.visible) {
        if (ball.x > brick.x && ball.x < brick.x + brick.w) {
          brick.dx *= -1;
          brick.visible = false;
          increaseScore();
        }
        if (ball.y > brick.y && ball.y < brick.y + brick.h) {
          brick.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
}

// increase score
function increaseScore() {
  score++;

  // if win
  if (score === brickCol * brickRow) {
    // hide objects
    ball.visible = false;
    paddle.visible = false;

    // restart game
    setTimeout(() => {
      showAllBricks();
      score = 0;
      paddle.x = canvas.width / 2 - 40;
      paddle.y = canvas.height - 20;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.visible = true;
      paddle.visible = true;
    }, 5000);
  }
}

// make all bricks visible
function showAllBricks() {
  bricks.forEach((col) => {
    col.forEach((brick) => (brick.visible = true));
  });
}

// draw all things
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  // TODO: drawScore();
  drawBricks();
}

// update every time
function update() {
  movePaddle();
  moveBall();
  draw();
}

update();
console.log(111);

// controll rules page
showBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
