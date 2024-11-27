const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Ustawienie rozmiaru płótna
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Elementy interfejsu
const scoreDisplay = document.getElementById("score");
const livesContainer = document.getElementById("lives");
const aim = document.getElementById("aim");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const gameMusic = document.getElementById("game-music");

// Zmienne gry
let score = 0;
let lives = 3;
let zombies = [];
let gameRunning = true;

// Załadowanie sprite sheet z animacją zombi
const zombieImage = new Image();
zombieImage.src = "icons/walkingdead.png"; // Sprite sheet z animacją zombi

// Funkcja aktualizująca wyświetlanie żyć
function updateLivesDisplay() {
  livesContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement("img");
    heart.src = i < lives ? "icons/full_heart.png" : "icons/empty_heart.png";
    livesContainer.appendChild(heart);
  }
}
updateLivesDisplay();

// Klasa Zombie
class Zombie {
  constructor() {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - 128); // Zombie pojawia się losowo na wysokości
    this.size = Math.random() * 100 + 100; 
    this.speed = Math.random()*5+1; // Stała prędkość

    // Animacja
    this.frame = 0; // Obecna klatka animacji
    this.frameCount = 10; // Liczba klatek w sprite sheet
    this.frameWidth = 200; // Szerokość jednej klatki
    this.frameHeight = 312; // Wysokość jednej klatki
    this.animationSpeed = 100;
    this.lastFrameTime = Date.now(); 
    
  }

  draw() {
    const now = Date.now();
  
    // Sprawdź, czy minął czas na zmianę klatki
    if (now - this.lastFrameTime > this.animationSpeed) {
      this.frame = (this.frame + 1) % this.frameCount; // Przejdź do następnej klatki
      this.lastFrameTime = now; // Zaktualizuj czas ostatniej klatki
    }
  
    // Rysowanie odpowiedniej klatki
    ctx.drawImage(
      zombieImage,
      this.frame * this.frameWidth, // Pozycja klatki w sprite sheet
      0, // Zakładamy jeden rząd
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

// Funkcja tworząca nowego zombie
function spawnZombie() {
  if (gameRunning) {
    zombies.push(new Zombie());
    setTimeout(spawnZombie, Math.random() * 200 + 1500);
  }
   
}

// Funkcja sprawdzająca kolizję myszy z zombie
function checkCollision(x, y, zombie) {
  return (
    x > zombie.x &&
    x < zombie.x + zombie.size &&
    y > zombie.y &&
    y < zombie.y + zombie.size
  );
}

// Pętla gry
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Wyczyść płótno

  zombies.forEach((zombie, index) => {
    zombie.update();
    zombie.draw();

    // Sprawdzenie, czy zombie wyszedł poza ekran
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

// Obsługa kliknięcia w płótno
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
    score = Math.max(0, score - 5); // Wynik nie może spaść poniżej 0
  }

  scoreDisplay.textContent = `Wynik: ${score.toString().padStart(5, "0")}`;
});

// Funkcja kończąca grę
function endGame() {
  gameRunning = false;
  document.body.style.backgroundColor = "black"; // Zmiana tła
  gameMusic.play();
  setTimeout(() => {
    gameOverScreen.classList.remove("hidden");
    finalScore.textContent = score;
  }, 1000); // 1-sekundowe opóźnienie
}

// Obsługa restartu gry
restartButton.addEventListener("click", () => {
  location.reload();
});

// Obsługa ruchu celownika
document.addEventListener("mousemove", (e) => {
  aim.style.left = `${e.clientX}px`;
  aim.style.top = `${e.clientY}px`;
});

// Dostosowanie rozmiaru płótna przy zmianie rozmiaru okna
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Rozpoczęcie gry
spawnZombie();
gameLoop();
