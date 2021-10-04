const {Router } = require('express');
const route = Router();
const path = require('path');
let ws = require("ws");
/**
 * Routes
 */

 let client = [];
 let clientNow = "";
 let servidor = new ws.Server({ port: 4001 });

route.get("/chat-code", (req, res) => {
  res.sendFile(path.join(__dirname+'/../public/') + "Login.html");
});

route.get("/chat-code/chat", (req, res) => {
    res.sendFile(path.join(__dirname+'/../public/') + "index.html");
  });

route.get("/chat-code/resource/css/:css", (req, res) => {
  const { css } = req.params;
  res.sendFile(path.join(__dirname+'/../public/') + "css/" + css + ".css");
});

route.get("/chat-code/resource/js/:js", (req, res) => {
    const { js } = req.params;
    res.sendFile(path.join(__dirname+'/../public/') + "js/" + js + ".js");
});

route.get('/chat-code/user/:name', (req, res) => {
  const { name } = req.params
  console.log(name);
  const searhcClient = client.find(user => user === name );
  if(searhcClient != 0){
    client.push(name);
    res.json({api:{route:'/chat', name:name,message:''}});
    return;
  }
  res.json({api:{route:'/',name:'',message:'Ese nombre ya esta ocupado!'}});
});

route.get('/chat-code/chat/:name', (req, res) => {
    const { name } = req.params
    servidor.clients.forEach(clients => {
        const messageJSON = {status: 'alert', message:name}
        clients.send(JSON.stringify(messageJSON)); 
    });
  });


servidor.on('connection', ws => {
    ws.on('message', datas => {
      const newMenssage = JSON.parse(datas);
      servidor.clients.forEach(client => {
        message = newMenssage;
        client.send(JSON.stringify(message));
      })
    })
    ws.on('close', e => {
         //[e];
        console.log(e);
    })
})

module.exports = {
    route
}