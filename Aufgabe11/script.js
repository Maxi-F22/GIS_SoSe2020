"use strict";
var Aufgabe11;
(function (Aufgabe11) {
    let formData;
    let sendClick = document.getElementById("buttonSend");
    sendClick.addEventListener("click", handleSendClick);
    let retrieveClick = document.getElementById("buttonRetrieve");
    retrieveClick.addEventListener("click", handleRetrieveClick);
    async function handleSendClick() {
        formData = new FormData(document.forms[0]);
        let url = "https://gissose2020maxfla.herokuapp.com";
        let query = new URLSearchParams(formData);
        url += "/send" + "?" + query.toString();
        await fetch(url);
    }
    async function handleRetrieveClick() {
        let url = "https://gissose2020maxfla.herokuapp.com";
        url += "/get";
        let response = await fetch(url);
        let responseText = await response.json();
        let responseDiv = document.getElementById("response");
        responseDiv.innerHTML = responseText;
    }
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=script.js.map