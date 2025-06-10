/**
 * ============================================================================
 * IMPORTS & CONFIGURATION
 * ============================================================================
 * 
 * This section handles all external dependencies and initial setup.
 * Firebase is used for:
 * - User authentication (anonymous sign-in)
 * - Storing high scores
 * - Tracking game attempts
 * - Offline mode fallback
 */

// Firebase imports for core functionality
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

/**
 * Firebase Configuration
 * This configuration object connects the game to your Firebase project.
 * Required for:
 * - User authentication
 * - Score persistence
 * - Game state synchronization
 * 
 * Replace these placeholder values with your actual Firebase project configuration
 * from the Firebase Console (https://console.firebase.google.com)
 */
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase services
// These instances are used throughout the game for various Firebase operations
const app = initializeApp(firebaseConfig);
const fbAuth = getAuth(app);  // Used for user authentication
const db = getFirestore(app); // Used for storing game data

// Set Firebase log level to reduce console noise
setLogLevel('error');

/**
 * Firebase state variables
 * These track the authentication state and are used by:
 * - Score saving/loading functions
 * - User session management
 * - Offline mode detection
 */
let currentUserId = null;  // Stores the current user's Firebase ID
let isAuthReady = false;   // Tracks if Firebase auth is initialized

/**
 * ============================================================================
 * LANGUAGE & TRANSLATIONS
 * ============================================================================
 * 
 * This section manages the game's internationalization (i18n) system.
 * The translation system:
 * - Supports multiple languages
 * - Updates UI elements dynamically
 * - Persists language selection
 * - Provides fallback to English
 */

/**
 * Translation dictionary for all supported languages
 * Each language has its own set of translations for UI elements.
 * The structure is:
 * {
 *   languageCode: {
 *     key: "translated text",
 *     ...
 *   }
 * }
 * 
 * Used by:
 * - applyTranslations() function
 * - UI update functions
 * - Feedback messages
 */
const translations = {
    us: {
        selectLanguage: "Select language",
        welcomeTitle: "Welcome to the Ultimate Emoji Country Quiz!",
        enterNamePlaceholder: "Enter your name",
        enterAgePlaceholder: "Enter your age",
        selectGender: "Select your gender",
        male: "Male",
        female: "Female",
        other: "Other",
        selectDifficulty: "Select Difficulty",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        continue: "Continue",
        currentLevelPrefix: "Current Level:",
        livesLeftLabel: "Lives Left:",
        instruction: "Guess the country using emojis!",
        typeAnswerPlaceholder: "Type your answer here...",
        gameScorePrefix: "Game",
        correctScoreLabel: "Correct",
        wrongScoreLabel: "Wrong",
        levelScorePrefix: "Level",
        playerNameLabel: "Player:",
        highScoreLabel: "High Score:",
        submit: "Submit",
        hint: "💡 Hint",
        next: "Next",
        restartLevel: "Restart Level",
        restartGame: "Restart Full Game",
        gameOverTitle: "Game Over!",
        gameOverMessage: "You've completed all available riddles!",
        finalScoreLabel: "Your final score:",
        playAgainFromWelcome: "Start New Game (from Welcome)",
        levelCompletedTitle: "Level Completed!",
        levelCompletedMessageDefault: "Well done!",
        nextLevel: "Next Level",
        playAgainSameLevel: "Play Again (Same Level)",
        maxAttemptsTitle: "Max Attempts Reached",
        maxAttemptsMessage: "You've used all your game attempts. Restart the full game to play again with fresh attempts.",
        menuTitle: "Game Menu",
        menuReturnToWelcome: "Return to Welcome",
        menuToggleSound: "Sound: ON",
        menuToggleMusic: "Music: ON",
        footerText: "© 2025 Emoji Quiz | Original by Abel Beyene"
    }
};

/**
 * Current active language
 * This variable is used by:
 * - applyTranslations() to know which language to apply
 * - UI update functions to show correct text
 * - Feedback messages to display in correct language
 */
