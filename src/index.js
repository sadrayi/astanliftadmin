#!/usr/bin/env node

/**
 * Module dependencies.
 */


var app = require('./app').app;
var server = require('http').createServer(app);
const io = require('socket.io')(server);
var User = require("../src/model/user");
var address = require("../src/model/address");


io.on('connection',(socket)=>{
    console.log("connected");
    io.emit('announcements', { message: 'connected' });
    console.log(socket.id);
    socket.on('message',async (client)=>{
        console.log("phone:"+client);
        await User.findOne({phone:client}).then(async function (res3) {
            console.log("users:"+res3);
            if (res3 !== null) {
                await address.find({phone:client}).then(async function (res4) {
                    console.log("addresses:"+res4);
                    socket.emit("userdetail", {user:res3, address:res4});
                })
            }
            else {
                socket.emit("userdetail", {user: null, address: null});
            }
        });
        });
});

server.listen(app.get('port'), () => {
    console.log('App running on port', app.get('port'));
});
