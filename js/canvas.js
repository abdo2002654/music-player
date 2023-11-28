const random = {
  number: (min, max) => {
    return Math.random() * (max - min) + min; 
  },
  integer: (min, max) => {
    let randomized = Math.random() * (max - min) + min;
    if(randomized%1 > .5) return Math.ceil(randomized);
    if(randomized%1 < .5) return Math.floor(randomized);
  },
  item: (array) => {
    let randomized = Math.random() * (array.length);
    return array[Math.floor(randomized)];
  },
  distance: (x1, y1, x2, y2) => {
    let x = Math.pow(x1 - x2);
    let y = Math.pow(y1 - y2);
  }
}


let canvas = document.querySelector("#canvas");



canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");

ctx.arc(0, 0, 500, 0, Math.PI * 2);

class Circle {
  constructor(x, y, velocity, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
  }
  draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update = () => {
    if(this.x < this.radius) this.velocity.x = -this.velocity.x;
    if(this.y < this.radius) this.velocity.y = -this.velocity.y;
    if(this.x > canvas.width - this.radius) this.velocity.x = -this.velocity.x;
    if(this.y > canvas.height - this.radius) this.velocity.y = -this.velocity.y;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

let circles = [];
for(let i = 0;i<=100;i++) {
  
  let radius = random.number(1, 3);
  let x = random.number(radius, canvas.width - radius);
  let y = random.number(radius, canvas.height - radius);
  let dx = random.number(-2, 2);
  let dy = random.number(-2, 2);
  let color = `hsl(${random.integer(0, 255)}, 50%, 50%)`

  circles[i] = new Circle(x, y, {x: dx, y: dy}, radius, color);
}

function animate() {
  requestAnimationFrame(animate)
  ctx.fillStyle = "#3335"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for(let i of circles) {
    i.update();
  }
}

animate();