let currentLanguage = 'us';

/**
 * ============================================================================
 * DOM ELEMENTS
 * ============================================================================
 * 
 * This section contains all DOM element references.
 * These elements are used throughout the game for:
 * - User interface updates
 * - Event handling
 * - Game state display
 * - User input processing
 */

/**
 * Game Screens
 * Main containers for different game states.
 * These elements control the visibility of:
 * - Welcome screen (initial setup)
 * - Game screen (active gameplay)
 * - Various modals (game over, level completion, etc.)
 */
const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");

/**
 * Welcome Screen Elements
 * Elements used in the initial welcome screen.
 * These handle:
 * - Player information collection
 * - Difficulty selection
 * - Game initialization
 */
const continueBtn = document.getElementById("continueBtn");
const playerNameInput = document.getElementById("playerName");
const playerAgeInput = document.getElementById("playerAge");
const playerGenderSelect = document.getElementById("playerGender");

/**
 * Game Screen Elements
 * Elements used during active gameplay.
 * These handle:
 * - Riddle display
 * - Answer input
 * - Game controls
 * - Player feedback
 */
const playerNameDisplay = document.getElementById("playerNameDisplay");
const emojiDisplay = document.getElementById("emoji");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const restartLevelBtn = document.getElementById("restartLevelBtn");
const restartGameBtn = document.getElementById("restartGameBtn");

/**
 * Score Display Elements
 * Elements used to show game progress and scores.
 * These display:
 * - Overall game statistics
 * - Current level progress
 * - Player's high score
 * - Remaining lives
 */
const overallCorrectScoreDisplay = document.getElementById("overallCorrectScoreDisplay");
const overallWrongScoreDisplay = document.getElementById("overallWrongScoreDisplay");
const levelCorrectScoreDisplay = document.getElementById("levelCorrectScoreDisplay");
const levelWrongScoreDisplay = document.getElementById("levelWrongScoreDisplay");
const currentDifficultyNameDisplay = document.getElementById("currentDifficultyNameDisplay");
const feedbackDisplay = document.getElementById("feedback");
const highScoreDisplay = document.getElementById("highScoreDisplay");
const livesLeftDisplay = document.getElementById("livesLeftDisplay");
const currentLevelDisplayElement = document.getElementById("current-level-display");

/**
 * Theme and Menu Elements
 * Elements for UI customization and navigation.
 * These handle:
 * - Theme switching (light/dark)
 * - Menu toggling
 * - Game settings
 */
const themeToggle = document.getElementById('theme-toggle');
const themeIconLight = document.getElementById('theme-icon-light');
const themeIconDark = document.getElementById('theme-icon-dark');
const menuBtn = document.getElementById('menu-btn');

/**
 * Modal Elements
 * Elements for various game state modals.
 * These handle:
 * - Game over state
 * - Level completion
 * - Maximum attempts reached
 * - Game menu
 * 
 * Each modal has:
 * - Close button
 * - Action buttons
 * - Status messages
 */
const gameOverModal = document.getElementById('game-over-modal');
const modalCloseButton = document.getElementById('modal-close');
const modalPlayAgainButton = document.getElementById('modal-play-again-button');
const finalScoreModalDisplay = document.getElementById('final-score-display');
const gameOverFinalMessage = document.getElementById('game-over-final-message');

const levelCompletionModal = document.getElementById('level-completion-modal');
const levelCompletionModalClose = document.getElementById('level-completion-modal-close');
const levelCompletionNextLevelButton = document.getElementById('level-completion-next-level-button');
const levelCompletionPlayAgainButton = document.getElementById('level-completion-play-again-button');
const levelCompletionTitle = document.getElementById('level-completion-title');
const levelCompletionMessage = document.getElementById('level-completion-message');

const maxAttemptsModal = document.getElementById('max-attempts-modal');
const maxAttemptsModalClose = document.getElementById('max-attempts-modal-close');
const maxAttemptsRestartGameButton = document.getElementById('max-attempts-restart-game-button');

