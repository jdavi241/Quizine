var startQuiz = document.querySelector("#startBtn");
startQuiz.addEventListener("click", getQuestion);
var questionCon = document.querySelector("#questionDsp");
var startMenu = document.querySelector(".startMenu");


var question = [{
  question: "Would you like to eat out or in?",
  answers: ["out", "in"],
  id: "location"
},
{
  question: "Sweet or Salty?",
  answers: ["Sweet", "Salty"],
  id: "taste"
},
{
  question: "Bitter or Sour?",
  answers: ["Bitter", "Sour"],
  id: "acidity"
},
{
  question: "Beef, Pork, Chicken, Fish or Veggies",
  answers: ["Beef", "Pork", "Chicken", "Fish", "Veggies"],
  id: "protein"
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

  

  for (let l = 0; l < question[i].answers.length; l++) {
    var options = question[i].answers[l];
    var questionsConEl = question[i].question
    //console.log(options)
    var btn = document.createElement("button")
    // btn.data = question[i];
    // console.log(btn.data)
    btn.classList = "button is-primary is-medium is-light"
    btn.innerHTML = options
    btn.addEventListener("click", answerClick)
    answerCon.appendChild(btn)
    questionsCon.innerHTML = questionsConEl
    
    
  }
  
  //getResults();
  // Go to question array and insert "question:"
  // questionEl.innerText = question[i].question;

  // answerOneEl.innerText = question[i].answers[0];
  // answerTwoEl.innerText = question[i].answers[1];
};

// Hide question content on home page
questionCon.style.display = "none";

var answerOpt = []

function answerClick() {
  console.dir(this)
  // insert html into empty array 
  answerOpt.push(this.innerText)

  // iterate through each question on click 
  i++

  answerCon.innerHTML = ""
  // Grab next question or get results 
  if (i === question.length) {
    getAPIs(this.innerText);
    return;
  }

  if (this.innerText === "out") getAPIs(this.innerText);

  getQuestion();
  
}


function getAPIs (answer) {
  questionCon.style.display = "none"
  if (answer.includes("out")) {
    console.log('works')
    // const optionsTwo = {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //     'X-RapidAPI-Host': 'google-maps-search1.p.rapidapi.com',
    //     'X-RapidAPI-Key': 'fa86238f57msh6dd363b9818db11p18e049jsn90f1e1c91380'
    //   },
    //   body: '{"limit":3,"language":"en","region":"us","queries":["Lawyers near San Francisco, CA, US","Lawyers near New York, NY, US","Graphic Designers in Chicago"],"coordinates":"37.381315,-122.046148"}'
    // };
    
    // fetch('https://google-maps-search1.p.rapidapi.com/search', optionsTwo)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));
  } else if (answer.includes("Beef", "Pork", "Chicken", "Fish", "Veggies")) {  

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        'X-RapidAPI-Key': 'fa86238f57msh6dd363b9818db11p18e049jsn90f1e1c91380'
      }
    };
    // localStorage.setItem(".value", JSON.stringify())
    var food = answerOpt[3]
    console.log(food)
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=under_30_minutes&q=${food}`, options)
      .then(response => response.json())
      .then(response => showResults(response))
      .catch(err => console.error(err));

  
  }    


  //show results 

}

function showResults(data) {
  console.log(data)
  var resultsText = document.querySelector("#results")
  console.log(resultsText)
  var recipeDescription = document.querySelector("#description")
  resultsText.style.display = "block"
  recipeDescription.innerText = data.description 
  
  // Choose number of options.  Create Loop, dynamically create options (similar to buttons) in loop, 

  for (let i = 0; i < data.results.length; i++) {
    // document.createElement("h2") (header)
    
    // loop through instructions.  Create list item for each instruction index (ul)

    // create loop to display each instruction (use different variable)
  }
}

