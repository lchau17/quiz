import { Question, numOfOptions } from './question.js';
import { createContentDiv, createQuestionDiv, createButton } from './doc.js';
import { updateLocalStorage } from './doc.js';


function createQuizQuestion(questionNumber) {
    let questionDiv = createQuestionDiv(questionNumber);

    let questionTextArea = document.createElement("textarea");
    questionTextArea.id = `q${questionNumber}-question`;
    questionTextArea.classList.add("question-textarea");
    questionDiv.appendChild(questionTextArea);

    let br = document.createElement("br");
    questionDiv.appendChild(br);

    for (let i = 0; i < numOfOptions; i++){
        let radiobox = document.createElement("input");
        radiobox.type = "radio";
        radiobox.id = `q${questionNumber}-choice${i+1}`;
        radiobox.name =  `q${questionNumber}`;

        let label = document.createElement('label');
        label.htmlFor = radiobox.id;
        
        let choiceText = document.createElement("textarea");
        choiceText.id = `${radiobox.id}Text`;
        choiceText.classList.add("choice-textarea");
        choiceText.setAttribute("type", "text");
        
        label.appendChild(choiceText);

        let br = document.createElement("br");
        
        questionDiv.appendChild(br);
        questionDiv.appendChild(radiobox);
        questionDiv.appendChild(label);
        questionDiv.appendChild(br);
    }
}


function createMenu(){
    let menuDiv = document.createElement("div");
    menuDiv.id = "menu"
    document.body.appendChild(menuDiv);

    let addBtn = createButton('Add', onAddClick);
    let saveBtn = createButton('Save Changes', onSaveClick);
    let deleteBtn = createButton('Delete', onDeleteClick);
    let backBtn = createButton('Back', function() {
        window.history.back()
    });
    menuDiv.appendChild(addBtn);
    menuDiv.appendChild(saveBtn);
    menuDiv.appendChild(deleteBtn);
    menuDiv.appendChild(backBtn);
}

function getFilledQuestions(){
    let questions = document.getElementsByClassName("question-div");
    let questionsList = [];

    for (let i = 0; i < questions.length; i++ ){
        let question = questions[i];
        let filledQuestionNumber = i + 1;
        let answer;
        let questionText = document.getElementById(`q${filledQuestionNumber}-question`).value;
        if (questionText === ""){
            alert(`Empty quiz questions: Question ${filledQuestionNumber}`);
            return [];
        }

        let choicesNodes = Array.from(question.querySelectorAll("label textarea"));

        let choices = choicesNodes.map(node => node.value);
        let selected = document.querySelector(`input[name="q${filledQuestionNumber}"]:checked`)
        if (selected === null){
            alert(`Please select answer: Question ${filledQuestionNumber}`);
            return [];
        }
        let selectedId = selected.id
        answer = document.querySelector(`label[for="${selectedId}"] textarea`).value;
        questionsList.push(new Question(questionText, choices, answer));
    }

    return questionsList;
}


function onAddClick(){

    let filledQuestions = getFilledQuestions();
    if (filledQuestions.length !== 0) {
        updateLocalStorage('questions', JSON.stringify(filledQuestions));
        createQuizQuestion(filledQuestions.length + 1);
    }

    let content = document.getElementById("content")
    if (content.children.length === 0){
        createQuizQuestion(1);
    }
}

function onDeleteClick(){

    try {
        let contentDiv = document.getElementById("content");
        contentDiv.removeChild(contentDiv.lastChild);
    } catch(err) {
        return;
    }

    let filledQuestions = getFilledQuestions();
    updateLocalStorage('questions', JSON.stringify(filledQuestions));

}

function onSaveClick(){
    let filledQuestions = getFilledQuestions();
    updateLocalStorage('questions', JSON.stringify(filledQuestions));
}


createContentDiv();
createQuizQuestion(1);
createMenu();


