# DotCLicker - A Small Click Dot Game

DotCLicker is a simple game where players need to click on dots that appear on the screen within a limited time. The goal is to click the dots in the correct order and complete the task within the given time. The game includes features like auto-click and countdown, making it more engaging.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Key Hooks](#keyhooks)

## Features
- **Click on Dots**: Players can click on dots in sequence to complete the task.
- **Countdown Timer**: Each dot will disappear when the countdown reaches zero.
- **Auto-click Mode**: Activate the auto-click feature to automatically click dots in sequence.
- **Dynamic Updates**: The game can reset and restart without reloading the page.
- **Result Notification**: Displays a message when the game is over or the player completes the task.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/Phamphhoang/dot-clicker.git
```

#### 2. Navigate to the project directory:

```bash
cd dot-clicker
```

#### 3. Install dependencies

```bash
npm install
```

## Usage
#### 1. Start the Development Server:

```bash
npm run dev
```

#### 2. Open the app in your browser at http://localhost:5173/.

## Project Structure

```bash
src
├── components
│   ├── GameBoard.tsx
│   ├── Dot.tsx
│   └── GroupHeader.tsx
├── hooks
│   ├── useDots.ts
│   ├── useGameLogic.ts
│   └── useTimer.ts
└── types
    └── IDot.ts
```

## Components

- **GameBoard**: The main component that manages game logic and UI.
- **Dot**: Represents each clickable dot, featuring a countdown timer.
- **GroupHeader**: The header component that contains control buttons for starting, pausing, resetting, and auto-clicking.

## Key Hooks

- **useDots**: Manages the dot generation and updating count logic.
- **useGameLogic**: Handles the game logic, including click events and game state.
- **useTimer**: Manages the countdown timer functionality.




