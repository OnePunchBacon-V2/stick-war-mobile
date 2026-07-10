# Game Design Document - Stick War Legacy Mobile

## 1. Overview

Stick War Legacy Mobile is a tower defense strategy game where players control an army of stick figures to protect their statue and destroy the enemy's statue. The game features real-time strategy mechanics with direct unit control options.

## 2. Core Gameplay Loop

1. **Spawn Phase**: Player spends gold to spawn units
2. **Control Phase**: Units move toward enemy statue autonomously or player-controlled
3. **Combat Phase**: Units engage in combat using AI behavior or direct control
4. **Economy Phase**: Miners generate gold passively
5. **End Phase**: Check win/lose conditions

## 3. Unit Balance

### Swordwrath
- Role: Cheap, fast attacker
- Counters: Ranged units, spearton
- Weak to: Magikill, giant

### Archidon
- Role: Ranged DPS
- Counters: Swordwrath, melee units
- Weak to: Spearton, anything close

### Spearton
- Role: Tank with defense
- Counters: Swordwrath, archidon
- Weak to: Magikill, multiple units

### Magikill
- Role: Support with crowd control
- Counters: Large groups
- Weak to: Spearton, fast units

### Giant
- Role: Ultra tank with AoE
- Counters: Everything in melee
- Weak to: Kiting, mages

### Miner
- Role: Economy generator
- Counters: None (support only)
- Weak to: Everything (fragile)

## 4. Progression

- Campaign: 5+ levels per tribe × 4 tribes = 20+ levels
- Endless mode: Survive as long as possible
- Difficulty: Easy → Normal → Hard → Insane

## 5. Mobile Optimization

- 16:9 aspect ratio enforced via CSS
- Touch targets minimum 44×44pt (iOS) / 48×48dp (Android)
- Fullscreen + landscape orientation lock
- Portrait mode fallback overlay
- ResizeObserver for responsive canvas
- Device pixel ratio for crisp rendering

## 6. Performance Targets

- 60 FPS target
- < 50MB bundle size
- < 100ms load time (cached)
- < 50ms frame time (target device: iPhone XS / Galaxy S10)

## 7. Accessibility

- High contrast UI
- Clear button labels
- Minimum 44pt touch targets
- Colorblind-safe palette
- Reduced motion support
- Text scaling support

## 8. Controls

### Desktop
- Click to select unit
- Unit buttons to spawn
- P/ESC to pause

### Mobile
- Tap to select unit
- Tap buttons to spawn
- Pause button (top left)
- Responsive sizing

## 9. Initialization Order (No Startup Bugs)

1. Canvas setup & ResizeObserver
2. Audio context init
3. Game assets load
4. Game engine instantiate
5. Scene manager init
6. Event listeners attach
7. Game loop start (requestAnimationFrame)
8. Fullscreen/orientation (on user gesture only)

## 10. Future Enhancements

- Procedurally generated maps
- Unit customization
- Upgrade trees
- Leaderboards
- Achievements
- Sound effects toggle
- Language localization
