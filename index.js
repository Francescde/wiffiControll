//var robot = require("robotjs");
//var ks = require('node-key-sender');
var robot = require("kbm-robot");
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0");

var actionsP1 =['up','down','right','left','shift','enter','q','w','a','s','d'];
function executeAction(controller,action){
    if(controller==1){
        //ks.sendKey(actionsP1[action-1]);
        //robot.keyTap(actionsP1[action-1]);

        robot.press(actionsP1[action-1]);
            //.typeString("Hello World!");
        //robot.press(actionsP1[action-1]);
    }
}
console.log('API server started on: ' + port);
app.get('/controller/:controller/action/:action', function (req, res, next) {
    var controller = req.params.controller;
    var actions = req.params.action;
    actionsArr = actions.split(",");
    //robot.startJar();
    if(actionsArr.length>0) {
        robot.startJar();
        for (var i = 0, len = actionsArr.length; i < len; i++) {
            executeAction(controller,parseInt(actionsArr[i]));
        }
        robot.go().then(robot.stopJar);
    }
    //robot.go().then(robot.stopJar);

    console.log('controller '+controller+' asks action '+actions);
});
