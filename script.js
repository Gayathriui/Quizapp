const questions = [
    {
        question: "Which technology is used to make web pages responsive?",
        options: ["Java", "CSS", "Python", "C++"],
        answer: 1
    },
    {
        question: "Which of the following is NOT a programming language?",
        options: ["JavaScript", "HTML", "Python", "Java"],
        answer: 1
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Apple"],
        answer: 2
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "#", "**"],
        answer: 1
    },
    {
        question: "Which method is used to store data in browser permanently?",
        options: ["sessionStorage", "cookies", "localStorage", "cache"],
        answer: 2
    },
    {
        question: "React is mainly used for building?",
        options: ["Databases", "Operating Systems", "User Interfaces", "Servers"],
        answer: 2
    }
];

// Randomize questions
questions.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionText = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");

function showQuestion() {
    let q = questions[currentQuestion];
    questionText.innerText = q.question;

    optionButtons.forEach((btn, index) => {
        btn.innerText = q.options[index];
    });

    startTimer();
}

function startTimer() {
    timeLeft = 10;
    timerText.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;

        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(index) {
    clearInterval(timer);

    if (index === questions[currentQuestion].answer) {
        score++;
        scoreText.innerText = score;
    }

    nextQuestion();
}

function nextQuestion() {
    clearInterval(timer);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    document.getElementById("finalScore").innerText =
        `Your Score: ${score} / ${questions.length}`;

    let highScore = localStorage.getItem("highScore") || 0;

    if (score > highScore) {
        localStorage.setItem("highScore", score);
        highScore = score;
    }

    document.getElementById("highScore").innerText = highScore;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreText.innerText = 0;
    document.getElementById("resultBox").style.display = "none";
    document.getElementById("quizBox").style.display = "block";
    showQuestion();
}

showQuestion();
