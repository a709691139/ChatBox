const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server ,{origins:'*'}),
    core = require('./core');

core.init(io);

// app.use('/', express.static(__dirname + '/dist'));
// app.use('/', express.static("F:/project/ChatOnline/trunk/app"));
// app.use('/', express.static("F:/project/ChatOnline/trunk/www"));
//bind the server to the 80 port
//server.listen(3000);//for local test
server.listen('8888', function () { //publish to heroku   process.env.PORT || 3000
  let host = server.address().address;
  let port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
// console.log('server started on port'+process.env.PORT || 8888);

