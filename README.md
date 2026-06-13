# 🧱 Wallz.gg - Wall Game

A fun and addictive wall-dodging game built with vanilla JavaScript, HTML5 Canvas, and CSS3.

## 🎮 Game Features

- **Dodge the Walls**: Avoid falling red obstacles
- **Collect Bonuses**: Pick up golden collectibles to increase your score
- **Progressive Difficulty**: The game gets harder as your score increases
- **High Score Tracking**: Your best score is saved locally
- **Smooth Controls**: Use arrow keys, WASD, or mouse/touch to move
- **Particle Effects**: Visual feedback when collecting items
- **Responsive Design**: Works on desktop and mobile devices

## 🕹️ How to Play

1. Click **"Start Game"** to begin
2. Move your green character left and right to avoid red walls
3. Collect golden blocks to earn points (10 points each)
4. Don't hit any red walls or it's game over!
5. Try to beat your high score!

### Controls
- **Desktop**: 
  - Arrow Keys (← →)
  - WASD Keys (A/D)
  - Mouse movement
- **Mobile**: 
  - Touch and drag

## 📂 Project Structure

```
wallz-game/
├── index.html       # Main HTML file
├── styles.css       # Game styling
├── game.js          # Game logic and mechanics
├── package.json     # Project metadata
└── README.md        # This file
```

## 🚀 How to Run Locally

### Option 1: Python
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

### Option 2: Node.js (http-server)
```bash
npx http-server
```

### Option 3: Live Server (VS Code)
Install "Live Server" extension and click "Go Live"

## 🌐 Deploy to Hostinger

### Step 1: Create a hosting account on Hostinger
Visit [hostinger.com](https://hostinger.com) and create an account

### Step 2: Upload files via FTP
1. Download an FTP client (Filezilla)
2. Connect using Hostinger FTP credentials
3. Upload all files to the public_html folder

### Step 3: Access your game
Visit your domain: `your-domain.com`

## 🎨 Game Objects

### Player (Green Square)
- Controlled by the player
- Collides with walls to end the game
- Collects golden blocks for points

### Walls (Red Obstacles)
- Randomly generated and fall from the top
- Varying sizes and speeds
- Game ends on collision

### Collectibles (Golden Blocks)
- Worth 10 points each
- Randomly spawned
- Create particle effects when collected

## 📊 Score System

- **Base Points**: 10 points per collectible
- **Level**: Calculated as `Math.floor(score / 100)`
- **High Score**: Automatically saved in browser storage

## 🔧 Customization

Edit these values in `game.js` to customize:

```javascript
// Player speed
player.speed = 5;

// Spawn rates
if (Math.random() < 0.02) { // Wall spawn rate
if (Math.random() < 0.01) { // Collectible spawn rate

// Collectible points
score += 10; // Change to adjust points per item
```

## 🛠️ Technologies Used

- **HTML5**: Game canvas and structure
- **CSS3**: Modern styling and animations
- **JavaScript ES6**: Game logic and interactivity
- **Canvas API**: Graphics rendering

## 📱 Browser Compatibility

- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## 💡 Future Features

- [ ] Sound effects and music
- [ ] Multiple difficulty levels
- [ ] Power-ups
- [ ] Multiplayer mode
- [ ] Leaderboard system
- [ ] Mobile app version

## 📝 License

MIT License - Feel free to use and modify!

## 👨‍💻 Author

Created by **i3zff**

## 🤝 Contributing

Feel free to fork, modify, and share improvements!

---

**Enjoy the game! 🎮**