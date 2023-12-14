// Variable Selectors
// Quiz
const answersContainerElement = document.querySelector("#answers");
const correctIncorrectText = document.querySelector("#correct-incorrect");
const countdownElement = document.querySelector("#time");
const doneContainerElement = document.querySelector("#done");
const introductionContainerElement = document.querySelector("#introduction");
const questionContainerElement = document.querySelector("#question");
const quizContainerElement = document.querySelector("#quiz");
const scoreContainerElement = document.querySelector("#score");
const startQuizButtonElement = document.querySelector("#button__start-quiz");
// Store High Scores
const clearScoresButtonElement = document.querySelector(
  "#clear"
);
const initialsInputElement = document.querySelector("#initials");
const formElement = document.querySelector("#form");
const goBackButtonElement = document.querySelector("#back");
const highScoresContainerElement = document.querySelector(
  "#high-scores-container"
);
const scoresContainerElement = document.querySelector("#high-scores");

// Other Variables
// Quiz
let currentQuestionIndex = 0;
let timeRemaining = 75;
// Store High Scores
let scoresArray;
if (localStorage.getItem("scores")) {
  scoresArray = JSON.parse(localStorage.getItem("scores"));
} else {
  scoresArray = [];
}
localStorage.setItem("scores", JSON.stringify(scoresArray));
const data = JSON.parse(localStorage.getItem("scores"));
// View High Scores
const viewHighScoresLinkElement = document.querySelector("#view-high-scores");

// Array of questions
const questionsArray = [
  {
    question: "How Many Dots Appears on a pair dice?:",
    answers: ["6","5","4","3","2","1" ],
    correct: "42",
  },
  {
    question: "What does HTML stand for?",
    answers: ["Hyperlinks and Text Markup Language",
            "Hyper Text Markup language",
            "Home Tool Markup Language"],
    correct: "Hyper Text Markup Language",
  },
  {
    question: "Which is the only body that is fully grown from birth?",
    answers: ["Hair","eyeball","teeth"],
    correct: "eyeball",
  },
  {
    question:
      "String values must be enclosed within what when being assigned to variables?",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing conent to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correct: "console.log",
  },
];

//  click event to View High Scores link
viewHighScoresLinkElement.addEventListener("click", function () {
  scoresContainerElement.classList.remove("hidden");
  introductionContainerElement.classList.add("hidden");
  quizContainerElement.classList.add("hidden");
  doneContainerElement.classList.add("hidden");
});

//  click event to Start Quiz button
startQuizButtonElement.addEventListener("click", startQuiz);

function startQuiz() {
  introductionContainerElement.classList.add("hidden");
  quizContainerElement.classList.remove("hidden");
  startTimer();
  renderQuestion();
}

function startTimer() {
  countdownElement.textContent = timeRemaining;
  const timeInterval = setInterval(function () {
    timeRemaining--;
    countdownElement.textContent = timeRemaining;
    // When all questions are answered or the timer reaches 0, then the game is over.
    if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function renderQuestion() {
  const currentQuestion = questionsArray[currentQuestionIndex];
  questionContainerElement.textContent = currentQuestion.question;
  answersContainerElement.innerHTML = "";
  currentQuestion.answers.forEach(function (answer) {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answersContainerElement.appendChild(answerButton);
    answerButton.addEventListener("click", nextQuestion);
  });
}

function nextQuestion() {
  // When a question is answered correctly or incorrectly, A text should be presented to  tell  correct or incorrect.
  if (this.innerHTML === questionsArray[currentQuestionIndex].correct) {
    // this = button element; this.innerHTML = answer text
    correctIncorrectText.innerHTML = "Correct!";
    timeRemaining += 15;
  } else {
    correctIncorrectText.innerHTML = "Incorrect!";
    // When a question  is answered incorrectly, time is subtracted from the clock.
    timeRemaining -= 15;
  }
  // When a question is answered,then  another question is presnted.
  currentQuestionIndex++;
  // When all questions are answered or the timer reaches 0, then the game is over.
  if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

function endQuiz() {
  quizContainerElement.classList.add("hidden");
  doneContainerElement.classList.remove("hidden");
  scoreContainerElement.innerHTML = timeRemaining;
}

// Makes li Element for High Scores board
function makeLi(text) {
  const li = document.createElement("li");
  li.textContent = text;
  highScoresContainerElement.appendChild(li);
}

// When the game is over, then initials and score are saved .
// Adds submit event to the Form element
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  scoresArray.push(initialsInputElement.value + " - " + timeRemaining);
  localStorage.setItem("scores", JSON.stringify(scoresArray));
  makeLi(initialsInputElement.value + " - " + timeRemaining);
  initialsInputElement.value = "";
  doneContainerElement.classList.add("hidden");
  scoresContainerElement.classList.remove("hidden");
});

data.forEach((item) => {
  makeLi(item);
});

// Adds click event to Go Back button
goBackButtonElement.addEventListener("click", function () {
  location.reload();
});

// Adds click event to Clear High Scores button
clearScoresButtonElement.addEventListener("click", function () {
  localStorage.clear();
  while (highScoresContainerElement.firstChild) {
    highScoresContainerElement.removeChild(
      highScoresContainerElement.firstChild
    );
  }
});

