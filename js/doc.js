function createContentDiv(){
    let contentDiv = document.createElement("div");
    contentDiv.id = "content"
    document.body.appendChild(contentDiv);
    return contentDiv;
}

function createLinkButton(label, link){
    let newBtn = document.createElement("button");
    newBtn.id = `${label.replace(/ +/g, "")}Btn`;
    newBtn.value = label;
    newBtn.innerHTML = label;

    let a = document.createElement("a");
    a.href = link;
    a.appendChild(newBtn)
    return a;
}


function createQuestionDiv(questionNumber){
    let contentDiv = document.getElementById("content");
    let questionDiv = document.createElement("div");
    questionDiv.classList.add("question-div");
    questionDiv.id = questionNumber;

    contentDiv.appendChild(questionDiv);

    let questionNum = document.createElement("h3");
    questionNum.innerHTML = `Question ${questionNumber}`;
    questionDiv.appendChild(questionNum);
    return questionDiv;
}

function createButton(label, handler){
    let newBtn = document.createElement("button");
    newBtn.id = `${label.replace(/ +/g, "")}Btn`;
    newBtn.value = label;
    newBtn.onclick = handler;
    newBtn.innerHTML = label;
    return newBtn;
}


function updateLocalStorage(key, value){
    if (typeof(Storage)=="undefined"){
        document.write("Local storage not supported");
        window.stop();
    }
    localStorage.setItem(key, value);
}

function getLocalStorage(key){
    if (typeof(Storage)=="undefined"){
        document.write("Local storage not supported");
        window.stop();
    }
    let item = localStorage.getItem(key);
    return JSON.parse(item);
}

export {createLinkButton};
export { createContentDiv, createQuestionDiv, createButton };
export { getLocalStorage, updateLocalStorage };
