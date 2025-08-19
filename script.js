// Corporate Quiz Script - Java Questions (5 total)

const questions = [
  { question: "Which of the following is not a Java feature?", answers: [
      { text: "Object-oriented", correct: false },
      { text: "Use of pointers", correct: true },
      { text: "Portable", correct: false },
      { text: "Platform-independent", correct: false }
  ]},
  { question: "Which of these is the entry point of a Java program?", answers: [
      { text: "start()", correct: false },
      { text: "main()", correct: true },
      { text: "run()", correct: false },
      { text: "execute()", correct: false }
  ]},
  { question: "Which keyword is used to inherit a class in Java?", answers: [
      { text: "this", correct: false },
      { text: "super", correct: false },
      { text: "extends", correct: true },
      { text: "implements", correct: false }
  ]},
  { question: "Which of the following is used to handle exceptions in Java?", answers: [
      { text: "goto", correct: false },
      { text: "try-catch", correct: true },
      { text: "throw-catch", correct: false },
      { text: "final", correct: false }
  ]},
  { question: "Which keyword is used to prevent a method from being overridden?", answers: [
      { text: "static", correct: false },
      { text: "constant", correct: false },
      { text: "final", correct: true },
      { text: "super", correct: false }
  ]}
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timer;
let timeLeft = 30;

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerOptions = document.querySelector(".answer-options");
  const timerElement = document.getElementById("timer");
  const nextBtn = document.getElementById("next-btn");

  questionText.textContent = question.question;
  answerOptions.innerHTML = '';

  question.answers.forEach((answer, index) => {
    const label = document.createElement("label");
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = `question-${currentQuestionIndex}`;
    radioButton.value = index;

    const span = document.createElement("span");
    span.textContent = answer.text;

    label.appendChild(radioButton);
    label.appendChild(span);
    answerOptions.appendChild(label);
  });

  // Reset timer
  timeLeft = 30;
  timerElement.textContent = `Time left: ${timeLeft} seconds`;

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);

  // Buttons
  const submitButton = document.querySelector(".submit-btn");
  if (currentQuestionIndex === questions.length - 1) {
    submitButton.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  } else {
    submitButton.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  }

  // Disable next until answer selected
  nextBtn.disabled = true;
  document.querySelectorAll('.answer-options input').forEach(input => {
    input.addEventListener('change', () => {
      nextBtn.disabled = false;
    });
  });

  // Update progress text
  document.getElementById("progress-text").textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  document.getElementById("progress-bar").style.width =
    ((currentQuestionIndex + 1) / questions.length) * 100 + "%";
}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timeLeft--;

  if (timeLeft <= 0) {
    clearInterval(timer);
    nextQuestion();
  } else {
    timerElement.textContent = `Time left: ${timeLeft} seconds`;
  }
}

function nextQuestion() {
  const form = document.getElementById("quiz-form");
  const formData = new FormData(form);
  const selectedAnswer = formData.get(`question-${currentQuestionIndex}`);
  
  if (selectedAnswer !== null) {
    userAnswers[currentQuestionIndex] = selectedAnswer;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    clearInterval(timer);
    submitQuiz(); // show result in same page
  }
}

function submitQuiz() {
  let score = 0;

  userAnswers.forEach((answer, index) => {
    if (questions[index].answers[answer] && questions[index].answers[answer].correct) {
      score++;
    }
  });

  const total = questions.length;
  const percentage = (score / total) * 100;

  let feedback = "";
  if (percentage >= 80) {
    feedback = "Excellent work! 🎉";
  } else if (percentage >= 50) {
    feedback = "Good job, but there’s room for improvement.";
  } else {
    feedback = "Needs improvement. Please review the training material.";
  }

  document.getElementById("score").innerHTML = `
    <h2>✅ Quiz Completed</h2>
    <p>Thank you for participating in the Employee Training Quiz.</p>
    <p><strong>You scored ${score} out of ${total} (${percentage.toFixed(0)}%).</strong></p>
    <p>${feedback}</p>
  `;

  document.getElementById("quiz-form").classList.add("hidden");
  document.getElementById("score-container").classList.remove("hidden");
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  document.getElementById("quiz-form").classList.remove("hidden");
  document.getElementById("score-container").classList.add("hidden");
  loadQuestion();
}

loadQuestion();
