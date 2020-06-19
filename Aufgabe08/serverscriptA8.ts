import * as Http from "http";

export namespace Aufgabe08 {
  console.log("Starting server");
  //Port erstellen und setzen
  let port: number = Number(process.env.PORT);
  //Falls nicht vorhanden, auf 8100 setzen
  if (!port)
    port = 8100;

  //Server Variable und Listener erstellt
  let server: Http.Server = Http.createServer();
  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);
  server.listen(port);

  //Funktion für Konsolenausgabe
  function handleListen(): void {
    console.log("Listening");
  }

  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
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
}