const gameMenuModal = document.getElementById('game-menu-modal');
const gameMenuModalClose = document.getElementById('game-menu-modal-close');
const menuReturnWelcomeBtn = document.getElementById('menu-return-welcome');
const menuToggleSoundBtn = document.getElementById('menu-toggle-sound');
const menuToggleMusicBtn = document.getElementById('menu-toggle-music');

/**
 * ============================================================================
 * AUDIO SYSTEM
 * ============================================================================
 * 
 * This section manages all audio-related functionality in the game.
 * The audio system provides:
 * - Background music during gameplay
 * - Sound effects for correct/incorrect answers
 * - Celebration sounds for level completion
 * - Fallback to Tone.js for basic sound effects
 * 
 * The system is designed to:
 * - Handle browser autoplay restrictions
 * - Provide graceful fallbacks
 * - Support user preferences (sound on/off)
 * - Manage audio context lifecycle
 */

/**
 * Audio elements and controls
 * These elements handle:
 * - Background music playback
 * - Sound effect playback
 * - Audio state management
 * 
 * The audioContext is used to:
 * - Control audio timing
 * - Handle audio state
 * - Manage audio permissions
 */
const backgroundMusic = document.getElementById("background-music");
const celebrationAudio = document.getElementById("celebration-audio");
let audioContext = null;

/**
 * Sound & Music Control
 * These variables control:
 * - Whether sound effects are enabled
 * - Whether background music is enabled
 * - The synthesizer for fallback sounds
 * 
 * The synth variable is used by:
 * - playToneCelebration() for victory sounds
 * - playIncorrectSound() for wrong answers
 * - Fallback when audio files fail to load
 */
let isSoundEnabled = true;
let isMusicEnabled = true;
let synth;

/**
 * Initialize Tone.js if available
 * This provides a fallback sound system when:
 * - Audio files fail to load
 * - Browser doesn't support audio files
 * - User has disabled audio files
 */
if (typeof Tone !== 'undefined') {
    synth = new Tone.Synth().toDestination();
} else {
    console.warn("Tone.js not loaded. Simple sound effects will be disabled.");
    synth = { triggerAttackRelease: () => console.log("Sound fallback: Beep!") };
}

/**
 * ============================================================================
 * TIMER SYSTEM
 * ============================================================================
 * 
 * This section manages the game's countdown timer functionality.
 * The timer system provides:
 * - Visual countdown display
 * - SVG circle animation
 * - Time-up handling
 * - Game state management
 * 
 * The system is used to:
 * - Create time pressure
 * - Handle time-based game over
 * - Provide visual feedback
 * - Manage game flow
 */

/**
 * Timer variables and constants
 * These control:
 * - Timer display
 * - Animation state
 * - Countdown logic
 * 
 * The SVG path is used for:
 * - Visual countdown circle
 * - Progress animation
 * - Time remaining display
 */
const timerSVGPath = document.querySelector("#timerDisplay .timer-progress");
const timerText = document.getElementById("timerText");
const FULL_DASH_ARRAY = 282.743;  // Circumference of the timer circle
const TIME_LIMIT = 30;            // Time limit in seconds
let timeLeft = TIME_LIMIT;        // Current time remaining
let timerInterval = null;         // Interval for countdown

/**
 * Reset timer to initial state
 * This function:
 * - Resets the countdown
 * - Updates the display
 * - Resets the animation
 * 
 * Used by:
 * - startTimer() for initialization
 * - startLevel() for level reset
 * - resetFullGame() for game reset
 */
function resetTimer() {
    timeLeft = TIME_LIMIT;
    if (timerText) timerText.textContent = timeLeft;
    setCircleDashoffset(0);
}

