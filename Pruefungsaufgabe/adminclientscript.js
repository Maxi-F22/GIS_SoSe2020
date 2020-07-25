"use strict";
var Pruefungsaufgabe;
(function (Pruefungsaufgabe) {
    let orders;
    getOrders();
    let formData;
    async function getOrders() {
        let url = "https://gissose2020maxfla.herokuapp.com";
        url += "/getadmin";
        let response = await fetch(url);
        let responseText = await response.text();
        let responseJson = JSON.parse(responseText);
        generateOrders(responseJson);
    }
    let allOrdersDiv = document.getElementById("adminorders");
    function generateOrders(_responseJson) {
        orders = _responseJson;
        for (let i = 0; i < orders.length; i++) {
            let ordersDiv = document.createElement("div");
            ordersDiv.setAttribute("class", "adminordersdiv");
            allOrdersDiv.appendChild(ordersDiv);
            let ordersHeading = document.createElement("h3");
            ordersHeading.innerHTML = "Bestellung " + (i + 1);
            ordersDiv.appendChild(ordersHeading);
            let ordersName = document.createElement("p");
            ordersName.innerHTML = orders[i].vorname + " " + orders[i].nachname;
            ordersDiv.appendChild(ordersName);
            let ordersAdresse = document.createElement("p");
            ordersAdresse.innerHTML = orders[i].strasse + ", " + orders[i].stadt;
            ordersDiv.appendChild(ordersAdresse);
            let ordersArticles = document.createElement("p");
            let ordersArticlesString = orders[i].artikel.toString();
            let ordersArticlesArray = ordersArticlesString.split(",");
            for (let j = 0; j < ordersArticlesArray.length; j++) {
                if (j == ordersArticlesArray.length - 1) {
                    ordersArticles.innerHTML += ordersArticlesArray[j];
                }
                else {
                    ordersArticles.innerHTML += ordersArticlesArray[j] + ", ";
                }
            }
            ordersDiv.appendChild(ordersArticles);
            let ordersCount = document.createElement("p");
            ordersCount.innerHTML = orders[i].anzahl + " Artikel";
            ordersDiv.appendChild(ordersCount);
            let ordersPrice = document.createElement("p");
            ordersPrice.innerHTML = orders[i].preis.replace(".", ",") + "€";
            ordersDiv.appendChild(ordersPrice);
            let editAdresseButton = document.createElement("button");
            editAdresseButton.innerHTML = "Adresse bearbeiten";
            editAdresseButton.setAttribute("class", "adminbutton");
            ordersDiv.appendChild(editAdresseButton);
            editAdresseButton.addEventListener("click", handleClickEdit);
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Löschen";
            deleteButton.setAttribute("class", "adminbutton");
            ordersDiv.appendChild(deleteButton);
            deleteButton.addEventListener("click", handleClickDelete);
            let editDiv = document.createElement("div");
            let editHeader = document.createElement("h4");
            editHeader.innerHTML = "Neue Adresse:";
            editDiv.appendChild(editHeader);
            let editForm = document.createElement("form");
            editForm.setAttribute("method", "GET");
            editDiv.appendChild(editForm);
            let newAdressStreet = document.createElement("input");
            newAdressStreet.setAttribute("type", "text");
            newAdressStreet.setAttribute("name", "strasse");
            newAdressStreet.setAttribute("placeholder", "Neue Straße");
            editForm.appendChild(newAdressStreet);
            let newAdressCity = document.createElement("input");
            newAdressCity.setAttribute("type", "text");
            newAdressCity.setAttribute("name", "stadt");
            newAdressCity.setAttribute("placeholder", "Neue Stadt");
            editForm.appendChild(newAdressCity);
            let breakElement = document.createElement("br");
            editForm.appendChild(breakElement);
            let editFormButton = document.createElement("button");
            editFormButton.setAttribute("type", "button");
            editFormButton.setAttribute("id", "admineditbutton");
            editFormButton.innerHTML = "Ändern";
            editFormButton.addEventListener("click", handleClickEditSend);
            editForm.appendChild(editFormButton);
            function handleClickEdit() {
                ordersDiv.appendChild(editForm);
            }
            async function handleClickDelete() {
                let url = "https://gissose2020maxfla.herokuapp.com";
                url += "/delete" + "?_id=" + orders[i]._id;
                await fetch(url);
                document.location.reload();
            }
            async function handleClickEditSend() {
                formData = new FormData(document.forms[0]);
                let url = "https://gissose2020maxfla.herokuapp.com";
                // tslint:disable-next-line: no-any
                let query = new URLSearchParams(formData);
                console.log(query.toString());
                url += "/edit" + "?_id=" + orders[i]._id + "&" + query.toString();
                await fetch(url);
                document.location.reload();
            }
        }
    }
})(Pruefungsaufgabe || (Pruefungsaufgabe = {}));
//# sourceMappingURL=adminclientscript.js.map