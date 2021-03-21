const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "may",
    password: "may",
    database: "quiz"
})

con.connect(err => {
    if (err) throw err;
});


const URL = require('url').URL;
let http = require('http');
http.createServer(function (request, response) {
    const reqUrl = new URL(request.url, 'https://aamayzingg.com/COMP4537/labs/quiz/questions');
    // if (request.method == "POST"){
    //     const name = reqUrl.searchParams.get('name');
    //     const score = reqUrl.searchParams.get('score');
    //     let sql = `INSERT INTO scores(name, score) values ('${name}', ${score})`;
    //     try {
    //         con.query(sql, function (err, result) {
    //             if (err) throw err;
    //             response.writeHead(200, {'Content-type': 'text/plain', "Access-Control-Allow-Origin": "*"});
    //             response.end();
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // } else 
    if (request.method == "GET") {
        let questions = []
        let questionSql = "SELECT * FROM questions q";
        con.query(questionSql, function (err, rows, result) {
            if (!err){
                if (rows.length) {
                    for (let i = 0; i < rows.length; i++) {
                        let question = {}
                        question['id'] = rows[i].id
                        question['question'] = rows[i].question
                        let answerSql = `SELECT * FROM answers a where question_id = ${rows[i].id}`;
                        con.query(answerSql, question, function (err, result) {
                            if (!err){
                                if (result.length) {
                                    question['options'] = result;
                                    questions.push(question);
                                    console.log(questions);
                                }
                            } else {
                                throw err;
                            }
                        })
                    }
                    const resultStr = JSON.stringify(questions);
                    if (err) throw err;
                    response.writeHead(200, {'Content-type': 'text/plain', "Access-Control-Allow-Origin": "*"});
                    response.write(resultStr);
                    response.end();

                }
            }
        });
    }}   
).listen(8070);
console.log('listening...');