/**
 * Start the countdown timer
 * This function:
 * - Initializes the timer
 * - Starts the countdown
 * - Updates the display
 * - Handles time-up
 * 
 * The timer affects:
 * - Game difficulty
 * - Player pressure
 * - Score calculation
 * - Game over conditions
 */
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    resetTimer();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        
        if (timerText) {
            timerText.textContent = timeLeft;
        }
        
        const timeFraction = timeLeft / TIME_LIMIT;
        const dashOffset = FULL_DASH_ARRAY * (1 - timeFraction);
        setCircleDashoffset(dashOffset);
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

/**
 * Stop the timer
 * This function:
 * - Cleans up the interval
 * - Prevents memory leaks
 * - Resets timer state
 * 
 * Used by:
 * - handleTimeUp() when time runs out
 * - startLevel() when starting new level
 * - resetFullGame() when resetting game
 */
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

/**
 * Update timer circle animation
 * This function:
 * - Updates the SVG circle
 * - Shows visual progress
 * - Provides user feedback
 * 
 * @param {number} offset - The dash offset for the SVG circle
 * Used by:
 * - startTimer() for continuous updates
 * - resetTimer() for initial state
 */
function setCircleDashoffset(offset) {
    if (timerSVGPath) {
        timerSVGPath.style.strokeDashoffset = offset;
    }
}

/**
 * Handle timer completion
 * This function:
 * - Manages game state when time runs out
 * - Updates lives
 * - Shows feedback
 * - Handles game over
 * 
 * Triggers:
 * - Lives reduction
 * - Feedback display
 * - Game over if no lives left
 * - Next riddle preparation
 */
function handleTimeUp() {
    stopTimer();
    livesLeft--;
    updateLivesDisplay();
    
    if (livesLeft <= 0) {
        triggerNoLivesGameOver();
    } else {
        // Show feedback for time up
        if (feedbackDisplay) {
            feedbackDisplay.textContent = translations[currentLanguage]?.timeUp || "Time's up!";
            feedbackDisplay.className = 'feedback incorrect';
        }
        
        // Show the correct answer
        const currentRiddle = riddles[currentRiddleIndexInLevel];
        if (currentRiddle) {
            setTimeout(() => {
                if (feedbackDisplay) {
                    feedbackDisplay.textContent = `${translations[currentLanguage]?.correctAnswerWas || "The correct answer was"}: ${currentRiddle.answer}`;
                }
                showNextButton();
            }, 2000);
        }
    }
}

/**
 * ============================================================================
 * GAME STATE & RIDDLES
 * ============================================================================
 * 
 * This section manages the core game data and state.
 * The game state system:
 * - Tracks player progress
 * - Manages difficulty levels
 * - Handles score tracking
 * - Controls game flow
 * 
 * The riddles system:
 * - Organizes questions by difficulty
 * - Manages riddle progression
 * - Handles answer validation
 * - Controls level completion
 */

/**
 * Game riddles organized by difficulty level
 * Structure:
 * {
 *   difficulty: [
 *     { emoji: "clue", answer: "correct answer" },
 *     ...
 *   ]
 * }
 * 
 * Used by:
 * - startLevel() to load appropriate riddles
 * - handleSubmitAnswer() to validate answers
 * - loadNextRiddle() to progress through the game
 */
const allRiddles = {
    easy: [
        { emoji: "🇯 🍳", answer: "japan" },
        { emoji: "👙💤🤧", answer: "brazil" },
        { emoji: "🔗🅰️", answer: "china" },
        { emoji: "4️⃣🐜🐜", answer: "france" },
        { emoji: "🍐🦘", answer: "peru" }
    ],
    medium: [
        { emoji: "🧊🅰️", answer: "cuba" },
        { emoji: "🍳🅰️🤰", answer: "panama" },
        { emoji: "🐄🪨🅾️", answer: "morocco" },
        { emoji: "🐋🐬", answer: "wales" },
        { emoji: "👖✅", answer: "denmark" },
        { emoji: "⚓🇺⚽", answer: "portugal" },
        { emoji: "🧍‍♂️🅰️", answer: "kenya" }
    ],
    hard: [
        { emoji: "🆕💤🖼️", answer: "new zealand" },
        { emoji: "📩🦌🦵🅰️", answer: "indonesia" },
        { emoji: "💈🖼️", answer: "poland" },
        { emoji: "👁🏃", answer: "iran" },
        { emoji: "🎤🅰️🫖", answer: "singapore" },
        { emoji: "🍭🍬👖", answer: "sweden" },
        { emoji: "S👂🐝🅰️", answer: "serbia" },
        { emoji: "😡⛽🚗", answer: "madagascar" }
    ]
};

