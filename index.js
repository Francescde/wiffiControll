var robot = require("robotjs");
//var ks = require('node-key-sender');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0");

var actionsP1 =['up','down','right','left','shift','enter','q','w','a','s','d'];
function executeAction(controller,action){
    if(controller==1){
        //ks.sendKey(actionsP1[action-1]);
        robot.sendkey(actionsP1[action-1]);
    }
}
console.log('API server started on: ' + port);
app.get('/controller/:controller/action/:action', function (req, res, next) {
    var controller = req.params.controller;
    var actions = req.params.action;
    actionsArr = actions.split(",");
    for (var i = 0, len = actionsArr.length; i < len; i++) {
        executeAction(controller,parseInt(actionsArr[i]));
    }

    console.log('controller '+controller+' asks action '+actions);
});
