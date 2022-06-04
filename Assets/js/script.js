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
  var answerCon = document.querySelector("#answerCon")
  var questionsCon = document.querySelector("#questionsCon")
  // answerOneEl.addEventListener("click", answerClick);
  // answerTwoEl.addEventListener("click", answerClick);

  // Hide start menu
  startMenu.style.display = "none";
  // Display questions
  questionCon.style.display = "block";

  for (let l = 0; l < question[l].answers.length; l++) {
    var options = question[l].answers[l];
    var questionsConEl = question[l].question
    //console.log(options)
    var btn = document.createElement("button")
    btn.innerHTML = options
    btn.addEventListener("click", answerClick)
    console.log(answerCon)
    answerCon.appendChild(btn)
    questionsCon.innerHTML = questionsConEl
    
  }

  // Go to question array and insert "question:"
  // questionEl.innerText = question[i].question;

  // answerOneEl.innerText = question[i].answers[0];
  // answerTwoEl.innerText = question[i].answers[1];
};

// Hide question content on home page
questionCon.style.display = "none";

var answerOpt = []

function answerClick() {

  // insert html into empty array 
  answerOpt.push(this.innerText)

  // iterate through each question on click 
  i++

  answerCon.innerHTML = ""
  // Grab next question
  getQuestion();

  console.log(answerOpt);
  //console.log(this.innerText);
}

var getResults = function() {
  
}

function getAPIs () {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      'X-RapidAPI-Key': 'fa86238f57msh6dd363b9818db11p18e049jsn90f1e1c91380'
    }
  };

  window.localStorage.setItem('chicken', JSON.stringify(question))
  window.localStorage.setItem('salad', JSON.stringify(question))
  window.localStorage.setItem('tacos', JSON.stringify(question))
  window.localStorage.setItem('soup', JSON.stringify(question))
  window.localStorage.setItem('pizza', JSON.stringify(question))
  window.localStorage.setItem('burgers', JSON.stringify(question))
  window.localStorage.setItem('in', JSON.stringify(question))
  window.localStorage.setItem('out', JSON.stringify(question))





  var food = ""
  fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=under_30_minutes&q=${food}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

getAPIs();