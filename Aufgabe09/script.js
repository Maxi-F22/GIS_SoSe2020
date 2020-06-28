"use strict";
var Aufgabe09;
(function (Aufgabe09) {
    let formData;
    //Event Listener für Buttons erstellen
    let htmlClick = document.getElementById("buttonHtml");
    htmlClick.addEventListener("click", handleHTMLClick);
    let jsonClick = document.getElementById("buttonJson");
    jsonClick.addEventListener("click", handleJSONClick);
    async function handleHTMLClick() {
        formData = new FormData(document.forms[0]);
        //URL setzen und HTML + Query hinzufügen
        let url = "https://gissose2020maxfla.herokuapp.com";
        let query = new URLSearchParams(formData);
        url += "/html" + "?" + query.toString();
        //Response deklarieren und Query Text ausgeben
        let response = await fetch(url);
        let responseText = await response.text();
        let responseDiv = document.getElementById("response");
        responseDiv.innerHTML = responseText;
    }
    async function handleJSONClick() {
        formData = new FormData(document.forms[0]);
        let url = "https://gissose2020maxfla.herokuapp.com";
        let query = new URLSearchParams(formData);
        url += "/json" + "?" + query.toString();
        //JSON fetchen und in Konsole ausgeben
        let response = await fetch(url);
        let responseText = await response.json();
        console.log(responseText);
    }
})(Aufgabe09 || (Aufgabe09 = {}));
//# sourceMappingURL=script.js.map