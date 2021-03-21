import { createContentDiv, createQuestionDiv, createButton } from './doc.js';
import { updateLocalStorage } from './doc.js';

let numOfQuestions;
let numOfOptions = 4;

function createQuizQuestion(data) {
    let questionDiv = createQuestionDiv(data['id']);
    let questionTextArea = document.createElement("textarea");
    questionTextArea.id = `q${data['id']}-question`;
    questionTextArea.classList.add("question-textarea");
    questionTextArea.innerHTML = data['question'];
    questionDiv.appendChild(questionTextArea);

    let br = document.createElement("br");
    questionDiv.appendChild(br);

    for (let j = 0; j < numOfOptions; j++){
        let radiobox = document.createElement("input");
        radiobox.type = "radio";
        radiobox.id = `q${data['id']}-choice${j+1}`;
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
    // let deleteBtn = createButton('Delete', onDeleteClick);
    let backBtn = createButton('Back', function() {
        window.history.back()
    });
    menuDiv.appendChild(addBtn);
    menuDiv.appendChild(saveBtn);
    // menuDiv.appendChild(deleteBtn);
    menuDiv.appendChild(backBtn);
}

function getFilledQuestions(){
    let questionsDivs = document.getElementsByClassName("question-div");
    let questionsList = [];

    for (let i = 1; i <= questionsDivs.length; i++ ){
        let question = {}
        question['id'] = questionsDivs[i-1].id
        let questionText = document.getElementById(`q${i}-question`).value;
        question['question'] = questionText
        if (questionText === ""){
            alert(`Empty quiz questions: Question ${i}`);
            return [];
        }

        let selected = document.querySelector(`input[name="q${i}"]:checked`)
        if (selected === null){
            alert(`Please select answer: Question ${i}`);
            return [];
        }
        let choicesNodes = Array.from(questionsDivs[i-1].querySelectorAll("label textarea"));

        let choices = choicesNodes.map(node => (
            {
                'question_id': questionsDivs[i-1].id,
                'option_id': node.id.charAt(node.id.length - 5),
                "answer": node.value,
                "is_answer": node.id.includes(selected.id)
            }));
        question['options'] = choices;
        questionsList.push(question);
        console.log(questionsList)
    }
    return questionsList;
}


function onAddClick(){
    let data = {
        'id': numOfQuestions + 1,
        'question': '',
        'options': [
            {'answer': ""},
            {'answer': ""},
            {'answer': ""},
            {'answer': ""},
        ]
    }
    createQuizQuestion(data);
}

// function onDeleteClick(){

//     try {
//         let contentDiv = document.getElementById("content");
//         contentDiv.removeChild(contentDiv.lastChild);
//     } catch(err) {
//         return;
//     }

//     let filledQuestions = getFilledQuestions();
//     updateLocalStorage('questions', JSON.stringify(filledQuestions));

// }

function onSaveClick(){
    let filledQuestions = getFilledQuestions();
    if (filledQuestions.length == 0) {
        return ;
    }
    for (let i = 0; i < numOfQuestions; i++){
        
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "https://aamayzingg.com/COMP4537/labs/quiz/questions/", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(filledQuestions[i]));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                console.log(this.responseText);
            }
        }
    }

    for (let i = numOfQuestions; i < filledQuestions.length; i++){
        
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://aamayzingg.com/COMP4537/labs/quiz/questions/", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(filledQuestions[i]));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                console.log(this.responseText);
            }
        }
    }
    numOfQuestions = filledQuestions.length;
}


const xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://aamayzingg.com/COMP4537/labs/quiz/questions/", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        console.log(this.responseText);
        const data = JSON.parse(this.responseText);
        numOfQuestions = data.length;
        createContentDiv();
        for (let i = 0; i < data.length; i ++) {
            createQuizQuestion(data[i]);
        }   
        createMenu();
    }};
