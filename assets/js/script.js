// Event listener to ensure the DOM is fully loaded before running script
        document.addEventListener('DOMContentLoaded', () => {
            // --- DOM Element Selections ---
            // Get references to all main containers
            const preGameContainer = document.getElementById('pre-game-container');
            const instructionsContainer = document.getElementById('instructions-container');
            const gameContainer = document.getElementById('game-container');
            const summaryContainer = document.getElementById('summary-container');

            // Initial visibility setup: Show pre-game, hide others
            preGameContainer.classList.remove('hidden');
            instructionsContainer.classList.add('hidden');
            gameContainer.classList.add('hidden');
            summaryContainer.classList.add('hidden');

            // Get references to pre-game form elements
            const nameInput = document.getElementById('name-input');
            const ageInput = document.getElementById('age-input');
            const genderSelect = document.getElementById('gender-select');
            const continueButton = document.getElementById('continue-button');

            // Get references to instructions screen elements
            const difficultySelect = document.getElementById('difficulty-select');
            const startButton = document.getElementById('start-button');
            const backButton = document.getElementById('back-button');

            // Get references to game screen elements
            const scoreDisplay = document.getElementById('score');
            const correctAnswersDisplay = document.getElementById('correct-answers'); // Added for correct count
            const incorrectAnswersDisplay = document.getElementById('incorrect-answers'); // Added for incorrect count
            const difficultyDisplay = document.getElementById('difficulty-display'); // Added difficulty display
            const livesDisplay = document.getElementById('lives');
            const timerDisplay = document.getElementById('timer');
            const emojiClueDisplay = document.getElementById('emoji-clue');
            const questionProgressDisplay = document.getElementById('question-progress');
            const answerInput = document.getElementById('answer-input');
            const submitButton = document.getElementById('submit-button');
            const nextButton = document.getElementById('next-button');
            const feedbackDisplay = document.getElementById('feedback');
            const restartLevelButton = document.getElementById('restart-level-button'); 
            const newGameFromGameButton = document.getElementById('new-game-from-game-button'); 
            const hintButton = document.getElementById('hint-button'); // Added Hint button
            const exitGameButton = document.getElementById('exit-game-button'); // Added Exit Game button

            // Get references to summary screen elements
            const finalScoreDisplay = document.getElementById('final-score');
            const newGameButton = document.getElementById('new-game-button'); 
            const nextLevelButton = document.getElementById('next-level-button'); // Added Next Level button
            const exitGameSummaryButton = document.getElementById('exit-game-summary-button'); // Added Exit Game button for summary

            // Get reference to about container and buttons
            const aboutContainer = document.getElementById('about-container');
            const showAboutButton = document.getElementById('show-about-button');
            const backToPreGameButton = document.getElementById('back-to-pregame-button');
            // --- End of DOM Element Selections ---

            // --- Question Bank ---
            // Object containing questions categorized by difficulty
            const questions = {
                easy: [
                    { emoji: "🇯 🍳", answer: "japan", hint: "Island nation in East Asia, capital is Tokyo." },
                    { emoji: "👙💤🤧", answer: "brazil", hint: "Largest country in South America, famous for samba." },
                    { emoji: "🔗🅰️", answer: "china", hint: "Most populous country, known for the Great Wall." },
                    { emoji: "4️⃣🐜🐜", answer: "france", hint: "European country, home to the Eiffel Tower." },
                    { emoji: "🍐🦘", answer: "peru", hint: "South American country, site of Machu Picchu." }
                ],
                medium: [
                    { emoji: "🧊🅰️", answer: "cuba", hint: "Caribbean island nation, capital Havana." },
                    { emoji: "🍳🅰️🤰", answer: "panama", hint: "Connects North and South America, has a famous canal." },
                    { emoji: "🐄🪨🅾️", answer: "morocco", hint: "North African kingdom, borders the Atlantic and Mediterranean." },
                    { emoji: "🐋🐬", answer: "wales", hint: "Part of the United Kingdom, known for its castles." },
                    { emoji: "👖✅", answer: "denmark", hint: "Scandinavian country, home of LEGO." },
                    { emoji: "⚓🇺⚽", answer: "portugal", hint: "Located on the Iberian Peninsula, west of Spain." },
                    { emoji: "🧍‍♂️🅰️", answer: "kenya", hint: "East African country, famous for wildlife safaris." }
                ],
                hard: [
                    { emoji: "🆕💤🖼️", answer: "new zealand", hint: "Island country in the southwestern Pacific Ocean." },
                    { emoji: "📩🦌🦵🅰️", answer: "indonesia", hint: "Archipelago of over 17,000 islands in Southeast Asia." },
                    { emoji: "💈🖼️", answer: "poland", hint: "Central European country, capital is Warsaw." },
                    { emoji: "👁🏃", answer: "iran", hint: "Middle Eastern country, formerly known as Persia." },
                    { emoji: "🎤🅰️🫖", answer: "singapore", hint: "Island city-state off southern Malaysia." },
                    { emoji: "🍭🍬👖", answer: "sweden", hint: "Scandinavian nation with thousands of coastal islands." },
                    { emoji: "S👂🐝🅰️", answer: "serbia", hint: "Landlocked country in Southeast Europe." },
                    { emoji: "😡⛽🚗", answer: "madagascar", hint: "Large island nation off the southeast coast of Africa." }
                ]
            };
            // --- End of Question Bank ---

            // --- Game State Variables ---
            let currentQuestions = []; // Array to hold questions for the current game
            let currentQuestionIndex = 0; // Index of the current question
            let score = 0; // Player's score
            let lives = 3; // Player's lives
            let timer; // Interval ID for the question timer
            let timeLeft = 30; // Time remaining for the current question
            let correctAnswersCount = 0; // Added for correct count
            let incorrectAnswersCount = 0; // Added for incorrect count
            // let musicPlayer; // Tone.js synth instance for music/sound
            // let isMusicPlaying = false; // Flag to track music state
            let hintUsedThisQuestion = false; // Flag to track if hint was used for the current question
            // --- End of Game State Variables ---

            // --- Animation Setup ---
            const backgroundColors = ['#FFD700', '#1E90FF', '#32CD32', '#FF4500']; // Gold, Blue, Green, Red
            let currentColorIndex = 0;

            function changeBackgroundColor() {
                currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
                document.body.style.backgroundColor = backgroundColors[currentColorIndex];
            }
            setInterval(changeBackgroundColor, 5000); // Change color every 5 seconds

            const flagEmojis = ['🇺🇸', '🇧🇷', '🇯🇵', '🇫🇷', '🇨🇳', '🇬🇧', '🇮🇳', '🇨🇦', '🇦🇺', '🇩🇪'];
            const generalEmojis = ['😀', '🎉', '🌟', '🚀', '💡', '🎯', '🏆', '🧩', '🧠', '⏰'];
            const allEmojisForRain = [...flagEmojis, ...generalEmojis];

            function createFloatingEmoji() {
                const emoji = document.createElement('div');
                emoji.classList.add('floating-emoji');
                emoji.textContent = flagEmojis[Math.floor(Math.random() * flagEmojis.length)];
                document.body.appendChild(emoji);

                // Random starting position and animation properties
                const startX = Math.random() * window.innerWidth;
                const startY = window.innerHeight + 50; // Start below the screen
                const endY = -100; // End above the screen
                const duration = Math.random() * 5 + 5; // 5-10 seconds duration
                const delay = Math.random() * 3; // Stagger appearance

                gsap.set(emoji, { x: startX, y: startY, opacity: 0 });
                gsap.to(emoji, {
                    y: endY,
                    opacity: [0.8, 1, 0.8, 0], // Fade in, stay, fade out
                    duration: duration,
                    delay: delay,
                    ease: "power1.inOut",
                    onComplete: () => {
                        emoji.remove(); // Remove emoji from DOM after animation
                    }
                });
            }

            // Create floating emojis at intervals
            // Adjust interval for more or fewer emojis
            setInterval(createFloatingEmoji, 2000); // Create a new floating emoji every 2 seconds


            function createFallingEmoji() {
                const emoji = document.createElement('div');
                emoji.classList.add('floating-emoji'); // Can reuse some styling
                emoji.textContent = allEmojisForRain[Math.floor(Math.random() * allEmojisForRain.length)];
                emoji.style.fontSize = `${Math.random() * 1.5 + 1}em`; // Random size (1em to 2.5em)
                document.body.appendChild(emoji);

                let startX, startY, endX, endY;
                const sideRoll = Math.random();

                if (sideRoll < 0.6) { // 60% chance: Start from Top
                    startX = Math.random() * window.innerWidth;
                    startY = -50; // Start above screen
                    // Emojis from top fall mostly downwards, with a horizontal drift
                    endX = startX + (Math.random() - 0.5) * (window.innerWidth / 4); 
                    endY = window.innerHeight + 50; // End below screen
                    // Ensure endX is within reasonable screen bounds
                    endX = Math.max(-100, Math.min(window.innerWidth + 100, endX));
                } else if (sideRoll < 0.8) { // 20% chance: Start from Left
                    startX = -50; // Start left of screen
                    startY = Math.random() * window.innerHeight; // Random height on the left edge
                    // Emojis from left fall diagonally towards the bottom right area
                    endX = Math.random() * (window.innerWidth / 2) + (window.innerWidth / 2); // Target right half
                    endY = window.innerHeight + 50; // End below screen
                } else { // 20% chance: Start from Right
                    startX = window.innerWidth + 50; // Start right of screen
                    startY = Math.random() * window.innerHeight; // Random height on the right edge
                    // Emojis from right fall diagonally towards the bottom left area
                    endX = Math.random() * (window.innerWidth / 2); // Target left half
                    endY = window.innerHeight + 50; // End below screen
                }

                const duration = Math.random() * 5 + 6; // Duration 6-11 seconds
                const rotation = Math.random() * 360 - 180; // Random rotation

                gsap.set(emoji, { x: startX, y: startY, opacity: 1, rotation: 0 });
                gsap.to(emoji, {
                    x: endX, // Animate x-coordinate
                    y: endY, // Animate y-coordinate
                    rotation: rotation,
                    opacity: 0,
                    duration: duration,
                    ease: "power1.in", // Emojis accelerate as they fall
                    onComplete: () => {
                        emoji.remove();
                    }
                });
            }

            function startEmojiRain() {
                createFallingEmoji();
                requestAnimationFrame(startEmojiRain);
            }

            // Start the emoji rain - call it once to begin the loop
            // To control the density, you might want to call createFallingEmoji on an interval
            // instead of every frame, or add a conditional check inside startEmojiRain.
            // For now, let's create one every few frames for a less dense effect.
            let frameCount = 0;
            function controlledEmojiRain() {
                frameCount++;
                if (frameCount % 10 === 0) { // Create an emoji roughly every 10 frames
                    createFallingEmoji();
                }
                requestAnimationFrame(controlledEmojiRain);
            }
            controlledEmojiRain(); // Start the controlled rain

            // --- End of Animation Setup ---


            // --- Form Validation Functions ---
            // Validates the pre-game form (name, age, gender)
            function validatePreGameForm() {
                // Enable continue button only if all fields are filled
                continueButton.disabled = !(nameInput.value.trim() && ageInput.value && genderSelect.value);
            }

            // Validates the instructions form (difficulty selection)
            function validateInstructionsForm() {
                const difficultySelected = difficultySelect.value;
                // Enable start button only if difficulty is selected
                startButton.disabled = !difficultySelected;

                // Update the time limit display based on selected difficulty
                const timeLimitSpan = document.getElementById('time-limit');
                if (difficultySelected === 'hard') {
                    timeLimitSpan.textContent = '20';
                } else {
                    timeLimitSpan.textContent = '30'; // Default for easy/medium
                }
            }
            // --- End of Form Validation Functions ---

            // --- Event Listeners ---
            // Pre-game form input listeners
            nameInput.addEventListener('input', validatePreGameForm);
            ageInput.addEventListener('input', validatePreGameForm);
            genderSelect.addEventListener('change', validatePreGameForm);

            // Instructions screen difficulty selection listener
            difficultySelect.addEventListener('change', validateInstructionsForm);

            // Button click listeners
            continueButton.addEventListener('click', showInstructions); // Pre-game to Instructions
            startButton.addEventListener('click', startGame);          // Instructions to Game
            backButton.addEventListener('click', goBackToPreGame);      // Instructions to Pre-game
            submitButton.addEventListener('click', checkAnswer);        // Submit answer in game
            restartLevelButton.addEventListener('click', restartCurrentLevel);
            newGameFromGameButton.addEventListener('click', returnToInstructionsFromGame);
            hintButton.addEventListener('click', showHint); // Added listener for hint button
            exitGameButton.addEventListener('click', exitToPreGame); // Added listener for exit game button
            
            // Answer input listener for 'Enter' key press
            answerInput.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    checkAnswer();
                }
            });
            nextButton.addEventListener('click', nextQuestion);         // Go to next question
            
            newGameButton.addEventListener('click', returnToInstructions); // Added listener for new game (back to instructions)
            nextLevelButton.addEventListener('click', startNextLevel); // Added listener for next level
            exitGameSummaryButton.addEventListener('click', exitToPreGameFromSummary); // Listener for Exit Game from Summary
            // musicToggleButton.addEventListener('click', toggleMusic);   // Toggle background music

            // About section button listeners
            showAboutButton.addEventListener('click', () => {
                preGameContainer.classList.add('hidden');
                aboutContainer.classList.remove('hidden');
            });

            backToPreGameButton.addEventListener('click', () => {
                aboutContainer.classList.add('hidden');
                preGameContainer.classList.remove('hidden');
            });
            // --- End of Event Listeners ---

            // --- Navigation Functions ---
            // Shows the instructions screen and hides the pre-game screen
            function showInstructions() {
                preGameContainer.classList.add('hidden');
                aboutContainer.classList.add('hidden'); // Ensure about is hidden too
                instructionsContainer.classList.remove('hidden');
                validateInstructionsForm(); // Ensure start button state is correct on show
            }

            // Shows the pre-game screen and hides the instructions screen
            function goBackToPreGame() {
                instructionsContainer.classList.add('hidden');
                preGameContainer.classList.remove('hidden');
            }

            // Shows the instructions screen from the summary screen
            function returnToInstructions() {
                summaryContainer.classList.add('hidden');
                instructionsContainer.classList.remove('hidden');
                nextLevelButton.classList.add('hidden'); // Ensure next level button is hidden
                validateInstructionsForm(); // Ensure start button state is correct
            }

            // Shows the instructions screen from the game screen
            function returnToInstructionsFromGame() {
                clearInterval(timer); // Stop the game timer
                gameContainer.classList.add('hidden');
                instructionsContainer.classList.remove('hidden');
                validateInstructionsForm(); // Ensure start button state is correct
            }

            // Exits the game and returns to the pre-game screen
            function exitToPreGame() {
                clearInterval(timer); // Stop the game timer
                gameContainer.classList.add('hidden');
                preGameContainer.classList.remove('hidden');

                // Reset pre-game form fields for a clean start
                nameInput.value = '';
                ageInput.value = '';
                genderSelect.value = '';
                validatePreGameForm(); // Update continue button state based on cleared form
            }

            // Exits the game from the summary screen and returns to the pre-game screen
            function exitToPreGameFromSummary() {
                summaryContainer.classList.add('hidden');
                preGameContainer.classList.remove('hidden');
                nextLevelButton.classList.add('hidden'); // Ensure next level button is hidden

                // Reset pre-game form fields for a clean start
                nameInput.value = '';
                genderSelect.value = '';
                validatePreGameForm(); // Update continue button state based on cleared form
            }
            // --- End of Navigation Functions ---

            // --- Core Game Logic Functions ---
            // Initializes and starts the game
            function startGame() {
                instructionsContainer.classList.add('hidden');
                gameContainer.classList.remove('hidden');
                hintUsedThisQuestion = false; 
                hintButton.disabled = false;
                
                const difficulty = difficultySelect.value;
                difficultyDisplay.textContent = `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`; // Display difficulty
                currentQuestions = questions[difficulty]; // Select questions based on difficulty
                currentQuestionIndex = 0;
                score = 0;
                lives = 3;
                correctAnswersCount = 0; // Reset correct count
                incorrectAnswersCount = 0; // Reset incorrect count
                
                updateScore(); // Initialize score display
                updateLives(); // Initialize lives display
                updateCorrectIncorrectDisplay(); // Initialize counts display
                loadQuestion(); // Load the first question
                nextLevelButton.classList.add('hidden'); // Ensure next level button is hidden when a new game starts
            }

            // Restarts the current level
            function restartCurrentLevel() {
                if (!gameContainer.classList.contains('hidden')) { 
                    clearInterval(timer); 
                    hintUsedThisQuestion = false; 
                    hintButton.disabled = false;
                    feedbackDisplay.textContent = ''; // Clear hint/feedback

                    // Reset level-specific state
                    currentQuestionIndex = 0;
                    lives = 3; // Reset lives to full for the level
                    correctAnswersCount = 0; // Reset correct count
                    incorrectAnswersCount = 0; // Reset incorrect count

                    // Update UI
                    updateLives();
                    updateCorrectIncorrectDisplay(); // Update counts display
                    // Score is maintained, so no need to call updateScore unless it changes.
                    // updateScore(); 

                    // Load the first question of the current difficulty
                    loadQuestion();
                }
            }

            // Starts the next difficulty level, preserving lives and score
            function startNextLevel() {
                summaryContainer.classList.add('hidden');
                gameContainer.classList.remove('hidden');
                nextLevelButton.classList.add('hidden'); // Hide it after click

                let newDifficulty;
                const currentDifficulty = difficultySelect.value;

                if (currentDifficulty === 'easy') {
                    newDifficulty = 'medium';
                } else if (currentDifficulty === 'medium') {
                    newDifficulty = 'hard';
                } else {
                    // This case should ideally not be reached if the button is managed correctly.
                    // Fallback to instructions if somehow clicked after 'hard' or error.
                    returnToInstructions(); 
                    return;
                }

                difficultySelect.value = newDifficulty; // IMPORTANT: Update the actual select element
                difficultyDisplay.textContent = `Difficulty: ${newDifficulty.charAt(0).toUpperCase() + newDifficulty.slice(1)}`;
                currentQuestions = questions[newDifficulty];
                currentQuestionIndex = 0;
                // Lives and score are preserved from the previous level
                correctAnswersCount = 0; // Reset counts for the new level
                incorrectAnswersCount = 0; // Reset counts for the new level

                updateScore(); // Update score display (score is preserved)
                updateLives(); // Update lives display (lives are preserved)
                updateCorrectIncorrectDisplay(); // Update counts display
                loadQuestion(); // Load the first question of the new level
            }

            // Loads the current question or ends the game if no more questions
            function loadQuestion() {
                if (currentQuestionIndex < currentQuestions.length) {
                    resetTimer(); 
                    startTimer(); 
                    hintUsedThisQuestion = false; 
                    hintButton.disabled = false; 
                    feedbackDisplay.textContent = ''; // Clear previous hint/feedback
                    

                    const question = currentQuestions[currentQuestionIndex];
                    emojiClueDisplay.textContent = question.emoji;
                    questionProgressDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
                    
                    // Reset input and feedback fields
                    answerInput.value = '';
                    feedbackDisplay.textContent = '';
                    feedbackDisplay.style.color = ''; // Reset feedback color
                    answerInput.disabled = false;
                    submitButton.disabled = false;
                    nextButton.classList.add('hidden'); // Hide next button until answer is submitted
                    answerInput.focus(); // Focus on the answer input field
                } else {
                    // All questions answered
                    endGame("Congratulations!");
                }
            }

            // Shows a hint for the current question, costs one life
            function showHint() {
                if (hintUsedThisQuestion) {
                    feedbackDisplay.textContent = "Hint already used for this question.";
                    feedbackDisplay.style.color = '#e74c3c';
                    return;
                }
                if (lives <= 0) {
                    feedbackDisplay.textContent = "No lives left for a hint!";
                    feedbackDisplay.style.color = '#e74c3c';
                    hintButton.disabled = true; // Disable if no lives at all
                    return;
                }

                // This check is important to ensure there is a question loaded.
                if (!currentQuestions || currentQuestionIndex >= currentQuestions.length) {
                    feedbackDisplay.textContent = "No question loaded to give a hint for.";
                    feedbackDisplay.style.color = '#e74c3c';
                    return;
                }

                lives--;
                updateLives();
                playSound('incorrect'); // Using incorrect sound for losing a life

                const hint = currentQuestions[currentQuestionIndex].hint;
                feedbackDisplay.textContent = `💡 Hint: ${hint} (-1 Life)`;
                feedbackDisplay.style.color = '#fd7e14'; // Orange color for hint message
                hintUsedThisQuestion = true;
                hintButton.disabled = true; 

                if (lives === 0) {
                    clearInterval(timer);
                    answerInput.disabled = true;
                    submitButton.disabled = true;
                    nextButton.classList.remove('hidden');
                    nextButton.focus(); 
                    setTimeout(() => endGame("Game Over! Hint cost the last life."), 1500);
                }
            }

            // Checks the player's answer against the correct answer
            function checkAnswer() {
                if (submitButton.disabled) return; // Prevent double submission if already processed
                
                clearInterval(timer); // Stop the timer
                submitButton.disabled = true; // Disable submit button after an attempt
                const userAnswer = answerInput.value.trim().toLowerCase();
                const correctAnswer = currentQuestions[currentQuestionIndex].answer.toLowerCase();

                if (userAnswer === correctAnswer) {
                    feedbackDisplay.textContent = '✅ Correct!';
                    feedbackDisplay.style.color = '#2ecc71'; // Green for correct
                    score++;
                    correctAnswersCount++; // Increment correct count
                    playSound('correct'); // Play correct answer sound
                } else {
                    feedbackDisplay.textContent = `❌ Incorrect! It\\'s ${correctAnswer}.`;
                    feedbackDisplay.style.color = '#e74c3c'; // Red for incorrect
                    lives--;
                    incorrectAnswersCount++; // Increment incorrect count
                    playSound('incorrect'); // Play incorrect answer sound
                }

                updateScore(); // Update score display
                updateLives(); // Update lives display
                updateCorrectIncorrectDisplay(); // Update counts display
                answerInput.disabled = true; // Disable answer input
                nextButton.classList.remove('hidden'); // Show next question button
                nextButton.focus(); // Focus on next button

                // Check if game over due to no lives
                if (lives === 0) {
                    setTimeout(() => endGame("Game Over!"), 2000); // Delay before showing summary
                }
            }
            
            // Handles the scenario when the timer runs out for a question
            function handleTimeout() {
                if (submitButton.disabled && answerInput.disabled) return; // Prevent double handling if already processed by checkAnswer
                
                clearInterval(timer); // Stop the timer
                feedbackDisplay.textContent = "❌ Time\'s up!";
                feedbackDisplay.style.color = '#e74c3c'; // Red for timeout
                lives--;
                incorrectAnswersCount++; // Increment incorrect count for timeout
                playSound('incorrect'); // Play incorrect sound for timeout
                updateLives(); // Update lives display
                updateCorrectIncorrectDisplay(); // Update counts display
                
                // Disable input and submit button
                answerInput.disabled = true;
                submitButton.disabled = true;
                nextButton.classList.remove('hidden'); // Show next question button
                nextButton.focus();

                // Check if game over due to no lives
                if (lives === 0) {
                    setTimeout(() => endGame("Game Over!"), 2000); // Delay before showing summary
                } else if (currentQuestionIndex >= currentQuestions.length -1 && lives > 0) {
                    // If it's the last question and time runs out, but player has lives, still end game.
                     setTimeout(() => endGame("Game Over!"), 2000);
                }
            }

            // Moves to the next question
            function nextQuestion() {
                currentQuestionIndex++;
                loadQuestion(); // Load the subsequent question
            }

            // Displays a celebration animation when a level is completed
            function displayCelebrationAnimation(summaryHeadingElement) {
                const originalMessage = summaryHeadingElement.textContent;
                // Add emojis with a span for animation targeting
                summaryHeadingElement.innerHTML = `${originalMessage} <span id="celebration-emojis" style="display: inline-block; font-size: 1.2em;">🎉🏆✨</span>`;

                const emojiSpan = document.getElementById('celebration-emojis');
                if (emojiSpan) {
                    let scale = 1;
                    let growing = true;
                    // Simple pulse animation for the emojis
                    const animationInterval = setInterval(() => {
                        scale += growing ? 0.05 : -0.05;
                        if (scale > 1.4) growing = false; // Max scale
                        if (scale < 1.0) growing = true;  // Min scale
                        emojiSpan.style.transform = `scale(${scale})`;
                    }, 100); // Animation speed

                    // After 4 seconds, clear animation and restore original message
                    setTimeout(() => {
                        clearInterval(animationInterval);
                        summaryHeadingElement.textContent = originalMessage; // Restore original text
                    }, 4000); // Duration of the celebration display
                } else {
                    // Fallback if span somehow isn't found, just restore after timeout
                     setTimeout(() => {
                        summaryHeadingElement.textContent = originalMessage;
                    }, 4000);
                }
            }

            // Ends the game and displays the summary screen
            function endGame(message) {
                clearInterval(timer); // Ensure timer is stopped
                gameContainer.classList.add('hidden');
                summaryContainer.classList.remove('hidden');
                const summaryHeading = document.querySelector('#summary-container h2');
                finalScoreDisplay.textContent = `Your final score is: ${score}`;
                nextLevelButton.classList.add('hidden'); // Hide by default, show only if applicable

                if (message === "Congratulations!") {
                    const currentDifficulty = difficultySelect.value;
                    if (currentDifficulty === 'hard') {
                        summaryHeading.textContent = "Congratulations! You\'ve completed all levels!";
                        // nextLevelButton remains hidden
                    } else {
                        summaryHeading.textContent = message; // Regular "Congratulations!"
                        nextLevelButton.classList.remove('hidden'); // Show "Next Level" button
                    }
                    playSound('levelComplete'); // Play level completion sound
                    displayCelebrationAnimation(summaryHeading); // Show celebration animation
                } else {
                    summaryHeading.textContent = message; // e.g., "Game Over!"
                }
            }
            // --- End of Core Game Logic Functions ---

            // --- Timer Functions ---
            function startTimer() {
                const timeLimit = difficultySelect.value === 'hard' ? 20 : 30;
                timeLeft = timeLimit;
                timerDisplay.textContent = `Time: ${timeLeft}`;
                timer = setInterval(() => {
                    timeLeft--;
                    timerDisplay.textContent = `Time: ${timeLeft}`;
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        handleTimeout();
                    }
                }, 1000);
            }

            function resetTimer() {
                clearInterval(timer);
            }
            // --- End of Timer Functions ---

            // --- Animated Sound Effects Setup ---
            // Get references to audio elements
            const correctAudio = document.getElementById('correct-sound');
            const incorrectAudio = document.getElementById('incorrect-sound');
            const clickAudio = document.getElementById('click-sound');
            const gameoverAudio = document.getElementById('gameover-sound');
            const levelupAudio = document.getElementById('levelup-sound');

            // Play sound and animate feedback
            function playSound(soundName) {
                let audioElem = null;
                let animateTarget = feedbackDisplay;
                switch (soundName) {
                    case 'correct':
                        audioElem = correctAudio;
                        gsap.fromTo(animateTarget, { scale: 1 }, { scale: 1.3, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
                        break;
                    case 'incorrect':
                        audioElem = incorrectAudio;
                        gsap.fromTo(animateTarget, { x: 0 }, { x: -10, yoyo: true, repeat: 5, duration: 0.05, ease: 'power1.inOut', onComplete: () => gsap.set(animateTarget, { x: 0 }) });
                        break;
                    case 'click':
                        audioElem = clickAudio;
                        break;
                    case 'gameover':
                        audioElem = gameoverAudio;
                        break;
                    case 'levelComplete':
                        audioElem = levelupAudio;
                        gsap.fromTo(animateTarget, { scale: 1 }, { scale: 1.4, yoyo: true, repeat: 2, duration: 0.18, ease: 'elastic.inOut' });
                        break;
                    default:
                        break;
                }
                if (audioElem) {
                    audioElem.currentTime = 0;
                    audioElem.play();
                }
            }
            // --- End Animated Sound Effects Setup ---

            // --- Utility Functions ---
            // No utility functions were explicitly defined in the original code.
            // This section can be used for any helper functions needed across the script.

            // --- End of Utility Functions ---

            // --- Initial Setup ---
            // No specific initial setup was required in the original code outside of event listeners and DOM readiness.
            // This section can be used for any initialization logic needed at the start.

            // --- End of Initial Setup ---
        });