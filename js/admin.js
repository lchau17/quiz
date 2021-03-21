import { Question, numOfOptions } from './question.js';
import { createContentDiv, createQuestionDiv, createButton } from './doc.js';
import { updateLocalStorage } from './doc.js';

let numOfQuestions;

function createQuizQuestion(data) {
    let questionDiv = createQuestionDiv(data['id']);
    let questionTextArea = document.createElement("textarea");
    questionTextArea.id = `q${dat['ida']}-question`;
    questionTextArea.classList.add("question-textarea");
    questionTextArea.innerHTML = data[i]['question'];
    questionDiv.appendChild(questionTextArea);

    let br = document.createElement("br");
    questionDiv.appendChild(br);

    for (let j = 0; j < numOfOptions; j++){
        let radiobox = document.createElement("input");
        radiobox.type = "radio";
        radiobox.id = `q${data['id']}-choice${i+1}`;
        radiobox.name =  `q${data['id']}`;
        radiobox.checked = Boolean(data['options'][j]['is_answer']);

        let label = document.createElement('label');
        label.htmlFor = radiobox.id;
        
        let choiceText = document.createElement("textarea");
        choiceText.id = `${radiobox.id}Text`;
        choiceText.classList.add("choice-textarea");
        choiceText.setAttribute("type", "text");
        choiceText.innerHTML = data['options'][j]['answer']

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
    data = {
        'id': ++numOfQuestions,
        'question': '',
        'options': ['', '', '', '']
    }
    createQuizQuestion(data);
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


const xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://aamayzingg.com/COMP4537/labs/quiz/questions", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        console.log(this.responseText);
        const data = JSON.parse(this.responseText);
        numOfQuestions = data.length;
        for (let i = 0; i < data.length; i ++) {
            createQuizQuestion(data[i]);


        createContentDiv();
        createMenu();
    }};
