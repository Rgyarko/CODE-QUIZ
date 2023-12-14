const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('time');
let time = 0;
let timer;

// Function to start the timer
function startTimer() {
    countdownElement.textContent = timeRemaining;
    const timeInterval = setInterval(function () {
      timeRemaining--;
      countdownElement.textContent = timeRemaining;
      //  When all questions are answered or the timer reaches 0, then the game is over.
      if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
        clearInterval(timeInterval);
        endQuiz();
      }
    }, 1000);
  }


// Function to handle the next button click
function nextQuestion() {
    // Add logic to load the next question
}

// Event listener for the start button
startButton.addEventListener('click', () => {
    startTimer();
    nextQuestion();
});

// Event listener for the next button
nextButton.addEventListener('click', () => {
    nextQuestion();
});

// Function to display high scores
function displayHighScores() {
    // Add logic to retrieve and display high scores
}

const questions = [
    {
        question: "How Many Dots Appears on a pair dice?",
        options: ["6","5","4","3","2","1"],
        correctAnswer: (21*2)="42"
    },
    // Add more questions as needed
];
