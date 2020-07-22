"use strict";
var Aufgabe11;
(function (Aufgabe11) {
    let formData;
    let sendClick = document.getElementById("buttonSend");
    sendClick.addEventListener("click", handleSendClick);
    let retrieveClick = document.getElementById("buttonGet");
    retrieveClick.addEventListener("click", handleRetrieveClick);
    async function handleSendClick() {
        formData = new FormData(document.forms[0]);
        let url = "http://localhost:8100";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url += "/send" + "?" + query.toString();
        await fetch(url);
    }
    async function handleRetrieveClick() {
        let url = "https://gissose2020maxfla.herokuapp.com";
        url += "/get";
        let response = await fetch(url);
        let responseText = await response.text();
        let responseP = document.getElementById("response");
        responseP.innerHTML = responseText;
        let responseDiv = document.getElementById("responseDiv");
        responseDiv.style.display = "block";
    }
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=script.js.map