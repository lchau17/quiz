import { createQuestionDiv } from './doc.js';


const numOfOptions = 4;


class Question{
    constructor(question, options, answer){
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.node = null;
    }

    createStudentQuestion(questionNumber){
        let questionDiv = createQuestionDiv(questionNumber);
        let question = document.createElement("p");
        question.innerText = this.question;
        questionDiv.appendChild(question);
        for (let i = 0; i < numOfOptions; i++){
            let radiobox = document.createElement('input');
            radiobox.type = "radio";
            radiobox.id = `q${questionNumber}-choice${i+1}`;
            radiobox.name =  `q${questionNumber}`;
    
            let label = document.createElement('label');
            label.htmlFor = radiobox.id;
            label.innerHTML = this.options[i];
            if (this.options[i] === this.answer){
                label.classList.add("correct");
            } else{
                label.classList.add("incorrent");
            }

            let br = document.createElement("br");
            
            questionDiv.appendChild(br);
            questionDiv.appendChild(radiobox);
            questionDiv.appendChild(label);
            questionDiv.appendChild(br);
        }
    }

    static createStudentQuestionList(questionsList){
        for(let i = 0; i < questionsList.length; i++){
            let questions = questionsList[i];
            let question = new Question(
                questions['question'], questions['options'], questions['answer']);
            question.createStudentQuestion(i+1);
        }
    }
}

export { Question, numOfOptions };