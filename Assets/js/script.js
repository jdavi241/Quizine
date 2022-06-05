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

  // Hide start menu
  startMenu.style.display = "none";
  // Display questions
  questionCon.style.display = "block";

  

  for (let l = 0; l < question[i].answers.length; l++) {
    var options = question[i].answers[l];
    var questionsConEl = question[i].question
    var btn = document.createElement("button")
    btn.classList = "button is-primary is-medium is-light"
    btn.innerHTML = options
    btn.addEventListener("click", answerClick)
    answerCon.appendChild(btn)
    questionsCon.innerHTML = questionsConEl
    
    
  }
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
    console.log("worked homie")
    // var searchFood = answerOpt[3] + " restaurants near me"
    
    // const optionsTwo = {
    //   method: 'GET',
    //   headers: {
    //     'X-RapidAPI-Host': 'google-search1.p.rapidapi.com',
    //     'X-RapidAPI-Key': 'fa86238f57msh6dd363b9818db11p18e049jsn90f1e1c91380'
    //   }
    // };
    
    // fetch(`https://google-search1.p.rapidapi.com/google-search?hl=${searchFood}`, optionsTwo)
    //   .then(response => response.json())
    //   .then(response => showResults(response))
    //   .catch(err => console.error(err));
      
    
  } else if (answer.includes("Pork") || answer.includes("Fish") || answer.includes("Beef") || answer.includes("Chicken") || answer.includes("Veggies") || !answer.includes("out")) {  

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        'X-RapidAPI-Key': 'fa86238f57msh6dd363b9818db11p18e049jsn90f1e1c91380'
      }
    };
    
    var food = answerOpt[3]
    console.log(food)
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=under_30_minutes&q=${food}`, options)
      .then(response => response.json())
      .then(response => showResults(response))
      .catch(err => console.error(err));

    
  }  
  

}

function showResults(data) {
  console.log(data)
  var resultsText = document.querySelector("#results")
  //console.log(resultsText)
  var recipeDescription = document.querySelector("#description")
  // Display results HTML
  resultsText.style.display = "block"

  // Create elements 
  var heading = document.createElement("p")
  heading.innerText = data.results[0].name
  resultsText.appendChild(heading)

  var header = document.createElement("p")
  header.innerText = data.results[0].description
  resultsText.appendChild(header)

  var recipeImg = document.createElement("img")
  recipeImg.src = data.results[0].thumbnail_url
  recipeImg.classList = "image is-square"
  resultsText.appendChild(recipeImg)

  // var instructionsDiv = document.createElement("ul")
  // var instructionsItems = document.createElement("li")
  //instructionsItems.innerText = data.results[0].instructions[0].display_text
  // instructionsDiv.appendChild(instructionsItems)
  // resultsText.appendChild(instructionsDiv)

  for (let a = 0; a < data.results[0].instructions.length; a++) {
    const instructionsItems = data.results[0].instructions[a].display_text;
    // console.log(instructionsItems)
    var instructionsDiv = document.createElement("ol")
    var instructionsContent = document.createElement("li")
    instructionsContent.classList = "is-mobile"
    instructionsItems.classList = "is-3"
    instructionsContent.innerText = instructionsItems
    instructionsDiv.appendChild(instructionsContent)
    resultsText.appendChild(instructionsDiv)
  }
  
  // Store Data 
  //storeData();
}

// var storeData = function () {
//   var resultsData = answerOpt.value 
//   //console.log(resultsData)

//   //localStorage.setItem('results', JSON.stringify(resultsData))

//   //localStorage.getItem('results')
   
// }

