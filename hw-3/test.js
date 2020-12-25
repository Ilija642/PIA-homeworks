const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const btn=document.getElementById("myBtn");
var ime1 = document.getElementById("ime").value;

// pitanja ucittavanje iz jsona
let questions = [
    {
        question : "Ko je naslikao mona liza?",
        popunjavanje : false,
        choiceA : "Leondardo Davinci",
        choiceB : "Mikelandjelo Buonaroti",
        choiceC : "Leonardo di kaprio",
        correct : "A"
    },{
        question : "Kad je bio prvi srpski ustanak?",
        choiceA : "1904",
        choiceB : "1804",
        choiceC : "1815",
        correct : "B"
    },{
        question : "Kada je zavrsen drugi svetski rat?",
        choiceA : "1945",
        choiceB : "1923",
        choiceC : "1918",
        correct : "A"
    }
    ,{
        question : "Koja reka protice kroz Beograd?",
        choiceA : "Ibar",
        choiceB : "Dunav",
        choiceC : "Morava",
        correct : "B"
    }
    ,{
        question : "Najvisi planinski vrh U Srbiji ?",
        choiceA : "Djeravica",
        choiceB : "Peskovi",
        choiceC : "Velika Rudoka",
        correct : "C"
    }
    ,{
        question : "Ko je napisao 'Prokletu avliju'?",
        choiceA : "Vladislav Petkovic Dis",
        choiceB : "Ivo Cipiko",
        choiceC : "Ivo Andric",
        correct : "C"
    }
    ,{
        question : "Glavni grad Turske?",
        choiceA : "Istanbul",
        choiceB : "Ankara",
        choiceC : "Baku",
        correct : "B"
    }
    ,{
        question : "Katalonija je deo?",
        choiceA : "Portugal",
        choiceB : "Spanije",
        choiceC : "Tunisa",
        correct : "B"
    }
    ,{
        question : "Ko je otkrio penicilin?",
        choiceA : "Luj Paster",
        choiceB : "Marija Kiri",
        choiceC : "Aleksandar Fleming",
        correct : "C"
    }
    ,{
        question : "Kanal koji spaja Atlantik?",
        choiceA : "Latinski",
        choiceB : "Bermudski",
        choiceC : "Panamski",
        correct : "C"
    }
];
// pitanja Dragica Petkovic

// promenljive

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20s
const gaugeWidth = 300; // 300px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// prikaz pitanja
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
btn.addEventListener("click", startQuiz);


// pocetk
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}


$("#giveUp").click(function () {
    let answerOptions = $("input")
    userAnswers[qIndex] = -1;
    getNextQuestion();
})
$("#giveUp").click(function () {
    finishQuiz();
    qIndex = 0;

})







// bar
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// brojac

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // boja
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // Kraj
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// Provera odgovora

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // kraj
        clearInterval(TIMER);
        scoreRender();
    }
}

// tacno
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// netacno
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// skor
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // kalkulacija poena
    const scorePerCent = Math.round(100 * score/questions.length);
    
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}