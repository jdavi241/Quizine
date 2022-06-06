var startQuiz = document.querySelector("#startBtn");
startQuiz.addEventListener("click", getQuestion);
var questionCon = document.querySelector("#questionDsp");
var startMenu = document.querySelector(".startMenu");


var question = [{
  question: "How hungry are you?",
  answers: ["Not very", "Some-what hungry", "starving"],
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
  question: "Select a protein or press 'Random' to generate a random recipe",
  answers: ["Beef", "Pork", "Chicken", "Fish", "Vegetables", "Random"],
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
  if (answer.includes("Random")) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'recipify.p.rapidapi.com',
        'X-RapidAPI-Key': 'fa86238f57msh6dd363b9818db11p18e049jsn90f1e1c91380'
      }
    };
    
    fetch('https://recipify.p.rapidapi.com/today-recipe', options)
      .then(response => response.json())
      .then(response => showRandom(response))
      .catch(err => console.error(err));
      
    
  } else if (answer.includes("Pork") || answer.includes("Fish") || answer.includes("Beef") || answer.includes("Chicken") || answer.includes("Vegetables")) {  

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
  heading.classList = "column"
  resultsText.appendChild(heading)

  var header = document.createElement("p")
  header.innerText = data.results[0].description
  header.classList = "column"
  resultsText.appendChild(header)

  var recipeImg = document.createElement("img")
  recipeImg.src = data.results[0].thumbnail_url
  recipeImg.classList = "is-square column"
  resultsText.appendChild(recipeImg)


  for (let a = 0; a < data.results[0].instructions.length; a++) {
    const instructionsItems = data.results[0].instructions[a].display_text;
    // console.log(instructionsItems)
    var instructionsDiv = document.createElement("ol")
    instructionsDiv.classList = "column"
    var instructionsContent = document.createElement("li")
    instructionsContent.classList = "is-mobile"
    instructionsItems.classList = "is-3"
    instructionsContent.innerText = instructionsItems
    instructionsDiv.appendChild(instructionsContent)
    resultsText.appendChild(instructionsDiv)
  }
  saveData();
  
}

function showRandom (data) {
  console.log(data)
  var resultsText = document.querySelector("#results")
  resultsText.style.display = "block"

  // Create elements 
  var heading = document.createElement("p")
  heading.innerText = data.name
  heading.classList = "title is-3 column"
  resultsText.appendChild(heading)

  var ingredientsHeading = document.createElement("p")
  ingredientsHeading.innerText = "Ingredients: "
  ingredientsHeading.classList = "subtitle column"
  resultsText.appendChild(ingredientsHeading)

  for (let b = 0; b < data.ingredients.length; b++) {
    const ingredientsList = data.ingredients[b];
    //console.log(ingredientsList)
    
    var ingredientsDiv = document.createElement("ul")
    var ingredientsItem = document.createElement("li")

    ingredientsItem.innerText = ingredientsList
    ingredientsDiv.classList = "column"
    ingredientsDiv.appendChild(ingredientsItem)
    resultsText.appendChild(ingredientsDiv)

  }

  var header = document.createElement("p")
  header.innerText = "Steps: "
  header.classList = "subtitle column"
  resultsText.appendChild(header)

  for (let c = 0; c < data.steps.length; c++) {
    const StepsList = data.steps[c];
    var ingredientsDiv = document.createElement("ul")
    var ingredientsItem = document.createElement("li")

    ingredientsItem.innerText = StepsList
    ingredientsDiv.classList = "column"
    ingredientsDiv.appendChild(ingredientsItem)
    resultsText.appendChild(ingredientsDiv)
    
  }

  saveData();
}

var saveButton = document.createElement("button")

function saveData () {
  var resultsEl = document.querySelector("#results")
  // var saveButton = document.createElement("button")
  saveButton.classList = "button is-primary"
  saveButton.innerText = "Save"
  resultsEl.appendChild(saveButton)
  //saveButton.addEventListener("click", saveData)
  localStorage.setItem('results', resultsEl)
   
}
var resultsButton = document.querySelector("#resultsBtn")

function displayData () {
  // var resultsButton = document.querySelector("#resultsBtn")
  var resultsText = document.querySelector("#results")
  //resultsText.appendChild()
  resultsText.style.display = "block"
  resultsText.innerText = storageResults
  console.log("clicked")
  //resultsButton.addEventListener("click", displayData)

  var storageResults = localStorage.getItem('results')

}
resultsButton.addEventListener("click", displayData)
saveButton.addEventListener("click", saveData)
