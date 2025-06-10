# 🌍 Emoji Riddle Quiz – Guess the Country

Welcome to the **Emoji Riddle Quiz**, a fun and interactive single-page JavaScript game 
that challenges players to guess countries based on creative emoji-style riddles. 
This project blends logic, emoji pattern recognition, 
and a user-friendly design to deliver an engaging experience.

## Introduction 

## 📖 Table of Contents  
- [📌 Project Overview](#-project-overview)  
- [🎨 UX/UI Design](#-uxui-design)  
  - [🛠️ User Stories](#-user-stories)  
  - [🎨 Colours](#-colours)  
  - [🔠 Fonts](#-fonts)  
  - [📐 Wireframes](#-wireframes)  
  - [🖼️ Imagery](#-imagery)  
- [🎮 Features](#-features)  
- [🚀 How to Play](#-how-to-play)  
- [🛠️ Technologies Used](#-technologies-used)  
- [🗂️ Project Structure](#-project-structure)  
- [📦 Setup Instructions](#-setup-instructions)  
- [🔍 Example Riddle](#-example-riddle)  
- [Game Rules](#game-rules)  
- [Contributing](#contributing)  
- [✨ Future Enhancements](#-future-enhancements)  
- [✅ Core Features](#-core-features)  
- [⚙️ Development & Tech Stack](#-development--tech-stack)  
- [🛠️ Bug Prevention & Optimization](#-bug-prevention--optimization)  
- [📌 Future Features (Optional Enhancements)](#-future-features-optional-enhancements)  
- [📂 Project Structure Overview](#-project-structure-overview)  
- [🛠️ Setup & Installation Instructions](#-setup--installation-instructions)  
- [📄 License](#-license)

---

## 📌 Project Overview  
**🎯 Objectives:**  
- Build a professional one-page interactive game using HTML, CSS, and JavaScript  
- Incorporate user experience (UX), accessibility, responsive design, and Web API integrations  
- Utilize Firebase for real-time score tracking  
- Include Speech Recognition API for voice input answers  

---

## 🎨 UX/UI Design  

### 🛠️ User Stories  
**As a user, I want to:**  
✅ See emojis clearly and guess countries from them  
✅ Enter or speak my guess  
✅ Get instant feedback and score updates  
✅ Change languages by clicking flags  
✅ Access "How to Play" instructions at any time  
✅ Track remaining time with visual countdown  
✅ Enjoy responsive design across all devices  
✅ Experience smooth animations and transitions  

### 🎨 Colours  
| Colour  | Hex Code | Usage |
|---------|----------|--------|
| 💙 Electric Blue | `#1E90FF` | Main buttons and links |
| 💛 Lemon Yellow | `#FFF44F` | Highlights and backgrounds |
| ⚪ White | `#FFFFFF` | Card backgrounds |
| ⚫ Black | `#000000` | Text and accents |

### 🔠 Fonts  
- **Segoe UI** (UI and body)  
- **Fredoka One** (headers and emojis)  

### 📐 Wireframes  
📌 [View Wireframes](assets/wireframes/) – Mobile, Tablet, Desktop  

### 🖼️ Imagery  
- Emoji-based UI and live emoji background  
- Language flags for selection  

---

## 🎮 Features

- 🧠 Emoji-based country riddles
- 🎯 Real-time scoring and answer validation  
- 📱 Responsive layout (mobile + desktop)  
- 🎨 Custom styling with emoji icons  
- 🧩 Modular and beginner-friendly JavaScript structure  
- 🕹️ Multiple difficulty levels (Easy, Medium, Hard)  
- ⏳ Timer-based gameplay (30 seconds per round)  
- 🎵 Sound effects and background music (Tone.js)  
- 📊 Score tracking & high scores (LocalStorage, Firebase)  
- 🎭 Light/Dark theme support  
- 🔢 Lives system (3 lives per level)  


## 🚀 How to Play  

1. Enter your name, age, and gender.  
2. Click **Start** to begin the game.  
3. View the emoji clue and type the country you think it represents.  
4. Click **Submit** to check your answer.  
5. Use **Hint** if needed, or click **Next** to move to the next 

## 🛠️ Technologies Used  

- **HTML5, CSS3** – Structuring and styling the game interface.  
- **Vanilla JavaScript (ES6+)** – Core game mechanics.  
- **Firebase Firestore** – Storing player scores.  
- **Tone.js** – Sound effects and background music.  
- **Unicode Emoji Rendering** – No external emoji libraries.  
- **LocalStorage** – Language and score persistence.  

## 🗂️ Project Structure

```
📦 ONEPAGE-JS
├── 📂 assets
│   ├── 📂 css
│   │   └── style.css  # Contains all styles for the game UI
│   ├── 📂 images      # Stores game-related images or graphics
├── 📂 js
│   ├── firebase-config.js  # Handles Firebase setup
│   ├── script.js           # Main game logic (Vanilla JavaScript)
├── firebase.json           # Firebase configuration file
├── index.html              # Main game interface (entry point)
├── LICENSE                 # License information for project usage
└── README.md               # Main project documentation

```

## 📦 Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/anaylsethis2020/onepage-js.git
   cd onepage-js
   ```

2. Open `index.html` in your browser.

✅ No build tools or dependencies required.

3. Start playing!

## 🔍 Example Riddle

```js
{ emoji: "🍐🅰️", answer: "peru" }
```

## Game Rules

1. You have 30 seconds to guess each country
2. Each level has multiple riddles
3. You have 3 lives per level
4. Score points for correct answers
5. Complete all levels to win!

## Contributing

Feel free to submit issues and enhancement requests!
## ✨ Future Enhancements

- Music in background (mp3 file)
- Add celebratory effects (e.g., confetti, animations)
- Add Firebase database support for leaderboard and analytics 
- Multiple language support: 🌐 Internationalization; supports multiple languages (with flag selection) 🇺🇸 🇪🇸 🇧🇷 🇫🇷 🇩🇪 🇮🇹 🇰🇷 🇨🇳 🇯🇵 🇹🇷 🇸🇦 🇷🇺 🇮🇳 🇵🇰 *(Country flags for future quiz variations)*  




# 🎮 EMOJI COUNTRY QUIZ GAME — FEATURES & OPERATIONS CHECKLIST

## ✅ Core Features

1. **User Interface Layout**
   - Retain existing CSS layout unless bug fixes are required.
   - Responsive layout optimized for Chrome.
   - Minimal layout changes unless necessary for functionality.

2. **Language Selector**
   - Dropdown or sidebar list for language selection.
   - One selected language must persist throughout the session.
   - Prevent duplicate selection buttons.

3. **User Input Form (Pre-Game)**
   - Name input field.
   - Age confirmation (optional).
   - Language selection (mandatory before continuing).
   - ‘Continue’ button activates **only** after all required fields are filled.

4. **Game Window**
   - Displays one emoji-country riddle at a time.
   - Text input field for guesses.
   - Submit button for answer checking.
   - ‘Next’ button appears only after feedback is displayed.
   - Animated feedback (`✅ correct / ❌ incorrect`).

5. **Score Tracking**
   - Visual score counter (correct answers only).
   - Local scoring system using vanilla JavaScript.
   - Optional: Firebase Firestore integration for score history.

6. **Game Timer**
   - Countdown starts upon game initiation.
   - Timer visually displayed.
   - Automatic end when timer hits 0.

7. **Game Summary Screen**
   - Displays final score.
   - Restart option available.
   - Optional: Save score with initials (if Firebase is used).

8. **Difficulty Levels**
   - Three selectable difficulties: **Easy, Medium, Hard**.
   - Hard mode applies stricter time limits and fewer hints.

9. **Lives System**
   - Each player gets **three lives per level**.
   - Losing all lives ends the round early.
   - Lives reset when advancing to a new level.

10. **Sound Effects & Background Music**
   - Uses **Tone.js** for interactive sounds.
   - Background music can be toggled **on/off** in settings.
   - Sound feedback for correct/incorrect answers.

11. **Firebase Firestore Integration**
   - Stores player name, score, language, and timestamp.
   - Displays top five leaderboard scores.
   - Input sanitization to prevent invalid submissions.

12. **Form Validation & Input Handling**
   - Prevent empty submissions.
   - Validate text answers (case insensitive).
   - Auto-clear input field after submission.

13. **Game Flow Logic**
    - Starts only after required inputs (name, age, mode selection).
    - Operates question-by-question.
    - Timer resets each round (30s per question).
    - Auto-advance to next question if timer runs out (+1 incorrect score).
    - Prevents resubmission bugs by disabling buttons after interactions.
    - Displays real-time progress (`Question X of Y`).
    - Smooth transitions between questions, score updates, and game-end states.

---

## ⚙️ Development & Tech Stack
- **JavaScript (Vanilla)** for logic and DOM manipulation.
- **Firebase Firestore** for storing scores.
- **CSS** (retain current layout unless necessary for fixes).
- **Tone.js** for sound effects.
- **Target Browser:** Chrome Only.

---

## 🛠️ Bug Prevention & Optimization
- Modular function-based scripting (avoid large script blocks).
- Detailed code comments for clarity.
- Error-handling boundaries for Firebase interactions.
- Input validation before processing changes.
- DOM updates triggered only after validation.

---

## 📌 Future Features (Optional Enhancements)
- Animated emojis for responses.
- ‘How to Play’ tutorial screen.
- Light/Dark theme selector.
- **Language-based trivia sets** (categorized by selected language).
- Custom avatars or emoji packs.
- ⚠️ **Language Change Feature:** *Deprioritized until all core functions are confirmed bug-free.*

---

## 📂 Project Structure Overview
- **`index.html`** – Main game interface.
- **`styles/`** – Contains all CSS files for layout and themes.
- **`scripts/`** – JavaScript logic and game mechanics.
- **`assets/`** – Stores any additional images or media (if necessary).
- **`firebase/`** – Configuration for Firestore integration.
- **`README.md`** – Project documentation.

---

## 🛠️ Setup & Installation Instructions
1. **Clone the repository**:  
   ```sh
   git clone https://github.com/user/emoji-quiz.git


## 📄 License

MIT License © 2025 Abel Beyene
