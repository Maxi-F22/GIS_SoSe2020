import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Pruefungsaufgabe {

    let containers: Mongo.Collection;
    let flavours: Mongo.Collection;
    let toppings: Mongo.Collection;
    let extras: Mongo.Collection;
    let orders: Mongo.Collection;

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
        server.addListener("listening", handleListen);
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
        orders = mongoClient.db("Shopowner").collection("Orders");
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

            let containersResponse: string = JSON.stringify(await containers.find().toArray());
            containersResponse = containersResponse.replace("[", "");
            containersResponse = containersResponse.replace("]", "");
            let flavoursResponse: string = JSON.stringify(await flavours.find().toArray());
            flavoursResponse = flavoursResponse.replace("[", "");
            flavoursResponse = flavoursResponse.replace("]", "");
            let toppingsResponse: string = JSON.stringify(await toppings.find().toArray());
            toppingsResponse = toppingsResponse.replace("[", "");
            toppingsResponse = toppingsResponse.replace("]", "");
            let extrasResponse: string = JSON.stringify(await extras.find().toArray());
            extrasResponse = extrasResponse.replace("[", "");
            extrasResponse = extrasResponse.replace("]", "");

            let responseAll: string = "[" + containersResponse + "," + flavoursResponse + "," + toppingsResponse + "," + extrasResponse + "]";


            if (path == "/getclient") {
                _response.write(responseAll);
            }

            else if (path == "/send") {
                orders.insertOne(url.query);
            }

            else if (path == "/getadmin") {
                _response.write(JSON.stringify(await orders.find().toArray()));
            }

            else if (path == "/delete") {
                for (let i in url.query) {
                    let idValue: string = <string>url.query[i];
                    let orderId: Mongo.ObjectID = new Mongo.ObjectID(idValue);
                    orders.deleteOne({ _id: orderId });
                }
            }

            else if (path == "/edit") {
                let idString: string = "";
                let streetString: string = "";
                let cityString: string = "";
                for (let i in url.query) {
                    if (i == "_id") {
                        idString = <string>url.query[i];
                    }
                    else if (i == "strasse") {
                        streetString = <string>url.query[i];
                    }
                    else if (i == "stadt") {
                        cityString = <string>url.query[i];
                    }
                }
                let orderId: Mongo.ObjectID = new Mongo.ObjectID(idString);
                orders.updateOne({ _id: orderId }, { $set: { strasse: streetString, stadt: cityString } });
                
            }


        }

        _response.end();
    }


}