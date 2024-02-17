const question = [
  {
    quesTiltle: "What is the capital of France?",
    answers: [
      {text: "Berlin", correct: false, no: 2,},
      {text: "Paris", correct: true, no: 1},
      {text: "Rome", correct: false, no: 2,},
      {text: "Madrid", correct: false, no: 2,}
    ]
  },

  {
    quesTiltle: 'Which planet is known as the "Red Planet"?',
    answers: [
      {text: "Venus", correct: false, no: 2},
      {text: "Mars", correct: true, no: 2},
      {text: "Jupiter", correct: false, no: 2},
      {text: "Saturn", correct: false, no: 2}
    ]
  },

  {
    quesTiltle: 'Who wrote "Romeo and Juliet"?',
    answers: [
      {text: "Charles Dickens", correct: false, no: 3},
      {text: "Jane Austen", correct: false, no: 3},
      {text: "William Shakespeare", correct: true, no:3 },
      {text: "Mark Twain", correct: false, no: 3}
    ]
  },

  { 
    quesTiltle: "In which year did the United States gain its independence?",
    answers: [
      {text: "1607", correct: false, no: 4},      
      {text: "1776", correct: true, no: 4},      
      {text: "1814", correct: false, no: 4},      
      {text: "1494", correct: false, no: 4}    
    ] 
  },

  {
    quesTiltle: "What is the powerhouse of the cell?",
    answers: [
      {text: "Nucleus", correct: false, no: 5},
      {text: "Ribosome", correct: false, no: 5},
      {text: "Mitochondria", correct: true, no: 5},
      {text: "Endoplasmic reticulum", correct: false, no: 5}
    ]
  },


  {
    quesTiltle: "Which programming language is often used for web development?",
    answers: [
      {text: "Java", correct: false, no: 6},
      {text: "Python", correct: false, no: 6},
      {text: "HTML", correct: true, no: 6},
      {text: "C++", correct: false, no: 6}
    ]
  },

  {
    quesTiltle: 'Who is the author of the "Harry Potter" book series?',
    answers: [
      {text: "J.R.R. Tolkien", correct: false, no: 7},
      {text: "J.K. Rowling", correct: true, no: 7},
      {text: "George R.R. Martin", correct: false, no: 7},
      {text: "Suzanne Collins", correct: false, no: 7}
    ]
  },

  {
    quesTiltle: "Which ocean is the largest on Earth?",
    answers: [
      {text: "Atlantic Ocean", correct: false, no: 8},
      {text: "Indian Ocean", correct: false, no: 8},
      {text: "Southern Ocean", correct: false, no: 8},
      {text: "Pacific Ocean", correct: true, no: 8}
    ]
  },

  {
    quesTiltle: "What is the main function of the respiratory system?",
    answers: [
      {text: "Digestion", correct: false, no: 9},
      {text: "Circulation", correct: false, no: 9},
      {text: "Breathing", correct: true, no: 9},
      {text: "Sight", correct: false, no: 9}
    ]
  },

  {
    quesTiltle: "Who developed the theory of relativity?",
    answers: [
      {text: "Isaac Newton", correct: false, no: 10},
      {text: "Albert Einstein", correct: true, no: 10},
      {text: "Galileo Galilei", correct: false, no: 10},
      {text: "Stephen Hawking", correct: false, no: 10}
    ]
  }
];

const quesT = document.getElementById("quesT");
const nxt = document.querySelector(".nxt");
const btnContainer = document.querySelector(".btnContainer");
const score = document.createElement('div');
score.setAttribute('class', 'score');

let scores = 0;
let failedScore = 0;
let questNumber = 0;
let k = 0;
let isCorrect;

savedQuestion();
getScore();
getFailedScore();

console.log(questNumber === null);
if(questNumber === null){
  questNumber = 0;
}
else{
  questNumber = localStorage.getItem("data");
}

// let question1 = questNumber;

let quesT1 = parseInt(questNumber) + 1;

