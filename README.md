# Stick War Legacy Mobile - React TypeScript

> A fully responsive mobile web game based on Stick War Legacy with tower defense mechanics, unit management, and strategic gameplay.

## 🎮 Features

### Game Mechanics
- **6 Unique Unit Types**
  - Swordwrath (150g) - Fast melee fighter
  - Archidon (300g) - Ranged archer
  - Spearton (500g) - Tank with shield
  - Magikill (1200g) - Mage with minion summoning
  - Giant (1500g) - Ultra tank (1050 HP, 60 DMG)
  - Miner (150g) - Economy unit

- **Tower Defense Core**
  - Protect your statue while destroying enemy's
  - Dynamic unit AI with pathfinding and targeting
  - Real-time physics and collision detection

- **Economy System**
  - Gold generation through miners
  - Unit spawning and upgrades
  - Resource management gameplay

- **Spell System** (Coming Soon)
  - Heal, Freeze, Bomb, Rage, Poison
  - Cooldown-based activation
  - Strategic spell management

### Mobile Features
- ✅ **16:9 Responsive Design** - Perfect aspect ratio on all devices
- ✅ **Fullscreen API** - Immersive gameplay
- ✅ **Orientation Lock** - Landscape mode forced
- ✅ **Portrait Fallback** - Overlay blocking for portrait mode
- ✅ **Touch Controls** - 44-48pt minimum button sizes
- ✅ **ResizeObserver** - Dynamic canvas scaling
- ✅ **Device Pixel Ratio** - Crisp rendering on all screens

### Visual Features
- Stick figure sprite animations
- Real-time canvas rendering
- Smooth particle effects
- Health bars and status indicators
- Professional UI with animations

### Audio
- Procedurally generated sound effects (no copyright)
- Unit attack sounds
- Spell cast sounds
- Menu feedback
- Web Audio API based

## 🚀 Quick Start

### Installation
```bash
git clone https://github.com/OnePunchBacon-V2/stick-war-mobile.git
cd stick-war-mobile
npm install
```

### Development
```bash
npm start
```
Opens at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Optimized build in `build/` folder

## 📁 Project Structure

```
src/
├── types/
│   ├── constants.ts       # Game configs and unit stats
│   ├── game.types.ts      # Core game type definitions
│   └── ui.types.ts        # UI component types
├── entities/
│   ├── BaseUnit.ts        # Base unit class with AI
│   ├── units/             # Individual unit implementations
│   ├── Statue.ts          # Player/enemy bases
│   ├── Projectile.ts      # Projectiles and spells
│   ├── Particle.ts        # Visual effects
│   └── UnitFactory.ts     # Unit creation factory
├── game/
│   ├── GameEngine.ts      # Main game loop
│   ├── Renderer.ts        # Canvas rendering
│   ├── Physics.ts         # Collision detection
│   ├── InputManager.ts    # Input handling
│   └── AudioManager.ts    # Sound effects
├── ui/
│   ├── components/        # Reusable UI components
│   └── scenes/            # Game scenes (Menu, Game, GameOver)
├── utils/
│   ├── math.ts            # Vector and collision math
│   ├── animation.ts       # Animation system
│   └── responsive.ts      # Mobile responsiveness
├── assets/                # Game assets (sprites, sounds)
└── App.tsx                # Main React component
```

## 🎯 Game Controls

### Desktop
- **Mouse**: Click to select units
- **Click Units**: Bottom right panel to spawn units
- **ESC/P**: Pause/resume

### Mobile
- **Tap**: Select units
- **Tap Unit Buttons**: Spawn units (bottom right)
- **Pause Button**: Top left corner

## 📊 Unit Stats

| Unit | Cost | HP | DMG | Speed | Range | Special |
|------|------|----|----|-------|-------|----------|
| Swordwrath | 150g | 100 | 15 | Fast | Melee | Basic attacker |
| Archidon | 300g | 80 | 22 | Fast | Long | Ranged, kiting |
| Spearton | 500g | 400 | 35 | Slow | Melee | Shield, block |
| Magikill | 1200g | 200 | 40 | Slow | Long | Minions, magic |
| Giant | 1500g | 1050 | 60 | Slow | Melee | AoE stomp |
| Miner | 150g | 100 | 5 | Slow | Melee | Gold production |

## 🔧 Technical Stack

- **Frontend**: React 18 + TypeScript
- **Rendering**: HTML5 Canvas (2D)
- **Input**: Native Mouse + Touch events
- **Audio**: Web Audio API (procedural)
- **Build**: Create React App
- **Mobile**: Fullscreen API + Screen Orientation API

## 🎨 Art Style

- Minimalist black stick figures
- Flat 2D design
- High-contrast UI
- Smooth animations
- Particle effects for impacts

## ⚙️ Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

## 🐛 Known Issues

- Orientation lock not supported on iOS Safari (uses overlay fallback)
- Fullscreen not supported on some older Android devices
- Performance on extremely old devices may vary

## 🚧 Roadmap

- [ ] Campaign mode with multiple levels
- [ ] Spell system implementation
- [ ] Advanced AI strategies
- [ ] Multiplayer (local)
- [ ] Settings/customization panel
- [ ] Sound settings (volume control)
- [ ] Pause menu improvements
- [ ] Tutorial system

## 📝 License

This is a fan-made recreation of Stick War Legacy for educational purposes.

## 👨‍💻 Developer

Built by Claude (Anthropic) - July 2026

---

**Enjoy the game! 🎮**
