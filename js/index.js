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

let adminButton = createLinkButton('Admin', './admin.html');
let studentButton = createLinkButton('Student', './student.html');

document.body.appendChild(adminButton);
document.body.appendChild(studentButton);