const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
const puVapidKey = 'BM9ygFMJVJC5ep6lNjWsr6ibSKOYMXqGUZLpMwoLjISiBYl5YWa6Vg58R2gzk4BkyRhmsQIqpVVc9XfPYLnsN0I';
const priVapidKey=  'VyoBTXt1hZziw464vj5Blk-hN-kMy8pitHqkRnMV96A';
webPush.setVapidDetails('mailto: test@test.com', puVapidKey, priVapidKey);
app.post('/subscribe', function(req, res){
    const subscription = req.body;
    const payload = JSON.stringify({title:'Push test'});
    webPush.sendNotification(subscription,payload).catch(err=>console.error(err));
});
app.listen(5000,function(){
    console.log("Server started at port 5000");
});