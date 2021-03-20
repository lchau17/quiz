import { Question } from './question.js';
import { createContentDiv, createButton } from './doc.js';
import { getLocalStorage } from './doc.js';


function onSubmitClick(questionsList){
    let correctAnswer = 0;
    let selectedOptions = document.querySelectorAll("input:checked");
    let answers = Array.from(document.querySelectorAll(".correct"));
    answers.forEach(answer => answer.style.color = "green");

    for (let i = 0; i < selectedOptions.length; i++){
        let label = document.querySelector(`label[for=${selectedOptions[i].id}]`);
        if (label.classList.contains("correct")){
            correctAnswer++;
        } else {
            label.style.color = "red";
        }
    }

    let submitbtn = document.getElementById("SubmitBtn");
    submitbtn.style.display = "none";

    let radioButtons = document.querySelectorAll("input[type='radio']");
    for (let i = 0; i < radioButtons.length; i++){
        radioButtons[i].disabled = true;
    }
    
    let result = document.createElement("h3");
    result.id = "result";
    result.innerHTML = `Result: ${correctAnswer}/${questionsList.length}`
    let contentDiv = document.getElementById("content");
    contentDiv.appendChild(result);
}

function createStudentPage(){

    const questionsList = getLocalStorage("questions");

    
    if (questionsList.length === 0 || questionsList[0] === null){
        document.body.innerHTML = "No quiz question found"
    } else {
        let contentDiv = createContentDiv();
        Question.createStudentQuestionList(questionsList);

        let submitBtn = createButton('Submit', function(){
            onSubmitClick(questionsList)
        });
        contentDiv.appendChild(submitBtn);
    }

    let backBtn = createButton("Back", function(){
        window.history.back();
    })
    document.body.appendChild(backBtn);
}

createStudentPage();



