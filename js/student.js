import { createContentDiv, createButton, createQuestionDiv } from './doc.js';


const numOfOptions = 4;


function onSubmitClick(questionsList) {
    let rightAnwser = 0;

    for (let i = 0; i < questionsList.length; i++) {
        let selected = document.querySelector(`input[name='q${i+1}']:checked`);
        if (!selected) {
            continue;
        }
        for (let j = 0; j < numOfOptions; j++) {
            if (questionsList[i]['options'][j]['is_answer'] == 1) {
                let answer = questionsList[i]['options'][j]['answer'];
                let label = document.querySelector(`label[for='${selected.id}']`);
                if (selected.value == answer) {
                    label.classList.add("correct");
                    rightAnwser++;
                } else {
                    label.classList.add("incorrect");
                }
            }
        }
    }
    console.log(rightAnwser);

    let submitbtn = document.getElementById("SubmitBtn");
    submitbtn.style.display = "none";

    let radioButtons = document.querySelectorAll("input[type='radio']");
    for (let i = 0; i < radioButtons.length; i++){
        radioButtons[i].disabled = true;
    }
    
    let result = document.createElement("h3");
    result.id = "result";
    result.innerHTML = `Result: ${rightAnwser}/${questionsList.length}`
    let contentDiv = document.getElementById("content");
    contentDiv.appendChild(result);
}


function createStudentQuestion(question) {
    let questionDiv = createQuestionDiv(question['id']);
    let questionText = document.createElement("p");
    questionText.innerText = question['question'];
    questionDiv.appendChild(questionText);
    let options = question['options']
    for (let i = 0; i < numOfOptions; i++){
        let radiobox = document.createElement('input');
        radiobox.type = "radio";
        radiobox.id = `q${question['id']}-choice${i+1}`;
        radiobox.name =  `q${question['id']}`;
        radiobox.value = options[i]['answer'];

        let label = document.createElement('label');
        label.htmlFor = radiobox.id;
        label.innerHTML = options[i]['answer'];
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
        let numOfQuestions = data.length;
        if (numOfQuestions === 0){
            document.body.innerHTML = "No quiz question found"
            return;
        }
        let contentDiv = createContentDiv();


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
