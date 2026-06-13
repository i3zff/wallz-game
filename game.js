// Game Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game Variables
let score = 0;
let highScore = localStorage.getItem('wallzHighScore') || 0;
let gameRunning = false;
let gamePaused = false;

// Player
const player = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    width: 30,
    height: 30,
    speed: 5,
    color: '#4CAF50'
};

// Walls (Obstacles)
let walls = [];

// Collectibles
let collectibles = [];

// Particles for effects
let particles = [];

// Game Objects
class Wall {
    constructor() {
        this.width = 40 + Math.random() * 60;
        this.height = 20 + Math.random() * 40;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        this.speed = 2 + Math.random() * 3;
        this.color = '#FF6B6B';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }

    isOffScreen() {
        return this.y > canvas.height;
    }
}

class Collectible {
    constructor() {
        this.radius = 10;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = -this.radius;
        this.speed = 1.5 + Math.random() * 2;
        this.color = '#FFD700';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    update() {
        this.y += this.speed;
    }

    isOffScreen() {
        return this.y > canvas.height;
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.02;
        this.size = Math.random() * 5 + 3;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // gravity
        this.life -= this.decay;
    }

    isDead() {
        return this.life <= 0;
    }
}

// Keyboard Controls
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mouse movement for player
document.addEventListener('mousemove', (e) => {
    if (!gameRunning || gamePaused) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    if (mouseX > 0 && mouseX < canvas.width) {
        player.x = mouseX - player.width / 2;
    }
});

// Touch controls for mobile
canvas.addEventListener('touchmove', (e) => {
    if (!gameRunning || gamePaused) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    if (touchX > 0 && touchX < canvas.width) {
        player.x = touchX - player.width / 2;
    }
});

// Update Player Position
function updatePlayer() {
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        player.x += player.speed;
    }

    // Boundary collision
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

// Draw Player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw eyes
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x + 5, player.y + 5, 8, 8);
    ctx.fillRect(player.x + 17, player.y + 5, 8, 8);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x + 7, player.y + 7, 4, 4);
    ctx.fillRect(player.x + 19, player.y + 7, 4, 4);
}

// Collision Detection
function checkCollisions() {
    // Check wall collisions
    for (let i = walls.length - 1; i >= 0; i--) {
        const wall = walls[i];
        if (
            player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y
        ) {
            endGame();
            return;
        }
    }

    // Check collectible collisions
    for (let i = collectibles.length - 1; i >= 0; i--) {
        const collectible = collectibles[i];
        const distance = Math.hypot(
            collectible.x - (player.x + player.width / 2),
            collectible.y - (player.y + player.height / 2)
        );

        if (distance < collectible.radius + player.width / 2) {
            score += 10;
            createParticles(player.x + player.width / 2, player.y + player.height / 2, '#FFD700', 10);
            collectibles.splice(i, 1);
        }
    }
}

// Create Particles
function createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Update Game
function update() {
    if (!gameRunning || gamePaused) return;

    updatePlayer();
    
    // Update walls
    for (let i = walls.length - 1; i >= 0; i--) {
        walls[i].update();
        if (walls[i].isOffScreen()) {
            walls.splice(i, 1);
        }
    }

    // Update collectibles
    for (let i = collectibles.length - 1; i >= 0; i--) {
        collectibles[i].update();
        if (collectibles[i].isOffScreen()) {
            collectibles.splice(i, 1);
        }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }

    checkCollisions();

    // Update score display
    document.getElementById('score').textContent = score;

    // Spawn new obstacles
    if (Math.random() < 0.02) {
        walls.push(new Wall());
    }

    // Spawn collectibles
    if (Math.random() < 0.01) {
        collectibles.push(new Collectible());
    }
}

// Draw Game
function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgba(135, 206, 235, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    walls.forEach(wall => wall.draw());

    // Draw collectibles
    collectibles.forEach(collectible => collectible.draw());

    // Draw particles
    particles.forEach(particle => particle.draw());

    // Draw player
    drawPlayer();

    // Draw score in corner
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`Level: ${Math.floor(score / 100)}`, 10, 25);
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start Game
function startGame() {
    gameRunning = true;
    gamePaused = false;
    score = 0;
    walls = [];
    collectibles = [];
    particles = [];
    player.x = canvas.width / 2;
    player.y = canvas.height - 40;

    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('resumeBtn').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';

    gameLoop();
}

// End Game
function endGame() {
    gameRunning = false;
    gamePaused = false;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('wallzHighScore', highScore);
        document.getElementById('highScore').textContent = highScore;
    }

    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'flex';
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('resumeBtn').style.display = 'none';
}

// Pause Game
function pauseGame() {
    gamePaused = true;
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('resumeBtn').style.display = 'inline-block';
}

// Resume Game
function resumeGame() {
    gamePaused = false;
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('resumeBtn').style.display = 'none';
    gameLoop();
}

// Event Listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('resumeBtn').addEventListener('click', resumeGame);
document.getElementById('restartBtn').addEventListener('click', startGame);

// Display high score on load
document.getElementById('highScore').textContent = highScore;

// Initial draw
draw();