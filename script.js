//Note: If you want to go to the start of code execution, scroll down to the last line.

//-------------------Objects for each question----------------------------------//
var q1 = {
    question: 'Which one of the following is the correct way for calling the JavaScript code?',
    op1: "1. Preprocessor",
    op2: "2. Triggering Event",
    op3: "3. RMI",
    op4: "4. Function/Method",
    ans: "4"

}

var q2 = {
    question: 'The "function" and " var" are known as?',
    op1: "1. Keywords",
    op2: "2. Data types",
    op3: "3. Declaration statements",
    op4: "4. Prototypes",
    ans: "3"
}

var q3 = {
    question: 'Which of the following variables takes precedence over the others if the names are the same?',
    op1: "1. Global variable",
    op2: "2. The local element",
    op3: "3. The two of the above",
    op4: "4. None of the above",
    ans: "2"
}

var q4 = {
    question: 'Which one of the following is the correct way for calling the JavaScript code?',
    op1: "1. Preprocessor",
    op2: "2. Triggering Event",
    op3: "3. RMI",
    op4: "4. Function/Method",
    ans: "4"
}

var q5 = {
    question: 'Which of the following type of a variable is volatile?',
    op1: "1. Mutable variable",
    op2: "2. Dynamic variable",
    op3: "3. Volatile variable",
    op4: "4. Immutable variable",
    ans: "1"
}

//-------------------Object to store user scores and retrive scores from local storage----------------------------------//

var highScoreObject = {
     userName: ["guest"],
     userScore: [0],
}

localStorage.setItem("quizUserScores",JSON.stringify(highScoreObject))

//-------------------Global variables----------------------------------//

var arrayofquestion = [q1.question, q2.question, q3.question, q4.question, q5.question,];
var arrayofanswers = [q1.ans,q2.ans,q3.ans,q4.ans,q5.ans];
var arrayofoption1 = [q1.op1,q2.op1,q3.op1,q4.op1,q5.op1];
var arrayofoption2 = [q1.op2,q2.op2,q3.op2,q4.op2,q5.op2];
var arrayofoption3 = [q1.op3,q2.op3,q3.op3,q4.op3,q5.op3];
var arrayofoption4 = [q1.op4,q2.op4,q3.op4,q4.op4,q5.op4];
var questionNumber = 0;
var buttons = document.getElementsByClassName('button');
var strtBtn = document.getElementsByClassName('start');
var options = document.getElementsByClassName('options');
var submitButton = document.getElementsByClassName('submitButton');
var input = document.getElementsByClassName('userNameInput');
var highScoreButton = document.getElementsByClassName('highscores');
var returnButton = document.getElementsByClassName('returnButton');
var endOfQuizVar = false;
var correctAns = 0;
var wrongAns = 0;
var totalQuestions = 5;
var j = 60;
var paragraphText = "Try to answer the following code related questions within the time limit. Keep in mind that incorrent answers will penalize your time by 10 seconds!."


//-------------------sortHighScoreArrays(): Sort the user scores in the array in accending order----------------------------------//

function sortHighScoreArrays()
{

    var tempVar = 0;
    for (var i=0; i<=highScoreObject.userScore.length; i++)
    {
        for (var k=i+1; k<=highScoreObject.userScore.length-1; k++)
        {
        if (highScoreObject.userScore[i] < highScoreObject.userScore[k] )
            {
            tempVar = highScoreObject.userScore[i];
            highScoreObject.userScore[i] = highScoreObject.userScore[k];
            highScoreObject.userScore[k] = tempVar;

            tempVar = highScoreObject.userName[i];
            highScoreObject.userName[i] = highScoreObject.userName[k];
            highScoreObject.userName[k] = tempVar;


            }

        }
    }
}

//-------------------highScores(): Displays user scores in a table ----------------------------------//

function highScores()
{
    var storage1 = localStorage.getItem("quizUserScores");

    highScoreObject = JSON.parse(storage1);

    sortHighScoreArrays();
    var tr1 = document.getElementsByClassName("tr1");
    var tr2 = document.getElementsByClassName("tr2");
    var tr3 = document.getElementsByClassName("tr3");
    var tr4 = document.getElementsByClassName("tr4");
    var tr5 = document.getElementsByClassName("tr5");
        for (var i=0; i<highScoreObject.userName.length; i++)
        {
            if (highScoreObject.userName == "")
            {
                highScoreObject.userName = "Guest";
            }
        }
        tr1[0].children[0].textContent = "1";
        tr1[0].children[1].textContent = highScoreObject.userName[0];
        tr1[0].children[2].textContent = highScoreObject.userScore[0];

        tr2[0].children[0].textContent = "2";
        tr2[0].children[1].textContent = highScoreObject.userName[1];
        tr2[0].children[2].textContent = highScoreObject.userScore[1];
        
        tr3[0].children[0].textContent = "3";
        tr3[0].children[1].textContent = highScoreObject.userName[2];
        tr3[0].children[2].textContent = highScoreObject.userScore[2];

        tr4[0].children[0].textContent = "4";
        tr4[0].children[1].textContent = highScoreObject.userName[3];
        tr4[0].children[2].textContent = highScoreObject.userScore[3];

        tr5[0].children[0].textContent = "5";
        tr5[0].children[1].textContent = highScoreObject.userName[4];
        tr5[0].children[2].textContent = highScoreObject.userScore[4];
        
    
    var table = document.getElementsByClassName("table");
    table[0].classList.remove('hide');
    
    document.getElementsByClassName('returnButton')[0].classList.remove('hide');
    document.getElementsByClassName("main-section")[0].classList.add("hide");
    document.getElementsByClassName("table")[0].classList.remove("hide");

}

