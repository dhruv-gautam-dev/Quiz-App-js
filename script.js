const questions =[
  {
    question:"Which is largest Animal in the world ?",
    answer:[
      { text: "Shark" , correct:false},
      { text: "Blue Whale" , correct:true},
      { text: "Elephant" , correct:false},
      { text: "Giraffe" , correct:false},
    ]
  },
  {
    question:"Which is Smallest continent in the world ?",
    answer:[
      { text: "Asia" , correct:false},
      { text: "Australia" , correct:true},
      { text: "Arctic" , correct:false},
      { text: "Africa" , correct:false},
    ]
  },
  {
    question:"Which is largest Desert in the world ?",
    answer:[
      { text: "Sahara" , correct:false},
      { text: "Antarctica" , correct:true},
      { text: "kalahari" , correct:false},
      { text: "Gobi" , correct:false},
    ]
  },
];
const questionH2 = document.getElementById("question");
// const answersDiv = document.getElementById("answers-buttons");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score=0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

const ansBtnsDiv = document.getElementById("answers-buttons");


function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo= currentQuestionIndex +1;
  questionH2.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {

    const ansBtn = document.createElement("button");
    ansBtn.innerHTML = answer.text;
    ansBtn.classList.add("answerbutton");
    ansBtnsDiv.appendChild(ansBtn);
    if(selectAnswer){ // get true or false from this output 
      ansBtn.dataset.correct= answer.correct;
    }
    ansBtn.addEventListener('click',selectAnswer);

  }
  );

}
function selectAnswer(e){
  const selectbutton = e.target;
  const isCorrect  = selectbutton.dataset.correct == "true";
  if(isCorrect){
    selectbutton.classList.add("correct");
    score++;
  }else{
    selectbutton.classList.add("inCorrect");
  }

  Array.from(ansBtnsDiv.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    // button.setAttribute("disabled","true");
    button.disabled = true;

  });
  nextButton.style.display="block";

}
function showScore(){
  resetState();
  questionH2.innerHTML = `You Scored ${score} out of ${questions.length}!`
  nextButton.innerHTML=`Play Again`;
  nextButton.style.display="block";


}
function handleNextBtn(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}
nextButton.addEventListener('click',()=>{
  if(currentQuestionIndex < questions.length){
    handleNextBtn();
  }else{
    startQuiz();
  }
  // showQuestion();s
});

function resetState(){
  nextButton.style.display="none";
  while(ansBtnsDiv.firstChild){
    ansBtnsDiv.removeChild(ansBtnsDiv.firstChild);
  }
}
startQuiz();