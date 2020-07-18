import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Pruefungsaufgabe {

    let containers: Mongo.Collection;
    let flavours: Mongo.Collection;
    let toppings: Mongo.Collection;
    let extras: Mongo.Collection;

    let dataBaseUrl: string = "mongodb+srv://Testuser:qwer1234@maxigis.3ftzn.mongodb.net/Test?retryWrites=true&w=majority";

    let port: number = Number(process.env.PORT);

    if (!port) {
        port = 8100;
    }

    startServer(port);

    connectToDatabase(dataBaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.listen(_port);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        containers = mongoClient.db("Shop").collection("Containers");
        flavours = mongoClient.db("Shop").collection("Flavours");
        toppings = mongoClient.db("Shop").collection("Toppings");
        extras = mongoClient.db("Shop").collection("Extras");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let path: string | null = url.pathname;

            if (path == "/get") {
                let containersResponse: string = JSON.stringify(await containers.find().toArray());
                let flavoursResponse: string = JSON.stringify(await flavours.find().toArray());
                let toppingsResponse: string = JSON.stringify(await toppings.find().toArray());
                let extrasResponse: string = JSON.stringify(await extras.find().toArray());

                let responseAll: string = containersResponse + flavoursResponse + toppingsResponse + extrasResponse;

                _response.write(responseAll);
            }

        }

        _response.end();
    }


}