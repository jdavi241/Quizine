var startQuiz = document.querySelector("#startBtn");
startQuiz.addEventListener("click", getQuestion);

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
  answers: ["Tacos", "Soup"]}]
var i=0
function getQuestion() {
  var questionEl = document.querySelector(".que_text");
  var answerOneEl = document.querySelector("#one");
  var answerTwoEl = document.querySelector("#two");
  answerOneEl.addEventListener("click", answerClick)
  answerTwoEl.addEventListener("click", answerClick)
  
startMenu.style.display = "none"

questionEl.innerText = question[i].question
answerOneEl.innerText = question[i].answers[0]
answerTwoEl.innerText = question[i].answers[1]


  // if (answers = "out") {
   // console.log(getQuestion);
  //}

  //else (answers = "in")


};

var answerOpt = []

function answerClick() {
  var questionCon = document.querySelector("#questionDsp");
  answerOpt.push(this.innerText)
  i++
  getQuestion();
  console.log(answerOpt);
  //console.log(this.innerText);
}