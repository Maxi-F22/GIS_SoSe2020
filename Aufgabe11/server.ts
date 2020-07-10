import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Aufgabe11 {
    let students: Mongo.Collection;
    let dataBaseUrl: string = "mongodb+srv://Testuser:qwer1234@maxigis.3ftzn.mongodb.net/Test?retryWrites=true&w=majority";
    

    console.log("Starting server");
  
    let port: number = Number(process.env.PORT);
    
    if (!port) {
        port = 8100;
    }

    startServer(port);

    connectToDatabase(dataBaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        students = mongoClient.db("Test").collection("Students");
        console.log("Database connection ", students != undefined);

    }

 
    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
       
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
           
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let path: string | null = url.pathname;
         
            if (path == "/get") {
                _response.write(JSON.stringify(await students.find().toArray()));
            }

            else if (path == "/send") {
              students.insertOne(url.query);
            }


        }

        _response.end();
    }

    
}