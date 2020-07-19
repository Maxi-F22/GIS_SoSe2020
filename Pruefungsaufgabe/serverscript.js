"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pruefungsaufgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Pruefungsaufgabe;
(function (Pruefungsaufgabe) {
    let containers;
    let flavours;
    let toppings;
    let extras;
    let orders;
    let dataBaseUrl = "mongodb+srv://Testuser:qwer1234@maxigis.3ftzn.mongodb.net/Test?retryWrites=true&w=majority";
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    startServer(port);
    connectToDatabase(dataBaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        containers = mongoClient.db("Shop").collection("Containers");
        flavours = mongoClient.db("Shop").collection("Flavours");
        toppings = mongoClient.db("Shop").collection("Toppings");
        extras = mongoClient.db("Shop").collection("Extras");
        orders = mongoClient.db("Shopowner").collection("Orders");
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            let containersResponse = JSON.stringify(await containers.find().toArray());
            containersResponse = containersResponse.replace("[", "");
            containersResponse = containersResponse.replace("]", "");
            let flavoursResponse = JSON.stringify(await flavours.find().toArray());
            flavoursResponse = flavoursResponse.replace("[", "");
            flavoursResponse = flavoursResponse.replace("]", "");
            let toppingsResponse = JSON.stringify(await toppings.find().toArray());
            toppingsResponse = toppingsResponse.replace("[", "");
            toppingsResponse = toppingsResponse.replace("]", "");
            let extrasResponse = JSON.stringify(await extras.find().toArray());
            extrasResponse = extrasResponse.replace("[", "");
            extrasResponse = extrasResponse.replace("]", "");
            let responseAll = "[" + containersResponse + "," + flavoursResponse + "," + toppingsResponse + "," + extrasResponse + "]";
            if (path == "/getclient") {
                _response.write(responseAll);
            }
            else if (path == "/send") {
                orders.insertOne(url.query);
            }
        }
        _response.end();
    }
})(Pruefungsaufgabe = exports.Pruefungsaufgabe || (exports.Pruefungsaufgabe = {}));
//# sourceMappingURL=serverscript.js.map