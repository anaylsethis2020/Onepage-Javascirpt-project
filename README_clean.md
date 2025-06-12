# 🌍 Emoji Riddle Quiz – Guess the Country

Welcome to the **Emoji Riddle Quiz**, a fun and interactive single-page JavaScript game 
that challenges players to guess countries based on creative emoji-style riddles. 
This project blends logic, emoji pattern recognition, 
and a user-friendly design to deliver an engaging experience.

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
- [✨ Future Enhancements](#-future-enhancements)  
- [⚙️ Development & Tech Stack](#-development--tech-stack)  
- [🛠️ Bug Prevention & Optimization](#-bug-prevention--optimization)  
- [Contributing](#contributing)  
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
| 🟣 Vivid Purple | `#A259FF` | Animated background accent |
| 🟢 Neon Green | `#00FFB2` | Animated background accent |
| 🔵 Sky Blue | `#00CFFF` | Animated background accent |
| 🟡 Gold | `#FFD700` | Animated background color cycle |
| 🟢 Green | `#32CD32` | Animated background color cycle |
| 🟠 Red | `#FF4500` | Animated background color cycle |
| 🟩 Green | `#28a745` | Submit button, correct feedback |
| 🟦 Blue | `#007bff` | Next button |
| 🟧 Orange | `#fd7e14` | Hint button |
| 🟨 Yellow | `#ffc107` | Restart button |
| 🟦 Teal | `#17a2b8` | New Game button |
| 🟥 Red | `#dc3545` | Exit Game button |
| ⚪ White | `#FFFFFF` | Card backgrounds |
| ⚫ Black | `#000000` | Text and accents |

**Note:**
- The animated background features floating flag and general emojis, plus a color-cycling effect (Gold, Blue, Green, Red) for extra vibrancy and engagement. These colors are used in CSS keyframes and JavaScript for dynamic effects.
- All colors are chosen for high contrast and accessibility, ensuring clear visibility of emojis, text, and UI elements across all devices.
- Colors are defined as CSS variables for easy theme management. Example:

```css
:root {
  --electric-blue: #1E90FF;
  --lemon-yellow: #FFF44F;
  --vivid-purple: #A259FF;
  --neon-green: #00FFB2;
  --sky-blue: #00CFFF;
  --gold: #FFD700;
  --green: #32CD32;
  --red: #FF4500;
  --submit-green: #28a745;
  --next-blue: #007bff;
  --hint-orange: #fd7e14;
  --restart-yellow: #ffc107;
  --teal: #17a2b8;
  --exit-red: #dc3545;
  --white: #FFFFFF;
  --black: #000000;
}
```

### 🖼️ Animated & Thematic Visuals
- 🌈 **Animated background**: Floating flag and general emojis, plus a color-cycling effect for extra vibrancy and engagement.
- ✈️ **Animated aircraft banner**: The instructions screen features a moving plane and message banner for a playful, thematic introduction.
- 🎉 **Celebration animation**: Pulsing emojis appear in the summary heading when a level is completed, adding a festive touch.

### 📊 Score Breakdown
- The top bar displays not only the total score, but also separate counters for correct and incorrect answers, updating in real time as you play.

### 📝 About Section
- ℹ️ An About section is available from the pre-game screen, describing the game’s purpose and educational benefits.

### ♿ Accessibility & Responsive Design
- All interactive elements are keyboard accessible and tested for screen reader compatibility.
- Color choices and font sizes meet WCAG AA standards for accessibility.
- The UI is fully responsive and adapts seamlessly across mobile, tablet, and desktop screens.

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
- 🎮 User Interface Layout with responsive design
- 📝 Form Validation & Input Handling
- 🕹️ Game Flow Logic with question-by-question progression

---

## 🚀 How to Play  

1. Enter your name, age, and gender.  
2. Select your difficulty level (Easy, Medium, Hard).
3. Click **Continue** to begin the game.  
4. View the emoji clue and type the country you think it represents.  
5. Click **Submit** or press Enter to check your answer.  
6. Use **Hint** if needed, or click **Next** to move to the next riddle.
7. Complete all levels to win!

---

## 🛠️ Technologies Used  

- **HTML5, CSS3** – Structuring and styling the game interface.  
- **Vanilla JavaScript (ES6+)** – Core game mechanics.  
- **Firebase Firestore** – Storing player scores.  
- **Tone.js** – Sound effects and background music.  
- **Unicode Emoji Rendering** – No external emoji libraries.  
- **LocalStorage** – Language and score persistence.  

---

## 🗂️ Project Structure

```
📦 ONEPAGE-JS
├── 📂 assets
│   ├── 📂 css
│   │   └── style.css           # Contains all styles for the game UI
│   ├── 📂 images              # Stores game-related images or graphics
│   └── 📂 js
│       ├── firebase-config.js  # Handles Firebase setup
│       └── script.js           # Main game logic (Vanilla JavaScript)
├── firebase.json               # Firebase configuration file
├── index.html                  # Main game interface (entry point)
├── LICENSE                     # License information for project usage
└── README.md                   # Main project documentation
```

---

## 📦 Setup Instructions

1. **Clone this repository:**
   ```bash
   git clone https://github.com/anaylsethis2020/onepage-js.git
   cd onepage-js
   ```

2. **Open `index.html` in your browser.**

3. **Start playing!**

✅ No build tools or dependencies required.

---

## 🔍 Example Riddle

```js
{ emoji: "🍐🦘", answer: "peru" }
{ emoji: "🔗🅰️", answer: "china" }
{ emoji: "4️⃣🐜🐜", answer: "france" }
```

---

## Game Rules

1. **Timer:** You have 30 seconds to guess each country
2. **Lives:** You have 3 lives per level  
3. **Levels:** Complete Easy → Medium → Hard difficulty levels
4. **Scoring:** Score points for correct answers
5. **Progression:** Complete all levels to win!
6. **Lives Reset:** Lives are restored when advancing to a new level

---

## ✨ Future Enhancements

- 🎵 Enhanced background music (MP3 files)
- 🎊 Advanced celebratory effects (confetti, animations)
- 📊 Firebase database support for leaderboard and analytics 
- 🌐 Extended language support with country-specific quiz variations
- 🎨 Animated emojis for responses
- 📖 'How to Play' tutorial screen
- 🎭 Advanced Light/Dark theme selector
- 🎮 Custom avatars or emoji packs
- 🗣️ Voice input using Speech Recognition API
- 🌐 Internationalization support with 14 languages
- 🎮 Language Selector with flag-based selection

---

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
      - **Function:** `startGame()` — This function is only called when all pre-game fields are valid and the user clicks Start. It initializes the game state, sets up the first question, and ensures the player cannot proceed without entering required information.
    - Operates question-by-question.
      - **Functions:** `loadQuestion()`, `checkAnswer()`, `nextQuestion()` — `loadQuestion()` displays the current riddle, `checkAnswer()` processes the user's input and feedback, and `nextQuestion()` advances to the next riddle, ensuring a clear, stepwise progression.
    - Timer resets each round (30s per question).
      - **Functions:** `startTimer()`, `resetTimer()` — These manage the countdown for each question, resetting and starting the timer as each new riddle is loaded, enforcing time pressure and fairness.
    - Auto-advance to next question if timer runs out (+1 incorrect score).
      - **Function:** `handleTimeout()` — When the timer reaches zero, this function marks the answer as incorrect, updates the score/lives, and prompts the player to move to the next question, maintaining game flow even if the player is inactive.
    - Prevents resubmission bugs by disabling buttons after interactions.
      - **Functions:** `checkAnswer()`, `handleTimeout()` — Both functions disable the submit button and input field after an answer is processed or time runs out, preventing duplicate submissions and ensuring game integrity.
    - Displays real-time progress (`Question X of Y`).
      - **Function:** `loadQuestion()` — Updates the progress display each time a new question is loaded, giving the player a clear sense of advancement and remaining riddles.
    - Smooth transitions between questions, score updates, and game-end states.
      - **Functions:** `loadQuestion()`, `endGame()`, `displayCelebrationAnimation()` — These functions handle UI updates, feedback, and celebratory effects, ensuring the player experiences seamless transitions and clear feedback throughout the game.

- **Note:** All the above logic is implemented as standalone functions, not as methods of a class or object. In JavaScript, a function is a block of code that can be called independently, while a method is a function that belongs to an object or class. This project uses a functional approach for simplicity and clarity, so each game flow step is handled by a named function (e.g., `startGame`, `loadQuestion`, `checkAnswer`). If you wish to refactor to an object-oriented style, these could be converted to methods within a `Game` class.

---    

## ⚙️ Development & Tech Stack

- **JavaScript (Vanilla)** for logic and DOM manipulation
- **Firebase Firestore** for storing scores and user data
- **CSS3** with responsive design principles
- **Tone.js** for interactive sound effects
- **LocalStorage** for offline data persistence
- **Target Browser:** Chrome (optimized)

---

## 🐞 Development Issues & Solutions

### Functional vs. Object-Oriented Approach

- **Initial Approach:**  
  The project initially considered using a class-based or object-oriented structure, where game logic would be encapsulated as methods within a `Game` class or similar object. This is a common pattern for complex applications, as it can help organize state and behavior.

- **Why Refactored to Standalone Functions:**  
  During development, it became clear that the game’s logic was best expressed as a series of clear, named functions (e.g., `startGame`, `loadQuestion`, `checkAnswer`) rather than as methods tied to a class instance.  
  - The game state was simple and could be managed with a few variables.
  - Standalone functions made the code easier to read, test, and maintain, especially for contributors less familiar with JavaScript classes.
  - Avoided the complexity of `this` binding and class instantiation, which can be error-prone in event-driven browser code.
  - Functions could be reused and composed more flexibly.

- **Result:**  
  The codebase was refactored to use standalone functions for all game logic, with clear separation of concerns and descriptive comments. This improved maintainability and reduced bugs related to state management.

### Timer Bugs

- **Issue:**  
  The timer sometimes failed to reset correctly between questions, or continued counting down after the game ended.

- **Solution:**  
  Implemented dedicated `startTimer` and `resetTimer` functions, ensuring the timer is always cleared and restarted at the right moments. Added logic to disable input and buttons when time runs out, preventing race conditions.

### Sound Integration

- **Issue:**  
  Integrating sound effects (using HTML `<audio>` and GSAP) caused issues with overlapping sounds and inconsistent feedback.

- **Solution:**  
  Added logic to pause and reset audio elements before playing them, and coordinated sound triggers with animation feedback. Ensured that sound effects are only played once per event, and background music can be toggled reliably.

### Other Notable Fixes

- Improved code comments to clarify the role of each section and function.
- Enhanced input validation to prevent empty or duplicate submissions.
- Fixed UI bugs related to button states and progress display.

---

## 🛠️ Bug Prevention & Optimization

- Modular function-based scripting (avoid large script blocks)
- Detailed code comments for clarity
- Error-handling boundaries for Firebase interactions
- Input validation before processing changes
- DOM updates triggered only after validation
- Event listener management to prevent memory leaks
- Responsive design testing across devices

---

## Contributing

Feel free to submit issues and enhancement requests! 

**Development Guidelines:**
- Follow existing code style and structure
- Test thoroughly before submitting PRs
- Update documentation for new features
- Ensure cross-browser compatibility

---

## 📄 License

MIT License © 2025 Abel Beyene


Post-Development Operational Checklist
Functionality Testing
[ ] Load & Initialization:

Confirm the landing/input page loads correctly in Google Chrome.

Verify all input fields (name, age, gender) display and function properly.

[ ] Gameplay Flow:

Ensure that clicking Continue starts the game.

Check that an emoji riddle displays correctly and the answer input works.

Validate that pressing Submit (or pressing Enter) triggers answer verification.

Test the Hint and Next buttons for proper behavior.

[ ] Timer & Lives:

Confirm that a 30-second countdown starts with each question.

Verify that an incorrect answer or timer expiry reduces a life appropriately.

Ensure that lives are managed correctly when advancing between levels.

[ ] Scoring & Visual Feedback:

Check that the score counter accurately updates with each correct answer.

Validate that animated feedback (e.g., check marks for correct answers, crosses for incorrect) displays properly.

Multimedia & Performance
[ ] Sound Integration:

Test that Tone.js plays sound effects and background music as expected.

Ensure that toggling background music on and off works without errors.

[ ] Animations & Transitions:

Verify that CSS animations and transitions are smooth with no performance lag.

Confirm the use of requestAnimationFrame where appropriate for optimized rendering.

Data Handling & Persistence
[ ] LocalStorage:

Ensure that game scores and session data persist correctly throughout gameplay.

[ ] Firebase Integration (if used):

Validate that player data (e.g., scores, names, language) is stored and retrievable from Firebase Firestore.

Cross-Browser & Responsive Testing
[ ] Browser Optimization:

Confirm that the game functions flawlessly in Google Chrome.

Test compatibility with other major browsers to prevent runtime errors.

[ ] Responsive Design:

Verify that the layout adapts seamlessly across mobile, tablet, and desktop screens.

Error Handling & Accessibility
[ ] Input Validation:

Ensure prevention of empty or invalid submissions, with clear error messages.

Confirm robust error-catching routines for unexpected events.

[ ] Accessibility:

Check that fonts, colors, and UI elements meet accessibility standards.

Verify that interactive elements have the proper ARIA labels and roles.

Final Deployment
[ ] Production Readiness:

Conduct final integration testing in a staging environment.

Ensure that all ESLint and Prettier checks pass.

Confirm comprehensive documentation and inline comments are provided for maintainability.





