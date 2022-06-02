var startQuiz = document.querySelector("#startBtn");
startQuiz.addEventListener("click", getQuestion);
var questionCon = document.querySelector("#questionDsp");
var startMenu = document.querySelector(".startMenu");


var question = [{
  question: "Would you like to eat out or in?",
  answers: ["out", "in"]
},
{
  question: "Pizza or Burgers?",
  answers: ["Pizza", "Burgers"]
},
{
  question: "Tacos or Soup?",
  answers: ["Tacos", "Soup"]
},
{
  question: "Chicken or Salad",
  answers: ["Chicken", "Salad"]
}]

var i=0
function getQuestion() {
  var questionEl = document.querySelector(".que_text");
  var answerOneEl = document.querySelector("#one");
  var answerTwoEl = document.querySelector("#two");
  answerOneEl.addEventListener("click", answerClick);
  answerTwoEl.addEventListener("click", answerClick);

  // Hide start menu
  startMenu.style.display = "none";
  // Display questions
  questionCon.style.display = "block";

  // Go to question array and insert "question:"
  questionEl.innerText = question[i].question;

  answerOneEl.innerText = question[i].answers[0];
  answerTwoEl.innerText = question[i].answers[1];
};

// Hide question content on home page
questionCon.style.display = "none";

var answerOpt = []

function answerClick() {
  //var questionCon = document.querySelector("#questionDsp");

  // insert html into empty array 
  answerOpt.push(this.innerText)

  // iterate through each question on click 
  i++

  // Grab next question
  getQuestion();

  console.log(answerOpt);
  //console.log(this.innerText);
}