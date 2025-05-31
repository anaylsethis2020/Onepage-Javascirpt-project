// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : { apiKey: "YOUR_API_KEY", authDomain: "YOUR_AUTH_DOMAIN", projectId: "YOUR_PROJECT_ID" }; 
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-emoji-quiz-merged';

let fbApp, fbAuth, fbDb;
let currentUserId = null;
let isAuthReady = false;

try {
    fbApp = initializeApp(firebaseConfig);
    fbAuth = getAuth(fbApp);
    fbDb = getFirestore(fbApp);
    setLogLevel('debug'); 
    console.log("Firebase initialized successfully.");
} catch (error) {
    console.error("Firebase initialization error:", error);
    const gameScreenElement = document.getElementById('gameScreen'); 
    if(gameScreenElement) gameScreenElement.innerHTML = `<p style="color:red;">Error initializing Firebase: ${error.message}. High scores will not be saved.</p>`;
}

// DOM Elements
const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen"); 
const continueBtn = document.getElementById("continueBtn");
const playerNameInput = document.getElementById("playerName");
const playerAgeInput = document.getElementById("playerAge");
const playerGenderSelect = document.getElementById("playerGender");
const playerNameDisplay = document.getElementById("playerNameDisplay");

const emojiDisplay = document.getElementById("emoji");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const hintBtn = document.getElementById("hintBtn"); 
const nextBtn = document.getElementById("nextBtn");
const restartLevelBtn = document.getElementById("restartLevelBtn");
const restartGameBtn = document.getElementById("restartGameBtn"); 

const overallCorrectScoreDisplay = document.getElementById("overallCorrectScoreDisplay"); 
const overallWrongScoreDisplay = document.getElementById("overallWrongScoreDisplay"); 
const levelCorrectScoreDisplay = document.getElementById("levelCorrectScoreDisplay"); 
const levelWrongScoreDisplay = document.getElementById("levelWrongScoreDisplay"); 
const currentDifficultyNameDisplay = document.getElementById("currentDifficultyNameDisplay"); 

const feedbackDisplay = document.getElementById("feedback");
const highScoreDisplay = document.getElementById("highScoreDisplay"); 
const livesLeftDisplay = document.getElementById("livesLeftDisplay"); 
const currentLevelDisplayElement = document.getElementById("current-level-display"); 

const themeToggle = document.getElementById('theme-toggle');
const themeIconLight = document.getElementById('theme-icon-light');
const themeIconDark = document.getElementById('theme-icon-dark');
const menuBtn = document.getElementById('menu-btn'); 

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

const backgroundMusic = document.getElementById('background-music'); 
const celebrationAudio = document.getElementById('celebration-audio'); 


const timerSVGPath = document.querySelector("#timerDisplay .timer-progress");
const timerText = document.getElementById("timerText");
const FULL_DASH_ARRAY = 282.743; 
const TIME_LIMIT = 30; 
let timeLeft = TIME_LIMIT;
let timerInterval = null;

// Sound & Music Control
let isSoundEnabled = true; 
let isMusicEnabled = true; 
let synth; 

if (typeof Tone !== 'undefined') {
    synth = new Tone.Synth().toDestination();
} else {
    console.warn("Tone.js not loaded. Simple sound effects will be disabled.");
    synth = { triggerAttackRelease: () => console.log("Sound fallback: Beep!") };
}

// --- Music Controls ---
function playBackgroundMusic() {
    if (backgroundMusic && isMusicEnabled) { 
        if (!backgroundMusic.src || backgroundMusic.src.endsWith('/index.html') || backgroundMusic.src === window.location.href ) { 
             backgroundMusic.src = "Music/during gameplay.mp3"; // Corrected path
        }
        backgroundMusic.volume = 0.2; 
        backgroundMusic.play().catch(error => {
            console.warn("Background music autoplay was prevented.", error);
        });
    } else if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

function pauseBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; 
    }
}