quesT.innerText = quesT1+". " + question[questNumber].quesTiltle;
question[questNumber].answers.forEach(answer => {
  const btn = document.createElement('button');
  btn.setAttribute('class', 'btn');
  btnContainer.insertBefore(btn, nxt);
  btn.innerText = answer.text;

  if (answer.correct){
    btn.dataset.correct = answer.correct;
  }

  btn.addEventListener("click", selectAnswer);
});

addNext();

nxt.addEventListener('click', () => {  
  if(questNumber == (question.length)){
    removeButtons();
  }
  else{
    questNumber++;
    saveData();
}

  removeButtons();
  playAgain();

  if(questNumber < (question.length)){
    quesT.innerText = (questNumber + 1) + '.' + ' ' + question[questNumber].quesTiltle;
 
    question[questNumber].answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.setAttribute('class', 'btn');
      btnContainer.insertBefore(btn, nxt)
      btn.innerText = answer.text;

      if (answer.correct){
        btn.dataset.correct = answer.correct;
      }

      btn.addEventListener("click", selectAnswer);
      
    });
    
    nxt.style.display = 'none';
    nxt.innerText = "Next";
    quesT.style.display = 'block';
    endOfQuiz('none', 'Next'); 
  }

  else{
    endOfQuiz('block', 'Play Again');
    quesT.style.display = 'none';
  }

  addNext();
});

function removeButtons() {
  var buttons = document.querySelectorAll('.btn');
  buttons.forEach(e => {
      e.remove();
  });
}

function addNext(){
  var buttons = document.querySelectorAll('.btn');
  buttons.forEach(function(button) {
        button.addEventListener('click', function() {
        nxt.style.display = 'block';      
    });
  });
}

function endOfQuiz(vanish, nxText) {
    btnContainer.insertBefore(score, nxt);
    score.innerText = `Your score is ${scores} out of ${question.length}`;
    nxt.innerText = nxText;
    nxt.style.display = vanish;
    score.style.display = vanish;
}

function playAgain() {
  if (questNumber == (question.length)){
    k++;
  }
if(k == 2) {
    k = 0; 
    questNumber = 0;
    saveData();
    scores = 0;
    saveScore();
    failedScore = 0;
    saveFailedScore();
  } 
}

function selectAnswer(e){
  let innerText = document.getElementById('quesT').innerText;
  let numberBeforeDot = innerText.split('.')[0].trim();

  console.log(questNumber, "QUETnO");
  console.log("Number before dot:", numberBeforeDot);

  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === 'true';

  if (isCorrect){
    selectBtn.classList.add('correct');

    if(parseInt(scores) + parseInt(failedScore) == parseFloat(numberBeforeDot)-1){
      scores++;
      console.log(scores, "on Score");
      saveScore();
    }
  }

  else { 
    if (parseInt(scores) + parseInt(failedScore) === parseFloat(numberBeforeDot)-1){
    selectBtn.classList.add('incorrect');
    failedScore++;
    console.log(failedScore, "on failed");
    saveFailedScore();
 }
}
  
  console.log((parseInt(scores) + parseInt(failedScore) === parseFloat(numberBeforeDot)))
  
  console.log(scores, typeof(score));
  console.log(failedScore, typeof(failedScore));
 
  console.log(parseInt(scores) + parseInt(failedScore), " add");

  Array.from(btnContainer.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
    nxt.disabled = false;
  })
}

function saveData() {
  localStorage.setItem("data", questNumber);
}

function savedQuestion() {
  questNumber = localStorage.getItem("data");
}

function saveClick() {
  localStorage.setItem("click", onLoad);
}

function savedAnswer() {
  onLoad = localStorage.getItem("click");
}

function saveScore() {
  localStorage.setItem("pass", scores);
}

function getScore() {
 scores = localStorage.getItem("pass");
}

function saveFailedScore() {
  localStorage.setItem("fail", failedScore);
}

function getFailedScore() {
  failedScore = localStorage.getItem("fail");
}