//-------------------displayQuestion(event): Display quiz questions on the screen ----------------------------------//

function displayQuestion(event)
{   
    event.stopPropagation();
    console.log("strtBtn[0].addEventListener(click)");
    document.getElementsByTagName('ul')[0].classList.add("visible");
    document.getElementsByTagName('ul')[0].classList.remove("hide");
    document.getElementsByClassName('start')[0].classList.add("hide");
    displayNextQuestion(questionNumber);
    waitForButtonPress(questionNumber);
    timer();
    strtBtn[0].removeEventListener("click", displayQuestion);

}

//-------------------switchScreen(): Switch screensbetween high score table and main screen ------------------------//

function switchScreen()
{
        document.getElementsByClassName("main-section")[0].classList.remove("hide");
        document.getElementsByClassName("table")[0].classList.add("hide");
        returnButton[0].classList.add('hide');
    
}

//-------------------removeHomeScreen(): It waits for user to press 'Start' button on main page-----------------//

function removeHomeScreen()
{
    console.log("removeHomeScreen()");
    strtBtn[0].addEventListener("click", displayQuestion);
    highScoreButton[0].addEventListener("click", highScores)
    returnButton[0].addEventListener("click", switchScreen)
}

//-------------------showHomeScreen (): Takes user to main page and reset all Quiz variables--------------------//

function showHomeScreen ()
{
    console.log("showHomeScreen ()");

    document.getElementsByClassName('paragraph')[0].textContent = paragraphText;
    document.getElementsByClassName('paragraph')[0].classList.remove('hide');
    document.getElementsByClassName('paragraph')[0].classList.add('visible');
    document.getElementsByTagName('ul')[0].classList.remove("visible");
    document.getElementsByTagName('ul')[0].classList.add("hide");
    document.getElementsByClassName('start')[0].classList.remove("hide");
    document.getElementsByClassName('enterInitialsText')[0].classList.add('hide');
    document.getElementsByClassName('userNameInput')[0].classList.add('hide');
    document.getElementsByClassName('submitButton')[0].classList.add('hide');
    document.getElementsByClassName('high-score-button')[0].classList.add('hide');
    document.getElementsByClassName('right-or-wrong')[0].classList.add('visible');
    document.getElementsByClassName('right-or-wrong')[0].classList.remove('hide');
    document.getElementsByClassName('right-or-wrong')[0].textContent = '';
    document.getElementsByClassName('nameForm')[0].classList.remove("visible");
    document.getElementsByClassName('nameForm')[0].classList.add("hide");
    var table = document.getElementsByClassName("table");
    table[0].classList.add('hide');

    submitButton[0].removeEventListener("click", showHomeScreen);

    endOfQuizVar = false;
    questionNumber = 0;
    correctAns= 0;
    wrongAns = 0;
    j=60;
    removeHomeScreen(); // to wait for user to press start button


}

//-------------------checkIfInputisEmpty(): Checks if the user enterted their initials or not --------------------------------------------//

function checkIfInputisEmpty()
{
    if (document.getElementsByClassName('userNameInput')[0].value == "" || document.getElementsByClassName('userNameInput')[0].value == "Type your initials here")
    {
        document.getElementsByClassName('userNameInput')[0].value = "Guest";
        document.getElementsByClassName('userNameInput')[0].removeEventListener("click", clearDefaultText);
    }

}

//-------------------showUserName(): Displays user their name after they entered it on the screen----------------------------------------//

function showUserName()
{
    checkIfInputisEmpty();
    console.log("showUserName()");
    document.getElementsByClassName('paragraph')[0].classList.add("hide");
    document.getElementsByClassName('paragraph')[0].classList.remove("visible");
    document.getElementsByClassName('enterInitialsText')[0].classList.add("hide");
    document.getElementsByClassName('userNameInput')[0].classList.add("userNameInputLocked");
    document.getElementsByClassName('high-score-button')[0].classList.remove("hide");
    document.getElementsByClassName('submitButton')[0].textContent = "Return";
    submitButton[0].addEventListener("click", showHomeScreen);
    document.getElementsByClassName('high-score-button')[0].addEventListener("click", highScores);
}

//-------------------storeScore(event): Stores user scores on local storage----------------------------------------------------------//

