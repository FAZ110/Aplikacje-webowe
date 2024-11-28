const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const scoreDisplay = document.getElementById("score");
const livesContainer = document.getElementById("lives");
const aim = document.getElementById("aim");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const gameMusic = document.getElementById("game-music");


let score = 0;
let lives = 3;
let zombies = [];
let gameRunning = true;


const zombieImage = new Image();
zombieImage.src = "icons/walkingdead.png"; 


function updateLivesDisplay() {
  livesContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement("img");
    heart.src = i < lives ? "icons/full_heart.png" : "icons/empty_heart.png";
    livesContainer.appendChild(heart);
  }
}
updateLivesDisplay();


class Zombie {
  constructor() {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - 128); 
    this.size = Math.random() * 100 + 100; 
    this.speed = Math.random()*5+1; 

   
    this.frame = 0; 
    this.frameCount = 10; 
    this.frameWidth = 200; 
    this.frameHeight = 312; 
    this.animationSpeed = 100;
    this.lastFrameTime = Date.now(); 
    
  }

  draw() {
    const now = Date.now();
  
    
    if (now - this.lastFrameTime > this.animationSpeed) {
      this.frame = (this.frame + 1) % this.frameCount; 
      this.lastFrameTime = now; 
    }
  
    
    ctx.drawImage(
      zombieImage,
      this.frame * this.frameWidth, 
      0, 
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }
  

  update() {
    this.x -= this.speed;
  }
}


function spawnZombie() {
  if (gameRunning) {
    zombies.push(new Zombie());
    setTimeout(spawnZombie, Math.random() * 200 + 1500);
  }
   
}


function checkCollision(x, y, zombie) {
  return (
    x > zombie.x &&
    x < zombie.x + zombie.size &&
    y > zombie.y &&
    y < zombie.y + zombie.size
  );
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  zombies.forEach((zombie, index) => {
    zombie.update();
    zombie.draw();

    
    if (zombie.x < -zombie.size) {
      lives--;
      updateLivesDisplay();
      zombies.splice(index, 1);
      if (lives <= 0) {
        endGame();
      }
    }
  });

  if (gameRunning) {
    requestAnimationFrame(gameLoop);
  }
}


canvas.addEventListener("click", (e) => {
  if (!gameRunning) return;

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  let zombieHit = false;

  zombies.forEach((zombie, index) => {
    if (checkCollision(mouseX, mouseY, zombie)) {
      score += 20;
      zombieHit = true;
      zombies.splice(index, 1);
    }
  });

  if (!zombieHit) {
    score = Math.max(0, score - 5); 
  }

  scoreDisplay.textContent = `Wynik: ${score.toString().padStart(5, "0")}`;
});


function endGame() {
  gameRunning = false;
  document.body.style.backgroundColor = "black"; 
  gameMusic.play();
  setTimeout(() => {
    gameOverScreen.classList.remove("hidden");
    finalScore.textContent = score;
  }, 1000); 
}


restartButton.addEventListener("click", () => {
  location.reload();
});


document.addEventListener("mousemove", (e) => {
  aim.style.left = `${e.clientX}px`;
  aim.style.top = `${e.clientY}px`;
});


window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


spawnZombie();
gameLoop();