/**
 * Game state variables
 * These track:
 * - Current difficulty level
 * - Active riddles
 * - Current riddle index
 * - Game progression
 * 
 * Used by:
 * - startLevel() to set up the level
 * - handleSubmitAnswer() to track progress
 * - loadNextRiddle() to manage riddle flow
 * - handleLevelEnd() to check completion
 */
const difficultyOrder = ['easy', 'medium', 'hard'];
let currentDifficultyIndex = 0;
let currentDifficulty = 'easy';
let riddles = [];
let currentRiddleIndexInLevel = 0;

/**
 * Score tracking variables
 * These manage:
 * - Overall game performance
 * - Current level performance
 * - High score tracking
 * - Progress display
 * 
 * Used by:
 * - updateAllScoreDisplays() to show progress
 * - saveUserHighScore() to persist achievements
 * - handleLevelEnd() to evaluate performance
 */
let overallCorrectScore = 0;
let overallWrongScore = 0;
let correctAnswersThisLevel = 0;
let mistakesThisLevel = 0;
let currentHighScore = 0;

/**
 * Lives system
 * This manages:
 * - Player attempts
 * - Game over conditions
 * - Difficulty balance
 * - Player feedback
 * 
 * Used by:
 * - handleTimeUp() to reduce lives
 * - handleSubmitAnswer() to check game over
 * - updateLivesDisplay() to show remaining lives
 */
const MAX_LIVES = 3;
let livesLeft = MAX_LIVES;

/**
 * ============================================================================
 * GAME INITIALIZATION
 * ============================================================================
 * 
 * This section handles the game's startup and initialization.
 * The initialization system:
 * - Sets up event listeners
 * - Initializes game state
 * - Prepares UI elements
 * - Handles user preferences
 */

/**
 * Initialize the game when DOM is loaded
 * This function:
 * - Sets up language system
 * - Initializes audio
 * - Sets up event listeners
 * - Prepares game state
 * 
 * The initialization sequence:
 * 1. Language setup
 * 2. Audio initialization
 * 3. Event listener setup
 * 4. Game state preparation
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageSelection();
    applyTranslations(currentLanguage);
    setupEventListeners();
});

/**
 * Set up all game event listeners
 * This function:
 * - Attaches click handlers
 * - Sets up input listeners
 * - Configures modal interactions
 * - Manages game flow
 * 
 * The event system handles:
 * - User input
 * - Game progression
 * - UI interactions
 * - State changes
 */
function setupEventListeners() {
    // Welcome screen events
    if (continueBtn) {
        continueBtn.addEventListener('click', startLevel);
    }
    // Game screen events
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmitAnswer);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', loadNextRiddle);
    }
    if (restartLevelBtn) {
        restartLevelBtn.addEventListener('click', startLevel);
    }
    if (restartGameBtn) {
        restartGameBtn.addEventListener('click', resetFullGame);
    }
    // Menu events
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    // Modal events
    setupModalEventListeners();
}

/**
 * Set up modal event listeners
 * This function:
 * - Configures modal interactions
 * - Handles modal state
 * - Manages user choices
 * - Controls game flow
 * 
 * The modal system handles:
 * - Game over state
 * - Level completion
 * - Maximum attempts
 * - Game menu
 */
