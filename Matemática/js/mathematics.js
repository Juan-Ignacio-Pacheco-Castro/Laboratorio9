const QUIZ_QUANTITY_INPUT = 'question-quantity';
const QUIZ_PLACE = 'quiz';
const DENIED = 'denied';
const QUESTION_LIST = 'quiz';
const INITIAL_INPUT = 'initial-input';
const INPUT_TAG = 'input';
const TEXT_TAG = 'a';
const LIST_TAG = 'li';
const CHECK_BUTTONS_TAG = 'quiz-check';
const AMOUNT_ALL_QUESTIONS = 5;
const START_AGAIN_TAG = 'start-again';

const questionAnswer = { 0: {question: "(8+4-2)*2=", answer: 20}, 
                         1: {question: "4*2/2=", answer: 4},
                         2: {question: "(5*5)+(2/2)=", answer: 26},
                         3: {question: "(3*2)(5-2)(9-5)=", answer: 72},
                         4: {question: "(6-6)(4/2)(5--100)=", answer: 0}
                       };

function generateQuiz(){
    const deniedMessage = document.getElementById(DENIED);
    let deniedDisplay = "";
    let questionsQuantity = document.getElementById(QUIZ_QUANTITY_INPUT).value;
    if (questionsQuantity >= 5 && questionsQuantity <= 20){
        display = "display: none;";
        const questionsToBeAnswered = document.getElementById(INITIAL_INPUT);
        questionsToBeAnswered.style = "display: none;";
        const questions = document.getElementById(QUESTION_LIST);
        for (let counter = 0; counter < questionsQuantity; ++counter){
            const questionElement = document.createElement(LIST_TAG);
            const questionAsked = document.createElement(TEXT_TAG);
            const questionInput = document.createElement(INPUT_TAG);
            questionInput.type = "number";
            questionInput.classList = "answer";
            for (let i = 0; i < questionsQuantity; ++i){
                let questionID = getRandomInt(AMOUNT_ALL_QUESTIONS);
                questionAsked.innerHTML = questionAnswer[questionID].question;
                questionAsked.id = `${questionID}`;
            }
            questionElement.appendChild(questionAsked);
            questionElement.appendChild(questionInput);
            questions.appendChild(questionElement);
            const quizCheck = document.getElementById(CHECK_BUTTONS_TAG);
            quizCheck.style.display = "block";
        }
    } else {
        deniedDisplay = "display: block;";
        
    }
    deniedMessage.style = deniedDisplay;
}

function showAnswers(){
    let selection = confirmSelection("¿Seguro que quiere mostrar las respuestas?");
    if (selection){
        const questions = document.getElementById(QUESTION_LIST).children;
        for (let counter = 0; counter < questions.length; ++counter){
            //questions[counter].lastChild.value = questionAnswer[questions[counter].firstChild.id].answer;
            questions[counter].lastChild.style.display = "none";
            const questionTextAnswer = document.createElement(TEXT_TAG);
            questionTextAnswer.innerHTML = questionAnswer[questions[counter].firstChild.id].answer;
            questionTextAnswer.classList = "text-answer";
            questions[counter].appendChild(questionTextAnswer);
        }
        const quizCheck = document.getElementById(CHECK_BUTTONS_TAG);
        quizCheck.style.display = "none";
        const quizStartAgain = document.getElementById(START_AGAIN_TAG);
        quizStartAgain.style.display = "block";
    }
}

function checkAnswers(){
    let selection = confirmSelection("¿Seguro que quiere revisar sus respuestas?");
    if (selection){
        const questions = document.getElementById(QUESTION_LIST).children;
        for (let counter = 0; counter < questions.length; ++counter){
            const revision = document.createElement(TEXT_TAG);
            if (questions[counter].lastChild.value == questionAnswer[questions[counter].firstChild.id].answer){
                revision.innerHTML = "¡Correcto!";
                revision.classList = "correct-answer";
                questions[counter].lastChild.style = "box-shadow: 0 0 3px #4BB543;";
            } else {
                revision.innerHTML = "Equivocado. Respuesta correcta: " + questionAnswer[questions[counter].firstChild.id].answer;
                revision.classList = "wrong-answer";
                questions[counter].lastChild.style = "box-shadow: 0 0 3px #cd4b3c;";
            }
            questions[counter].appendChild(revision);
        }
        const quizCheck = document.getElementById(CHECK_BUTTONS_TAG);
        quizCheck.style.display = "none";
        //const quizStartAgain = document.getElementById(START_AGAIN_TAG);
        //quizStartAgain.style.display += "block";
    }
}

function confirmSelection(confirmMessage) {
    return confirm(confirmMessage);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function startAgain(){
    location.reload();
}

const clear = section => section.innerHTML='';