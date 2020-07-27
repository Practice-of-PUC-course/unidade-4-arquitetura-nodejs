const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require('path');
const calc = require('@practice-of-puc-course/unidade-2-arquitetura-nodejs/fourOperations');

calc.exec=function(operation,n1,n2) {
  if(!operation || !n1 || !n2) return "Missing values...";
  let r = 0;
  try {
      r = calc[operation](n1,n2);
  } catch (error) {
      console.log(error);
  }
  return r;
};

const app = express();

//Inicializa um servidor HTTP orquestrado pelo express
const server = http.createServer(app);

app.use('/client', express.static(path.join(__dirname,'client')));

//Inicializa um instancia de servidor websocket a partir do servidor http
const wss = new WebSocket.Server({ server });

// Função responsável por manusear a conexão websocket
wss.on("connection", (ws) => {
  // Função que trata as mensagens recebidas pelo servidor
  ws.on("message", (message) => {
    console.log("Mensagem recebida: ", message);
    let operands=message.split(" ",3);
    let result=calc.exec(operands[1],operands[0],operands[2]);
    console.log("Resultado: ", result);
    ws.send(result);
  });
});

//Inicia o servidor
server.listen(process.env.PORT || 9898, () => {
  console.log("Servidor conectado na porta:", server.address().port);
});