function setupModalEventListeners() {
    // Game over modal
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => gameOverModal.classList.add('hidden'));
    }
    if (modalPlayAgainButton) {
        modalPlayAgainButton.addEventListener('click', resetFullGame);
    }
    
    // Level completion modal
    if (levelCompletionModalClose) {
        levelCompletionModalClose.addEventListener('click', () => levelCompletionModal.classList.add('hidden'));
    }
    if (levelCompletionNextLevelButton) {
        levelCompletionNextLevelButton.addEventListener('click', startNextLevel);
    }
    if (levelCompletionPlayAgainButton) {
        levelCompletionPlayAgainButton.addEventListener('click', startLevel);
    }
    
    // Max attempts modal
    if (maxAttemptsModalClose) {
        maxAttemptsModalClose.addEventListener('click', () => maxAttemptsModal.classList.add('hidden'));
    }
    if (maxAttemptsRestartGameButton) {
        maxAttemptsRestartGameButton.addEventListener('click', resetFullGame);
    }
    
    // Game menu modal
    if (gameMenuModalClose) {
        gameMenuModalClose.addEventListener('click', () => gameMenuModal.classList.add('hidden'));
    }
    if (menuReturnWelcomeBtn) {
        menuReturnWelcomeBtn.addEventListener('click', returnToWelcome);
    }
    if (menuToggleSoundBtn) {
        menuToggleSoundBtn.addEventListener('click', toggleSound);
    }
    if (menuToggleMusicBtn) {
        menuToggleMusicBtn.addEventListener('click', toggleMusic);
    }
}

// Game Over Handling
function triggerNoLivesGameOver() {
    console.log("triggerNoLivesGameOver called");
    stopTimer();
    stopBackgroundMusic();
    
    if (feedbackDisplay) {
        feedbackDisplay.textContent = translations[currentLanguage]?.gameOverNoLives || "No lives left! Game Over.";
        feedbackDisplay.className = "incorrect";
    }
    
    // Save high score before ending
    saveUserHighScore();
    
    // Show game over modal
    if (gameOverModal) {
        if (finalScoreModalDisplay) finalScoreModalDisplay.textContent = overallCorrectScore;
        if (gameOverFinalMessage) gameOverFinalMessage.textContent = translations[currentLanguage]?.gameOverMessage || "Game Over! Better luck next time.";
        gameOverModal.style.display = 'block';
    }
    
    // Disable game controls
    if (submitBtn) submitBtn.disabled = true;
    if (answerInput) answerInput.disabled = true;
    if (nextBtn) nextBtn.classList.add("hidden");
}

// ============================================================================
// GAME LOGIC FUNCTIONS
// ============================================================================
// Core game mechanics and logic that handle:
// - Player input processing
// - Game progression management
// - Difficulty level control
// - Answer validation and scoring

// Handles answer submission and validation
// Flow: 1. Validates input 2. Checks answer 3. Updates scores 4. Manages progression
function handleSubmitAnswer() {
    const answer = answerInput.value.trim().toLowerCase();
    const currentRiddle = riddles[currentRiddleIndexInLevel];
    
    if (!answer) {
        if (feedbackDisplay) {
            feedbackDisplay.textContent = translations[currentLanguage]?.emptyAnswer || "Please enter an answer.";
            feedbackDisplay.className = 'feedback incorrect';
        }
        return;
    }
    
    stopTimer();
    
    if (answer === currentRiddle.answer.toLowerCase()) {
        // Correct answer handling
        overallCorrectScore++;
        correctAnswersThisLevel++;
        updateAllScoreDisplays();
        
        if (feedbackDisplay) {
            feedbackDisplay.textContent = translations[currentLanguage]?.correctFeedback || "✅ Correct!";
            feedbackDisplay.className = 'feedback correct';
        }
        
        playCelebrationSoundOrMusic();
    } else {
        // Incorrect answer handling
        overallWrongScore++;
        mistakesThisLevel++;
        livesLeft--;
        updateAllScoreDisplays();
        updateLivesDisplay();
        
        if (feedbackDisplay) {
            feedbackDisplay.textContent = `${translations[currentLanguage]?.incorrectFeedback || "❌ Incorrect!"} ${translations[currentLanguage]?.correctAnswerWas || "The correct answer was"}: ${currentRiddle.answer}`;
            feedbackDisplay.className = 'feedback incorrect';
        }
        
        playIncorrectSound();
        
        if (livesLeft <= 0) {
            triggerNoLivesGameOver();
            return;
        }
    }
    
    showNextButton();
}

