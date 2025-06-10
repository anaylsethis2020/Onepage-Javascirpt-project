# 🌍 Emoji Riddle Quiz – Guess the Country

Welcome to the **Emoji Riddle Quiz**, a fun and interactive single-page JavaScript game 
that challenges players to guess countries based on creative emoji-style riddles. 
This project blends logic, emoji pattern recognition, 
and a user-friendly design to deliver an engaging experience.

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

# Proposal: Emoji Riddle Quiz Game Implementation for Gemini 2.5 Pro

## Objective
Develop a browser-friendly, single-page JavaScript game where players guess countries based on creative emoji-based riddles. The game must run smoothly and be optimized (especially for Google Chrome) by employing robust coding practices, error-prevention plugins, and thorough testing.

## Core Requirements
- **Game Engine & Logic:**  
  - Use Vanilla JavaScript (ES6+) for core game mechanics and DOM manipulation.
  - Implement modular, function-based code with clear error handling and event management.
- **User Experience & Interface:**  
  - Design a responsive, visually appealing UI for both desktop and mobile.
  - Employ smooth CSS animations and transitions.
  - Clearly display emoji-based riddles so that players can intuitively guess the corresponding country.
- **Gameplay Mechanics:**  
  - Provide multiple difficulty levels (Easy, Medium, Hard) with a dedicated Question Bank for each.
  - Implement a 30-second countdown timer for every riddle.
  - Use a three-lives-per-level system and update the score in real time with immediate visual feedback (e.g., correct/incorrect marks).
- **Multimedia Integration:**  
  - Integrate Tone.js for sound effects and background music with an on/off toggle.
- **Data Handling:**  
  - Use LocalStorage to persist scores and session data.
  - Optionally integrate Firebase Firestore for global score tracking and leaderboard functionality.
- **Error Prevention & Plugin Integration:**  
  - Enforce code quality with ESLint and Prettier.
  - Include polyfills and robust error-handling routines.
  - Use requestAnimationFrame to optimize rendering performance.

## User Stories
As a player, I want to:
- See engaging, emoji-based riddles that clearly hint at a country.
- Input (or speak) my guess and immediately know whether I am right.
- Track my score, remaining lives, and time throughout the game.
- Experience smooth transitions with a visible 30-second timer for each question.
- Play on any device (desktop, tablet, mobile) with a responsive design.
- Access interactive instructions if I need help during gameplay.

## Question Bank
_These are sample emoji riddle questions organized by difficulty level. Adjust or extend as needed._

### Easy Level Questions
        { emoji: "🇯 🍳", answer: "japan" },
        { emoji: "👙💤🤧", answer: "brazil" },
        { emoji: "🔗🅰️", answer: "china" },
        { emoji: "4️⃣🐜🐜", answer: "france" },
        { emoji: "🍐🦘", answer: "peru" }
    
### Medium Level Questions
        { emoji: "🧊🅰️", answer: "cuba" },
        { emoji: "🍳🅰️🤰", answer: "panama" },
        { emoji: "🐄🪨🅾️", answer: "morocco" },
        { emoji: "🐋🐬", answer: "wales" },
        { emoji: "👖✅", answer: "denmark" },
        { emoji: "⚓🇺⚽", answer: "portugal" },
        { emoji: "🧍‍♂️🅰️", answer: "kenya" }
    
### Hard Level Questions
        { emoji: "🆕💤🖼️", answer: "new zealand" },
        { emoji: "📩🦌🦵🅰️", answer: "indonesia" },
        { emoji: "💈🖼️", answer: "poland" },
        { emoji: "👁🏃", answer: "iran" },
        { emoji: "🎤🅰️🫖", answer: "singapore" },
        { emoji: "🍭🍬👖", answer: "sweden" },
        { emoji: "S👂🐝🅰️", answer: "serbia" },
        { emoji: "😡⛽🚗", answer: "madagascar" }

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

## 📄 License

MIT License © 2025 Abel Beyene
