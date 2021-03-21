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
    let data = '';

    request.on('data', chunk => {
        data += chunk;
    })
    request.on('end', () => {
        console.log(data); // 'Buy the milk'
        
        console.log(request.method);
        const reqUrl = new URL(request.url, 'https://aamayzingg.com/COMP4537/labs/quiz/questions');
        if (request.method == "POST") {
            console.log("POST");
            data = JSON.parse(data);
            console.log(data);
            const id = data['id'];
            const question = data['question'];
            let sql = `INSERT INTO questions(question) values ('${question}')`;
            try {
                con.query(sql, function (err, result) {
                    if (err) 
                    {
                        throw err;
                    } else {
                        const options = data['options'];
                        for (let i = 0; i < options.length; i++) {
                            let sql = `INSERT INTO answers(question_id, option_id, answer, is_answer) values (${id}, ${options[i]['option_id']}, '${options[i]['answer']}', ${options[i]['is_answer']})`;
                            con.query(sql, function (err, result) {
                                if (err) {
                                    throw err;
                                } else {
                                    response.writeHead(200, {'Content-type': 'text/plain', "Access-Control-Allow-Origin": "*"});
                                    response.end();
                                }
                            });
                        }
                    }
                })
            } catch (err) {
                console.log(err);
            }        
            
        } else if (request.method == "GET") {
            let questions = []
            let questionSql = "SELECT * FROM questions q";
            con.query(questionSql, function (err, rows) {
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
                                        if (i == rows.length - 1) {
                                            const resultStr = JSON.stringify(questions);
                                            if (err) throw err;
                                            response.writeHead(200, {'Content-type': 'text/plain', "Access-Control-Allow-Origin": "*"});
                                            response.write(resultStr);
                                            response.end();
                                        }
                                    }
                                } else {
                                    throw err;
                                }
                            })
                        }
                        
                    }
                }
            });
        }
    })
}).listen(8070);
console.log('listening...');
 