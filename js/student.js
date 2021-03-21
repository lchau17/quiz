import { Question } from './question.js';
import { createContentDiv, createButton } from './doc.js';
import { getLocalStorage } from './doc.js';


const numOfOptions = 4;


function onSubmitClick(questionsList){
    let rightAnwser = []
    for (let i = 0; i < questionsList; i++){
        rightAnswer.push(questionsList[i]['options'].filter(o => o['is_answer'] === true))

    }
    console.log(rightAnwser)

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


createStudentQuestion(question) {
    let questionDiv = createQuestionDiv(question['id']);
    let questionText = document.createElement("p");
    questionText.innerText = question['question'];
    questionDiv.appendChild(questionText);
    for (let i = 0; i < numOfOptions; i++){
        let radiobox = document.createElement('input');
        radiobox.type = "radio";
        radiobox.id = `q${question['id']}-choice${i+1}`;
        radiobox.name =  `q${question['id']}`;

        let label = document.createElement('label');
        label.htmlFor = radiobox.id;
        label.innerHTML = this.options[i];
        // if (this.options[i] === this.answer){
        //     label.classList.add("correct");
        // } else{
        //     label.classList.add("incorrent");
        // }

        let br = document.createElement("br");
        
        questionDiv.appendChild(br);
        questionDiv.appendChild(radiobox);
        questionDiv.appendChild(label);
        questionDiv.appendChild(br);
    }
}



const xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://aamayzingg.com/COMP4537/labs/quiz/questions/", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        console.log(this.responseText);
        const data = JSON.parse(this.responseText);
        numOfQuestions = data.length;
        if (numOfQuestions === 0){
            document.body.innerHTML = "No quiz question found"
            return;
        }
        contentDiv = createContentDiv();


        for (let i = 0; i < data.length; i ++) {
            createStudentQuestion(data[i]);
        }   
        let submitBtn = createButton('Submit', function(){
            onSubmitClick(data)
        });
        contentDiv.appendChild(submitBtn);
        let backBtn = createButton("Back", function(){
            window.history.back();
        })
        document.body.appendChild(backBtn);
    }};
