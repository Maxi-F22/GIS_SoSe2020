"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe08 = void 0;
const Http = require("http");
var Aufgabe08;
(function (Aufgabe08) {
    console.log("Starting server");
    //Port erstellen und setzen
    let port = Number(process.env.PORT);
    //Falls nicht vorhanden, auf 8100 setzen
    if (!port)
        port = 8100;
    //Server Variable und Listener erstellt
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    //Funktion für Konsolenausgabe
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        //Parameter für Response-Header setzen 
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //URL ausgeben
        _response.write(_request.url);
        console.log(_request.url);
        //Response Ende
        _response.end();
    }
})(Aufgabe08 = exports.Aufgabe08 || (exports.Aufgabe08 = {}));
//# sourceMappingURL=serverscriptA8.js.map