function storeScore(event){
    if (input[0].value == "" || input[0].value == "Type your initials here")
    { 
        input[0].value = "Guest";
    }
    highScoreObject.userName.push(input[0].value);
    highScoreObject.userScore.push(correctAns);
    localStorage.setItem("quizUserScores", JSON.stringify(highScoreObject));
    console.log(event);
    showUserName();
    submitButton[0].removeEventListener("click", storeScore);
}

//-------------------clearDefaultText(): Clears input field on click for user to enter their initials---------------------------------//

function clearDefaultText()
{
    document.getElementsByClassName('userNameInput')[0].value = "";
}

//-------------------takeUserName(): Takes user initials----------------------------------------------------------------------------//

function takeUserName()
{
    console.log("takeUserName()");

    var endOfQuizText = "You have answered "+ correctAns+ " question(s) correctly out of " + totalQuestions;
    var submitButton = document.getElementsByClassName('submitButton');
    
    document.getElementsByClassName('userNameInput')[0].addEventListener("click",clearDefaultText);

    document.getElementsByClassName('enterInitialsText')[0].classList.remove("hide");
    document.getElementsByClassName('userNameInput')[0].classList.remove('hide');
    document.getElementsByClassName('submitButton')[0].classList.remove('hide');

    document.getElementsByTagName('ul')[0].classList.add("hide");
    document.getElementsByTagName('ul')[0].classList.remove("visible");
    document.getElementsByClassName('right-or-wrong')[0].classList.add('hide');
    document.getElementsByClassName('right-or-wrong')[0].classList.remove('visible');
    document.getElementsByClassName('paragraph')[0].textContent = endOfQuizText;
    document.getElementsByClassName('nameForm')[0].classList.remove("hide");
    document.getElementsByClassName('nameForm')[0].classList.add("visible");
    document.getElementsByClassName('submitButton')[0].textContent = "Submit";
    document.getElementsByClassName('userNameInput')[0].classList.remove("userNameInputLocked");
    submitButton[0].addEventListener("click", storeScore);
    
}

//-------------------timer(event): Timer function----------------------------------------------------------------------------//

function timer(event)
{       
    console.log("timer(event)");


    var timerText = document.getElementsByClassName('timer');

    var repeat = setInterval(function(){
        timerText[0].textContent = "Timer: "+ j;
        console.log(j);
        j = j-1;

        if (j <= 0 || endOfQuizVar == true){
            console.log("Time is Up check")
            clearInterval(repeat);
            timerText[0].textContent = "Timer: 0"
            takeUserName();
            j=0;
            
        }

    }, 1000);


}

//-------------------displayNextQuestion(): Displays next question --------------------------------------------------//

function displayNextQuestion(i)
{
    console.log("displayNextQuestion(i)");

    document.getElementsByClassName('paragraph')[0].textContent = arrayofquestion[i];
    buttons[0].textContent = arrayofoption1[i];
    buttons[1].textContent = arrayofoption2[i];
    buttons[2].textContent = arrayofoption3[i];
    buttons[3].textContent = arrayofoption4[i];
}

//-------------------optionsButtonPress(event): Checks if the answer is right or wrong or if questions have ended---------------------//

function optionsButtonPress(event){
    event.stopPropagation();
if (event.target.dataset.num == arrayofanswers[questionNumber])
{
    console.log(" - Inside pressed Right If condition");

    document.getElementsByClassName('right-or-wrong')[0].textContent="Right";
    correctAns = correctAns + 1;
    questionNumber = questionNumber + 1;
    if (questionNumber < totalQuestions){
        console.log(" - - Inside questionNumber < totalQuestions (Right)");

        console.log("Question number: " + questionNumber);
        displayNextQuestion(questionNumber);}
    else { 

        console.log(" - - Inside questionNumber > totalQuestions, calling takeUserName() (Right)");

        questionNumber = 0;
        endOfQuizVar = true;
        takeUserName();
        }

} else {             
    
    console.log(" - Inside pressed Wrong If condition");
    document.getElementsByClassName('right-or-wrong')[0].textContent="Wrong";
    j = j - 10;
    questionNumber = questionNumber + 1;
    displayNextQuestion(questionNumber);
    if (questionNumber < totalQuestions){
        console.log(" - - Inside questionNumber < totalQuestions (Wrong)");
        console.log("Question number: " + questionNumber);
        displayNextQuestion(questionNumber);}
        else {
        console.log(" - - Inside questionNumber > totalQuestions, calling takeUserName() (Wrong)");

        questionNumber = 0;
        endOfQuizVar = true;
        takeUserName();
        }

    }

}

//-------------------displayNextQuestion(): Displays next question --------------------------------------------------//

function waitForButtonPress(questionNumber)
{
    console.log("waitForButtonPress(questionNumber)");
    options[0].addEventListener("click", optionsButtonPress);


}

//-------------------removeHomeScreen(): Code starts here.----------------------------------------------------------//

removeHomeScreen();