// Loads the next riddle in the current level
// Flow: 1. Advances riddle 2. Updates UI 3. Handles completion 4. Manages progression
function loadNextRiddle() {
    currentRiddleIndexInLevel++;
    
    if (currentRiddleIndexInLevel < riddles.length) {
        // Load next riddle in current level
        if (emojiDisplay) emojiDisplay.textContent = riddles[currentRiddleIndexInLevel].emoji;
        if (answerInput) {
            answerInput.value = '';
            answerInput.disabled = false;
        }
        if (submitBtn) submitBtn.classList.remove('hidden');
        if (nextBtn) nextBtn.classList.add('hidden');
        if (hintBtn) hintBtn.classList.add('hidden');
        if (feedbackDisplay) {
            feedbackDisplay.textContent = '';
            feedbackDisplay.className = '';
        }
        startTimer();
    } else {
        // Level completed
        handleLevelEnd();
    }
}

// Initializes and starts a new level
// Flow: 1. Resets variables 2. Loads riddles 3. Updates UI 4. Starts first riddle
function startLevel() {
    console.log("startLevel called for difficulty:", currentDifficulty);
    if (!allRiddles[currentDifficulty]) {
        console.error("Invalid difficulty or no riddles for:", currentDifficulty, ". Defaulting to easy.");
        currentDifficulty = 'easy';
        currentDifficultyIndex = difficultyOrder.indexOf('easy');
        // Optionally, check the 'easy' radio button visually
        const easyRadio = document.getElementById('difficultyEasy');
        if (easyRadio) easyRadio.checked = true;
    }

    riddles = [...allRiddles[currentDifficulty]];
    shuffleArray(riddles); // Make sure shuffleArray is defined
    console.log("Riddles loaded for level:", riddles.length, "First riddle (if any):", riddles.length > 0 ? riddles[0] : "N/A"); // ADDED more detail to log

    currentRiddleIndexInLevel = 0;
    mistakesThisLevel = 0;
    correctAnswersThisLevel = 0;

    updateAllScoreDisplays();

    const difficultyKey = currentDifficulty;
    const translatedPrefix = translations[currentLanguage]?.currentLevelPrefix || "Current Level";
    const translatedDifficultyText = translations[currentLanguage]?.[difficultyKey] || (difficultyKey.charAt(0).toUpperCase() + difficultyKey.slice(1));
    if (currentLevelDisplayElement) currentLevelDisplayElement.textContent = `${translatedPrefix}: ${translatedDifficultyText}`;
    if (currentDifficultyNameDisplay) currentDifficultyNameDisplay.textContent = translatedDifficultyText;

    if (answerInput) answerInput.disabled = false;
    if (submitBtn) submitBtn.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.add("hidden");

    updateLivesDisplay();
    console.log("Calling loadNextRiddle from startLevel"); // ADDED log
    loadNextRiddle();

    if (isAuthReady) {
        loadUserHighScore();
    }
}

// Handles level completion and progression
// Flow: 1. Evaluates performance 2. Shows feedback 3. Manages progression 4. Handles completion
function handleLevelEnd() {
    console.log("handleLevelEnd called");
    stopTimer();
    
    // Save progress
    saveUserHighScore();
    
    // Check if there are more difficulty levels
    if (currentDifficultyIndex < difficultyOrder.length - 1) {
        // There's a next level
        if (levelCompletionModal) {
            if (levelCompletionTitle) levelCompletionTitle.textContent = translations[currentLanguage]?.levelCompletedTitle || "Level Completed!";
            if (levelCompletionMessage) levelCompletionMessage.textContent = translations[currentLanguage]?.levelCompletedCongrats || "Excellent work!";
            
            triggerConfetti();
            playCelebrationSoundOrMusic();
            levelCompletionModal.style.display = 'block';
        }
    } else {
        // All levels completed
        if (gameOverModal) {
            if (finalScoreModalDisplay) finalScoreModalDisplay.textContent = overallCorrectScore;
            if (gameOverFinalMessage) gameOverFinalMessage.textContent = translations[currentLanguage]?.allLevelsCompleted || "You've mastered all levels!";
            gameOverModal.style.display = 'block';
        }
    }
}

