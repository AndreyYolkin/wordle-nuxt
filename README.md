# Wordle Game - Nuxt Edition

A modern Wordle game clone built with Nuxt 4, Vue 3, and TypeScript. Features a daily word puzzle with keyboard support and responsive design.

## 🎮 Features

- **Daily Word Puzzle**: New word every day based on Warsaw timezone
- **Keyboard Support**: Type on your physical keyboard or use the on-screen keyboard
- **Responsive Design**: Works on desktop and mobile devices
- **Game State Tracking**: Win/loss detection with visual feedback
- **Russian Language**: Localized for Russian-speaking users
- **UnoCSS**: Utility-first CSS styling

## 🚀 Quick Start

### Prerequisites

- Node.js >= 22
- pnpm >= 9

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Play

1. **Guess the Word**: Try to guess the 5-letter word
2. **Color Feedback**:
   - 🟩 Green: Letter is correct and in the right position
   - 🟨 Yellow: Letter is in the word but wrong position
   - ⬜ Gray: Letter is not in the word
3. **6 Attempts**: You have 6 tries to guess the word
4. **Daily Challenge**: New word available every day at midnight Warsaw time

### Controls

- **Type**: Use your keyboard to enter letters
- **Enter**: Submit your guess
- **Backspace**: Delete the last letter

## 🛠️ Development

### Project Structure

```
app/
  components/     # Vue components
    WordleGame.vue    # Main game component
    WordleGrid.vue    # Game grid display
    WordleKeyboard.vue # Virtual keyboard
    WordleCell.vue    # Individual cell component
    KeyboardKey.vue   # Keyboard key component
  composables/
    useWordleGame.ts  # Game logic composable
  pages/
    index.vue         # Home page
  utils/
    keyboardUtils.ts  # Keyboard utilities

shared/
  constants/          # Game constants
  data/               # Word data
  types/              # TypeScript types
  utils/              # Utility functions
    guess.ts          # Guess evaluation
    timezone.ts       # Timezone handling
    word.ts           # Word utilities
```

### Build Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Generate static site
pnpm generate
```

## 🎨 Styling

This project uses [UnoCSS](https://unocss.dev/) for utility-first CSS styling. The configuration can be found in `uno.config.ts`.

## 📦 Dependencies

### Core
- **Nuxt 4**: Next-gen Vue framework
- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type safety
- **UnoCSS**: Utility-first CSS framework

### Utilities
- **Luxon**: Date/time manipulation
- **Vue Sonner**: Toast notifications

## 🌐 Deployment

### Static Deployment (Recommended)

```bash
pnpm generate
pnpm preview
```

### Server Deployment

```bash
pnpm build
pnpm preview
```

Deploy the `.output` directory to your preferred hosting platform.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
