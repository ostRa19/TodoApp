const express = require('express');
const app = express();
const PORT = 8081;
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let task = ["bye socks", "drive car"];
let complete = ["wash fruits"];

app.get('/', (req, res) => {
    res.render('index', {task: task, complete: complete});
})

app.post('/addtask', (req, res) => {
    task.push(req.body.newtask);
    res.redirect("/");
})

app.post('/removetask', (req, res) => {
    let completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (completeTask === "object") {
        for (let i = 0; i < task.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }

    res.redirect("/");
})

app.listen(PORT);
