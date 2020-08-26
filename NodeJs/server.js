var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require("fs");

app.use( bodyParser.json() );
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/login', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
        let response = {};
        let users = JSON.parse(data);
        let user = users.find(x => x.email == req.body.email && x.password == req.body.password);

        if(user == null)
        {
            response = { "status": false, "userID": null }
        }
        else
        {
            response = { "status": true, "userID": user.userID }
        }

        res.end( JSON.stringify(response) );
   });
})

app.post('/register', function (req, res) {
    let response = {};
    let newUser = req.body;
    newUser.userID = Date.now();

    fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
        let allUsers = JSON.parse(data);

        if(allUsers != null){
            allUsers.push(newUser)
        }
        else{
            allUsers = [ newUser ]
        }        

        try{
            fs.writeFileSync( __dirname + "/" + "user.json", JSON.stringify(allUsers));
            response = { "status": true, "userID": newUser.userID }
        }
        catch(exception){
            response = { "status": false, "userID": null }
        }

        res.end( JSON.stringify(response) );
    })
 })

app.get('/home', function (req, res) {
    fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
         let response = {};
         let users = JSON.parse(data);
         let user = users.find(x => x.userID == req.query.userID);

         if(user == null)
         {
             response = { "status": false, "user": null }
         }
         else
         {
             response = { "status": true, "user": user }
         }
 
         res.end( JSON.stringify(response) );
    });
 })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})