function playCelebrationSoundOrMusic() { 
    if (isSoundEnabled) { 
        if (celebrationAudio && isMusicEnabled) { 
            if (!celebrationAudio.src || celebrationAudio.src.endsWith('/index.html') || celebrationAudio.src === window.location.href) {
                celebrationAudio.src = "Music/level complete celebration.mp3"; // Corrected path
            }
            celebrationAudio.volume = 0.5;
            celebrationAudio.play().catch(error => {
                console.warn("Celebration sound playback error.", error);
            });
        } else if (synth && typeof Tone !== 'undefined') { 
            const now = Tone.now();
            synth.triggerAttackRelease("C4", "8n", now);
            synth.triggerAttackRelease("E4", "8n", now + 0.2);
            synth.triggerAttackRelease("G4", "8n", now + 0.4);
            synth.triggerAttackRelease("C5", "4n", now + 0.6);
        }
    }
}

function playIncorrectSound() {
     if (isSoundEnabled && synth && typeof Tone !== 'undefined') {
        synth.triggerAttackRelease("A2", "8n", Tone.now());
    }
}

// Confetti Function
function triggerConfetti() {
    const modalContent = levelCompletionModal.querySelector('.modal-content');
    if (!modalContent) return;

    for (let i = 0; i < 50; i++) { 
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti');
        
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#fa0', '#0fa']; 
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        confettiPiece.style.left = Math.random() * modalContent.offsetWidth + 'px';
        confettiPiece.style.top = (Math.random() * -50) - 20 + 'px'; 
        
        confettiPiece.style.animationDuration = (Math.random() * 2 + 2) + 's'; 
        confettiPiece.style.animationDelay = Math.random() * 1 + 's'; 
        confettiPiece.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`; 
        
        modalContent.appendChild(confettiPiece);

        confettiPiece.addEventListener('animationend', () => {
            confettiPiece.remove();
        });
    }
}


// Riddles structured by difficulty
const allRiddles = {
    easy: [
        { emoji: "🇯 🍳", answer: "japan" }, { emoji: "👙💤🤧", answer: "brazil" },
        { emoji: "🔗🅰️", answer: "china" }, { emoji: "4️⃣🐜🐜", answer: "france" },
        { emoji: "🍐🦘", answer: "peru" }
    ],
    medium: [
        { emoji: "🧊🅰️", answer: "cuba" }, { emoji: "🍳🅰️🤰", answer: "panama" },
        { emoji: "🐄🪨🅾️", answer: "morocco" }, { emoji: "🐋🐬", answer: "wales" },
        { emoji: "👖✅", answer: "denmark" }, { emoji: "⚓🇺⚽", answer: "portugal" }, 
        { emoji: "🧍‍♂️🅰️", answer: "kenya" }
    ],
    hard: [
        { emoji: "🆕💤🖼️", answer: "new zealand" }, { emoji: "📩🦌🦵🅰️", answer: "indonesia" },
        { emoji: "💈🖼️", answer: "poland" }, { emoji: "👁🏃", answer: "iran" },
        { emoji: "🎤🅰️🫖", answer: "singapore" }, 
        { emoji: "🍭🍬👖", answer: "sweden" },
        { emoji: "S👂🐝🅰️", answer: "serbia" }, { emoji: "😡⛽🚗", answer: "madagascar" }
    ]
};
const difficultyOrder = ['easy', 'medium', 'hard'];
let currentDifficultyIndex = 0;
let currentDifficulty = 'easy';
let riddles = [];
let currentRiddleIndexInLevel = 0;

// Score variables
let overallCorrectScore = 0;
let overallWrongScore = 0;
let correctAnswersThisLevel = 0; 
let mistakesThisLevel = 0; 

let currentHighScore = 0;

const MAX_LIVES = 3; 
let livesLeft = MAX_LIVES;


// --- Firebase Authentication & Data ---
async function initializeUserSession() {
    if (!fbAuth) { 
        console.warn("Firebase Auth not available. Skipping user session initialization.");
        if(playerNameDisplay) playerNameDisplay.textContent = playerNameInput.value.trim() || "Player";
        isAuthReady = true; 
        await loadUserHighScore(); 
        updateLivesDisplay(); 
        return;
    }
    onAuthStateChanged(fbAuth, async (user) => {
        if (user) {
            currentUserId = user.uid;
            const nameToDisplay = playerNameInput.value.trim() || "Player";
            if(playerNameDisplay) playerNameDisplay.textContent = nameToDisplay;
            isAuthReady = true;
            console.log("User signed in:", currentUserId);
            await loadUserHighScore();
            updateLivesDisplay(); 
        } else {
            console.log("User not signed in. Attempting anonymous/custom token sign-in.");
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await signInWithCustomToken(fbAuth, __initial_auth_token);
                } else {
                    await signInAnonymously(fbAuth);
                }
            } catch (error) {
                console.error("Sign-in error:", error);
                if(playerNameDisplay) playerNameDisplay.textContent = playerNameInput.value.trim() || "Player (Offline)";
                isAuthReady = true; 
                await loadUserHighScore(); 
                updateLivesDisplay(); 
            }
        }
    });
}

async function loadUserHighScore() {
    if(highScoreDisplay) highScoreDisplay.textContent = currentHighScore; 
    if (!currentUserId || !fbDb) {
        return;
    }
    const scoreRef = doc(fbDb, `artifacts/${appId}/users/${currentUserId}/emojiQuizScores/playerData`);
    try {
        const docSnap = await getDoc(scoreRef);
        if (docSnap.exists()) {
            currentHighScore = docSnap.data().highScore || 0;
        } else {
            currentHighScore = 0; 
        }
        if(highScoreDisplay) highScoreDisplay.textContent = currentHighScore;
    } catch (error) {
        console.error("Error loading high score:", error);
    }
}

async function saveUserHighScore() {
    if (!currentUserId || !fbDb) return;
    if (overallCorrectScore > currentHighScore) {
        currentHighScore = overallCorrectScore;
        if(highScoreDisplay) highScoreDisplay.textContent = currentHighScore;
        const scoreRef = doc(fbDb, `artifacts/${appId}/users/${currentUserId}/emojiQuizScores/playerData`);
        try {
            await setDoc(scoreRef, { 
                highScore: currentHighScore, 
                lastPlayed: serverTimestamp(),
                playerName: playerNameInput.value.trim() || "Anonymous" 
            }, { merge: true });
            console.log("High score saved.");
        } catch (error) {
            console.error("Error saving high score:", error);
        }
    }
}
        
// --- Theme Toggle ---
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        if(themeIconLight) themeIconLight.classList.add('hidden');
        if(themeIconDark) themeIconDark.classList.remove('hidden');
    } else {
        document.body.classList.remove('dark');
        if(themeIconLight) themeIconLight.classList.remove('hidden');
        if(themeIconDark) themeIconDark.classList.add('hidden');
    }
}
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('emojiQuizTheme', newTheme);
    });
}


// --- Timer Logic ---
function resetTimer() {
    stopTimer();
    timeLeft = TIME_LIMIT;
    if (timerText) timerText.textContent = timeLeft;
    setCircleDashoffset(0); 
}

function startTimer() {
    resetTimer(); 
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timerText) timerText.textContent = timeLeft;
        setCircleDashoffset(((TIME_LIMIT - timeLeft) / TIME_LIMIT) * FULL_DASH_ARRAY);

        if (timeLeft <= 0) {
            stopTimer();
            handleTimeUp();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function setCircleDashoffset(offset) {
    if(timerSVGPath) timerSVGPath.style.strokeDashoffset = offset;
}

function handleTimeUp() {
    feedbackDisplay.textContent = `${translations[currentLanguage]?.timeUp || "Time's up!"} ${translations[currentLanguage]?.correctAnswerWas || "It was"} ${riddles[currentRiddleIndexInLevel].answer}`;
    feedbackDisplay.className = "incorrect";
    playIncorrectSound();
    
    overallWrongScore++;
    mistakesThisLevel++; 
    livesLeft--; 
    
    updateAllScoreDisplays();
    updateLivesDisplay();
    
    if (livesLeft <= 0) {
        triggerNoLivesGameOver();
        return;
    }
    
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    answerInput.disabled = true;
}

function updateAllScoreDisplays() {
    if(overallCorrectScoreDisplay) overallCorrectScoreDisplay.textContent = overallCorrectScore;
    if(overallWrongScoreDisplay) overallWrongScoreDisplay.textContent = overallWrongScore;
    if(levelCorrectScoreDisplay) levelCorrectScoreDisplay.textContent = correctAnswersThisLevel;
    if(levelWrongScoreDisplay) levelWrongScoreDisplay.textContent = mistakesThisLevel; 
}


// --- Game Logic ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateLivesDisplay() { 
    if(livesLeftDisplay) livesLeftDisplay.textContent = livesLeft;
}

function resetFullGame() { 
    stopTimer();
    stopBackgroundMusic(); 
    livesLeft = MAX_LIVES; 
    // updateLivesDisplay(); // Not needed here, welcome screen is shown

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
}


async function startGameSession() { 
    livesLeft = MAX_LIVES; 
    updateLivesDisplay(); 
    if (isMusicEnabled) playBackgroundMusic(); 

    const selectedDifficultyInput = document.querySelector('input[name="difficulty"]:checked');
    currentDifficulty = selectedDifficultyInput ? selectedDifficultyInput.value : 'easy';
    currentDifficultyIndex = difficultyOrder.indexOf(currentDifficulty);

    const name = playerNameInput.value.trim();
    if(playerNameDisplay) playerNameDisplay.textContent = name || "Player";
    
    if (!isAuthReady) { 
        await initializeUserSession(); 
    }

    welcomeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    if(maxAttemptsModal) maxAttemptsModal.style.display = "none"; 
    
    overallCorrectScore = 0; 
    overallWrongScore = 0;   
    
    startLevel(); 
}

function startLevel() {
    currentDifficulty = difficultyOrder[currentDifficultyIndex];
    riddles = [...allRiddles[currentDifficulty]];
    shuffleArray(riddles);
    
    currentRiddleIndexInLevel = 0;
    mistakesThisLevel = 0; 
    correctAnswersThisLevel = 0; 

    updateAllScoreDisplays(); 
    
    const difficultyKey = currentDifficulty; 
    const translatedPrefix = translations[currentLanguage]?.currentLevelPrefix || "Current Level";
    const translatedDifficulty = translations[currentLanguage]?.[difficultyKey] || (difficultyKey.charAt(0).toUpperCase() + difficultyKey.slice(1));
    if(currentLevelDisplayElement) currentLevelDisplayElement.textContent = `${translatedPrefix}: ${translatedDifficulty}`;
    if(currentDifficultyNameDisplay) currentDifficultyNameDisplay.textContent = translatedDifficulty;


    answerInput.disabled = false;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    
    updateLivesDisplay(); 
    loadNextRiddle();
    if (isAuthReady) { 
        loadUserHighScore(); 
    }
}


function loadNextRiddle() {
    if (livesLeft <= 0) { 
        triggerNoLivesGameOver();
        return;
    }
    if (currentRiddleIndexInLevel < riddles.length) {
        const riddle = riddles[currentRiddleIndexInLevel];
        emojiDisplay.textContent = riddle.emoji;
        answerInput.value = "";
        feedbackDisplay.textContent = "";
        feedbackDisplay.className = ""; 
        answerInput.focus();
        submitBtn.classList.remove("hidden");
        nextBtn.classList.add("hidden");
        answerInput.disabled = false;
        startTimer();
    } else {
        handleLevelEnd();
    }
}

function handleSubmitAnswer() {
    stopTimer();
    const userAnswer = answerInput.value.trim().toLowerCase();
    let wasCorrect = false;

    if (!userAnswer) { 
         feedbackDisplay.textContent = translations[currentLanguage]?.emptyAnswer || "Please enter an answer.";
         feedbackDisplay.className = "incorrect";
         playIncorrectSound();
         overallWrongScore++;
         mistakesThisLevel++;
         livesLeft--; 
    } else {
        const correctAnswer = riddles[currentRiddleIndexInLevel].answer.toLowerCase();
        if (userAnswer === correctAnswer) {
            feedbackDisplay.textContent = translations[currentLanguage]?.correctFeedback || "✅ Correct!";
            feedbackDisplay.className = "correct";
            overallCorrectScore++;
            correctAnswersThisLevel++;
            saveUserHighScore(); 
            wasCorrect = true;
        } else {
            feedbackDisplay.textContent = `${translations[currentLanguage]?.incorrectFeedback || "❌ Incorrect!"} ${translations[currentLanguage]?.correctAnswerWas || "It was"} ${correctAnswer}`;
            feedbackDisplay.className = "incorrect";
            playIncorrectSound();
            overallWrongScore++;
            mistakesThisLevel++;
            livesLeft--; 
        }
    }
    updateAllScoreDisplays();
    updateLivesDisplay();

    if (livesLeft <= 0) {
        triggerNoLivesGameOver();
        return;
    }

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    answerInput.disabled = true;
}

function handleLevelEnd() {
    stopTimer();
    if (mistakesThisLevel <= 1) {
        levelCompletionTitle.textContent = `${translations[currentLanguage]?.level || "Level"} ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} ${translations[currentLanguage]?.completed || "Completed"}!`;
        levelCompletionMessage.textContent = translations[currentLanguage]?.levelCompletedCongrats || "Excellent work!";
        playCelebrationSoundOrMusic(); 
        triggerConfetti(); 
        levelCompletionModal.style.display = "block"; 
        if (currentDifficultyIndex >= difficultyOrder.length - 1) { 
            levelCompletionNextLevelButton.classList.add('hidden'); 
             levelCompletionMessage.textContent += ` ${translations[currentLanguage]?.allLevelsCompleted || "You've mastered all levels!"}`;
        } else {
            levelCompletionNextLevelButton.classList.remove('hidden');
        }
    } else { 
        triggerGameOver(false, true); 
    }
}

function triggerNoLivesGameOver() {
    stopTimer();
    stopBackgroundMusic();
    if(gameOverFinalMessage) gameOverFinalMessage.textContent = translations[currentLanguage]?.gameOverNoLives || "No lives left! Game Over.";
    if(finalScoreModalDisplay) finalScoreModalDisplay.textContent = overallCorrectScore;
    if(gameOverModal) gameOverModal.style.display = "block"; 
    
    answerInput.disabled = true;
    submitBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
}

function triggerGameOver(allLevelsSuccessfullyCompleted = true, levelFailedDue toMistakes = false) { 
    stopTimer();
    stopBackgroundMusic();
    if(finalScoreModalDisplay) finalScoreModalDisplay.textContent = overallCorrectScore;
    
    let msgKey;
    if (allLevelsSuccessfullyCompleted) {
        msgKey = "gameOverMessage"; 
    } else if (levelFailedDueToMistakes) {
        msgKey = "gameOverLevelFailedMistakes";
    }
    else { 
         msgKey = "gameOverManyMistakesOrEarlyExit"; 
    }
    
    if(gameOverFinalMessage) gameOverFinalMessage.textContent = translations[currentLanguage]?.[msgKey] || "Game Over. Thanks for playing!";


    if(gameOverModal) gameOverModal.style.display = "block"; 
    answerInput.disabled = true;
    submitBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
}

// Function to handle "Continue" button click
continueBtn.addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();
    const playerAge = playerAgeInput.value.trim();
    const playerGender = playerGenderSelect.value;

    if (!playerName || !playerAge || !playerGender) {
        alert("Please fill out all fields before continuing.");
        return;
    }

    // Display player name and hide welcome screen
    playerNameDisplay.textContent = playerName;
    welcomeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    // Show "How to Play" instructions
    const howToPlayElement = document.getElementById("howToPlay");
    howToPlayElement.textContent = "Guess the country using emojis! Type your answer below.";
    howToPlayElement.classList.remove("hidden");
});

if(submitBtn) submitBtn.addEventListener("click", handleSubmitAnswer);
if(answerInput) answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !submitBtn.classList.contains("hidden")) {
        handleSubmitAnswer();
    }
});

if(nextBtn) nextBtn.addEventListener("click", () => {
    currentRiddleIndexInLevel++;
    loadNextRiddle();
});

if(restartLevelBtn) restartLevelBtn.addEventListener("click", () => {
    stopTimer(); 
    startLevel(); 
});

if(restartGameBtn) restartGameBtn.addEventListener("click", resetFullGame); 

// Menu Button Logic
if(menuBtn) menuBtn.addEventListener('click', () => {
    if(gameMenuModal) gameMenuModal.style.display = 'block';
});
if(gameMenuModalClose) gameMenuModalClose.onclick = () => gameMenuModal.style.display = 'none';
if(menuReturnWelcomeBtn) menuReturnWelcomeBtn.addEventListener('click', () => {
    if(gameMenuModal) gameMenuModal.style.display = 'none';
    resetFullGame();
});
if(menuToggleSoundBtn) menuToggleSoundBtn.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled; 
    menuToggleSoundBtn.textContent = `${translations[currentLanguage]?.menuSound || "Sound"}: ${isSoundEnabled ? (translations[currentLanguage]?.soundOn || "ON") : (translations[currentLanguage]?.soundOff || "OFF")}`;
    localStorage.setItem('emojiQuizSoundEnabled', isSoundEnabled);
    if (!isSoundEnabled) {
        if (celebrationAudio) celebrationAudio.pause(); 
    }
});

if(menuToggleMusicBtn) menuToggleMusicBtn.addEventListener('click', () => {
    isMusicEnabled = !isMusicEnabled;
    menuToggleMusicBtn.textContent = `${translations[currentLanguage]?.menuMusic || "Music"}: ${isMusicEnabled ? (translations[currentLanguage]?.musicOn || "ON") : (translations[currentLanguage]?.musicOff || "OFF")}`;
    localStorage.setItem('emojiQuizMusicEnabled', isMusicEnabled);
    if (isMusicEnabled) {
        playBackgroundMusic();
    } else {
        pauseBackgroundMusic();
    }
});


// Modal listeners
if(modalCloseButton) modalCloseButton.onclick = () => gameOverModal.style.display = "none";
if(modalPlayAgainButton) modalPlayAgainButton.onclick = () => { 
    gameOverModal.style.display = "none";
    resetFullGame(); 
};

if(levelCompletionModalClose) levelCompletionModalClose.onclick = () => levelCompletionModal.style.display = "none";
if(levelCompletionNextLevelButton) levelCompletionNextLevelButton.onclick = () => {
    levelCompletionModal.style.display = "none";
    if (currentDifficultyIndex < difficultyOrder.length - 1) {
        currentDifficultyIndex++;
        startLevel();
    } else {
        triggerGameOver(true); 
    }
};
if(levelCompletionPlayAgainButton) levelCompletionPlayAgainButton.onclick = () => {
    levelCompletionModal.style.display = "none";
    startLevel(); 
};

if(maxAttemptsModalClose) maxAttemptsModalClose.onclick = () => maxAttemptsModal.style.display = "none";
if(maxAttemptsRestartGameButton) maxAttemptsRestartGameButton.onclick = () => {
    if(maxAttemptsModal) maxAttemptsModal.style.display = "none";
    resetFullGame();
};

window.onclick = (event) => {
    if (event.target == gameOverModal) gameOverModal.style.display = "none";
    if (event.target == levelCompletionModal) levelCompletionModal.style.display = "none";
    if (event.target == maxAttemptsModal) maxAttemptsModal.style.display = "none";
    if (event.target == gameMenuModal) gameMenuModal.style.display = "none"; 
};


// --- Language Translations ---
const translations = {
    us: { menuMusic: "Music", musicOn: "ON", musicOff: "OFF", menu: "Menu", menuTitle: "Game Menu", menuReturnToWelcome: "Return to Welcome", menuToggleSound: "Toggle Sound", menuSound: "Sound", soundOn: "ON", soundOff: "OFF", currentLevelPrefix: "Current Level", gameScorePrefix: "Game", levelScorePrefix: "Level", livesLeftLabel: "Lives Left:", gameOverNoLives: "No lives left! Game Over. Starting a new game...", selectLanguage: "Select language", welcomeTitle: "Welcome to the Ultimate Emoji Country Quiz!", enterNamePlaceholder: "Enter your name", enterAgePlaceholder: "Enter your age", selectGender: "Select your gender", male: "Male", female: "Female", other: "Other", continue: "Continue", instruction: "Guess the country using emojis!", typeAnswerPlaceholder: "Type your answer here...", highScoreLabel: "High Score:", correctScoreLabel: "Correct:", wrongScoreLabel: "Wrong:", submit: "Submit", hint: "Hint", next: "Next", restartGame: "Restart Full Game", footerText: "© 2025 Emoji Quiz | Voice Powered Quiz (Original by Abel Beyene)", gameOverTitle: "Game Over!", gameOverMessage: "You've completed all available riddles!", finalScoreLabel: "Your final score:", playAgainFromWelcome: "Start New Game (from Welcome)", correctFeedback: "✅ Correct!", incorrectFeedback: "❌ Incorrect!", correctAnswerWas: "It was", playerNameLabel: "Player:", selectDifficulty: "Select Difficulty", easy: "Easy", medium: "Medium", hard: "Hard", levelCompletedTitle: "Level Completed!", levelCompletedMessageDefault: "Well done!", nextLevel: "Next Level", level: "Level", completed: "Completed", levelCompletedCongrats: "Excellent work!", allLevelsCompleted: "You've mastered all levels!", timeUp: "Time's up!", emptyAnswer: "Please enter an answer.", levelMistakesLabel: "Mistakes this level:", gameOverManyMistakesOrEarlyExit: "Good effort! Try again to improve your score.", restartLevel: "Restart Level", maxAttemptsTitle: "Max Attempts Reached", maxAttemptsMessage: "You've used all your game attempts. Restart the full game to play again with fresh attempts.", playAgainSameLevel: "Play Again (Same Level)", gameOverLevelFailedMistakes: "Too many mistakes this level. Better luck next attempt!" },
    es: { menuMusic: "Música", musicOn: "SÍ", musicOff: "NO", menu: "Menú", menuTitle: "Menú del Juego", menuReturnToWelcome: "Volver a Bienvenida", menuToggleSound: "Activar/Desactivar Sonido", menuSound: "Sonido", soundOn: "SÍ", soundOff: "NO", currentLevelPrefix: "Nivel Actual", gameScorePrefix: "Juego", levelScorePrefix: "Nivel", livesLeftLabel: "Vidas Restantes:", gameOverNoLives: "¡No quedan vidas! Fin del juego. Empezando un juego nuevo...", selectLanguage: "Selecciona el idioma", welcomeTitle: "¡Bienvenido al Quiz Definitivo de Países con Emojis!", enterNamePlaceholder: "Ingresa tu nombre", enterAgePlaceholder: "Ingresa tu edad", selectGender: "Selecciona tu género", male: "Masculino", female: "Femenino", other: "Otro", continue: "Continuar", instruction: "¡Adivina el país usando emojis!", typeAnswerPlaceholder: "Escribe tu respuesta aquí...", highScoreLabel: "Puntuación Máxima:", correctScoreLabel: "Correctas:", wrongScoreLabel: "Incorrectas:", submit: "Enviar", hint: "Pista", next: "Siguiente", restartGame: "Reiniciar Juego Completo", footerText: "© 2025 Emoji Quiz | Quiz por Voz (Original por Abel Beyene)", gameOverTitle: "¡Juego Terminado!", gameOverMessage: "¡Has completado todos los acertijos disponibles!", finalScoreLabel: "Tu puntuación final:", playAgainFromWelcome: "Nuevo Juego (desde Bienvenida)", correctFeedback: "✅ ¡Correcto!", incorrectFeedback: "❌ ¡Incorrecto!", correctAnswerWas: "La respuesta era", playerNameLabel: "Jugador:", selectDifficulty: "Selecciona Dificultad", easy: "Fácil", medium: "Medio", hard: "Difícil", levelCompletedTitle: "¡Nivel Completado!", levelCompletedMessageDefault: "¡Bien hecho!", nextLevel: "Siguiente Nivel", level: "Nivel", completed: "Completado", levelCompletedCongrats: "¡Excelente trabajo!", allLevelsCompleted: "¡Has dominado todos los niveles!", timeUp: "¡Se acabó el tiempo!", emptyAnswer: "Por favor, ingresa una respuesta.", levelMistakesLabel: "Errores este nivel:", gameOverManyMistakesOrEarlyExit: "¡Buen esfuerzo! Intenta de nuevo para mejorar.", restartLevel: "Reiniciar Nivel", maxAttemptsTitle: "Máximos Intentos Alcanzados", maxAttemptsMessage: "Has usado todos tus intentos. Reinicia el juego completo para jugar de nuevo con intentos frescos.", playAgainSameLevel: "Jugar de Nuevo (Mismo Nivel)", gameOverLevelFailedMistakes: "Demasiados errores en este nivel. ¡Mejor suerte en el próximo intento!" },
    // ... other language translations would need 'menuMusic', 'musicOn', 'musicOff' added ...
};
let currentLanguage = 'us'; 

function applyTranslations(lang) {
    currentLanguage = lang;
    const translationSet = translations[lang] || translations.us; 
    document.querySelectorAll("[data-translate-key]").forEach(el => {
        const key = el.getAttribute("data-translate-key");
        if (translationSet[key]) {
            el.textContent = translationSet[key];
        } else if (translations.us[key]) { 
             el.textContent = translations.us[key];
        }
    });
    document.querySelectorAll("[data-translate-placeholder]").forEach(el => {
        const key = el.getAttribute("data-translate-placeholder");
        if (translationSet[key]) {
            el.placeholder = translationSet[key];
        } else if (translations.us[key]) { 
            el.placeholder = translations.us[key];
        }
    });

    if (!gameScreen.classList.contains('hidden') && currentLevelDisplayElement) {
        const difficultyKey = currentDifficulty; 
        const translatedPrefix = translations[currentLanguage]?.currentLevelPrefix || "Current Level";
        const translatedDifficulty = translations[currentLanguage]?.[difficultyKey] || (difficultyKey.charAt(0).toUpperCase() + difficultyKey.slice(1));
        currentLevelDisplayElement.textContent = `${translatedPrefix}: ${translatedDifficulty}`;
        if(currentDifficultyNameDisplay) currentDifficultyNameDisplay.textContent = translatedDifficulty;
    }
    if(menuToggleSoundBtn) menuToggleSoundBtn.textContent = `${translations[currentLanguage]?.menuSound || "Sound"}: ${isSoundEnabled ? (translations[currentLanguage]?.soundOn || "ON") : (translations[currentLanguage]?.soundOff || "OFF")}`;
    if(menuToggleMusicBtn) menuToggleMusicBtn.textContent = `${translations[currentLanguage]?.menuMusic || "Music"}: ${isMusicEnabled ? (translations[currentLanguage]?.musicOn || "ON") : (translations[currentLanguage]?.musicOff || "OFF")}`;


    document.querySelectorAll(".flag-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-lang") === lang) {
            btn.classList.add("active");
        }
    });
    localStorage.setItem("selectedQuizLanguage", lang);
}

// Initial setup calls wrapped in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Theme setup
    const savedUserTheme = localStorage.getItem('emojiQuizTheme');
    if (savedUserTheme) {
        applyTheme(savedUserTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Sound & Music preference setup
    const savedSoundPref = localStorage.getItem('emojiQuizSoundEnabled');
    if (savedSoundPref !== null) {
        isSoundEnabled = savedSoundPref === 'true';
    }
    const savedMusicPref = localStorage.getItem('emojiQuizMusicEnabled');
    if (savedMusicPref !== null) {
        isMusicEnabled = savedMusicPref === 'true';
    }
   
    // Defer language and Firebase initialization
    setTimeout(() => {
        const savedLang = localStorage.getItem("selectedQuizLanguage");
        if (savedLang && translations[savedLang]) {
            applyTranslations(savedLang);
        } else {
            applyTranslations('us');
        }
        
        if (fbAuth || fbDb) { 
            initializeUserSession(); 
        } else {
            console.warn("Firebase not fully initialized at script start. High score and attempts functionality may be limited.");
            if(playerNameDisplay) playerNameDisplay.textContent = playerNameInput.value.trim() || "Player"; 
            isAuthReady = true; 
            livesLeft = MAX_LIVES; 
            updateLivesDisplay(); 
            initializeUserSession(); 
        }
    }, 0);


    // Event listeners for flag buttons 
    document.querySelectorAll(".flag-btn").forEach(button => {
        button.addEventListener("click", () => {
            const selectedLang = button.getAttribute("data-lang");
            applyTranslations(selectedLang); 
        });
    });
});

window.onerror = function (message, source, lineno, colno, error) {
    console.error(`Error: ${message} at ${source}:${lineno}:${colno}`, error);
};