// Ensure shuffleArray is defined (if not already present)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Prevent multiple answer submissions per question
let answerLocked = false;

// Defensive: Null checks for all DOM queries

// Clean up timers and intervals on reset
function resetFullGame() { 
    stopTimer();
    stopBackgroundMusic(); 
    livesLeft = MAX_LIVES; 
    overallCorrectScore = 0;
    overallWrongScore = 0;
    currentDifficultyIndex = 0; 
    if(document.getElementById('difficultyEasy')) document.getElementById('difficultyEasy').checked = true; 
    welcomeScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    if(gameOverModal) gameOverModal.style.display = "none";
    if(levelCompletionModal) levelCompletionModal.style.display = "none";
    if(maxAttemptsModal) maxAttemptsModal.style.display = "none"; 
    if(gameMenuModal) gameMenuModal.style.display = "none"; 
    updateAllScoreDisplays(); 
    if(playerNameDisplay && playerNameInput) playerNameDisplay.textContent = playerNameInput.value.trim() || "Player";
    if(feedbackDisplay) feedbackDisplay.textContent = "";
    // Clear answer input
    if(answerInput) answerInput.value = '';
    // Reset answer lock
    answerLocked = false;
}

// Language Translations
function applyTranslations(lang) {
    if (!translations[lang]) return;

    // Update all elements with data-translate-key attribute
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update all elements with data-translate-placeholder attribute
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update menu sound/music buttons
    const menuToggleSoundBtn = document.getElementById('menu-toggle-sound');
    const menuToggleMusicBtn = document.getElementById('menu-toggle-music');
    
    if (menuToggleSoundBtn) {
        menuToggleSoundBtn.textContent = translations[lang].menuToggleSound.replace('ON', isSoundEnabled ? 'ON' : 'OFF');
    }
    if (menuToggleMusicBtn) {
        menuToggleMusicBtn.textContent = translations[lang].menuToggleMusic.replace('ON', isMusicEnabled ? 'ON' : 'OFF');
    }

    if (!gameScreen.classList.contains('hidden') && currentLevelDisplayElement) {
        const difficultyKey = currentDifficulty; 
        const translatedPrefix = translations[lang]?.currentLevelPrefix || "Current Level";
        const translatedDifficulty = translations[lang]?.[difficultyKey] || (difficultyKey.charAt(0).toUpperCase() + difficultyKey.slice(1));
        currentLevelDisplayElement.textContent = `${translatedPrefix}: ${translatedDifficulty}`;
        if(currentDifficultyNameDisplay) currentDifficultyNameDisplay.textContent = translatedDifficulty;
    }

    document.querySelectorAll(".flag-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-lang") === lang) {
            btn.classList.add("active");
        }
    });
    localStorage.setItem("selectedQuizLanguage", lang);
}

// Language selection functionality
function initializeLanguageSelection() {
    const flagButtons = document.querySelectorAll('.flag-btn');
    const languageSidebar = document.getElementById('language-sidebar');
    const menuBtn = document.getElementById('menu-btn');

    flagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            if (lang && translations[lang]) {
                currentLanguage = lang;
                applyTranslations(lang);
                languageSidebar.classList.add('hidden');
            }
        });
    });

    // Toggle language sidebar
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            languageSidebar.classList.toggle('hidden');
        });
    }
}

window.onerror = function (message, source, lineno, colno, error) {
    console.error(`Error: ${message} at ${source}:${lineno}:${colno}`, error);
};
