import * as Http from "http";
import * as Url from "url";

export namespace Aufgabe09 {
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
        //Parameter für Response-Header setzen 
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            //URL und Path als Variable deklarieren
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let path: string | null = url.pathname;
            //Checken ob im Path /html oder /json vorkommt
            if (path == "/html") {
                //Jedes Element im Query im HTML schreiben
                for (let key in url.query) {
                    _response.write(key + ": " + url.query[key] + "<br/>");
                }
            }
            else if (path == "/json") {
                //JSON erstellen und ausgeben
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
            }
        }

        //Response Ende
        _response.end();
    }
}