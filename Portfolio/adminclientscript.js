"use strict";
var Pruefungsaufgabe;
(function (Pruefungsaufgabe) {
    const ORDERS_KEY = "eisdealer_orders_v1";
    const allOrdersDiv = document.getElementById("adminorders");
    renderOrders();
    function renderOrders() {
        allOrdersDiv.innerHTML = "";
        const orders = loadOrders();
        if (orders.length === 0) {
            return;
        }
        orders.forEach((order, index) => {
            const ordersDiv = document.createElement("div");
            ordersDiv.setAttribute("class", "adminordersdiv");
            const heading = document.createElement("h3");
            heading.innerText = "Bestellung " + (index + 1);
            const name = document.createElement("p");
            name.innerText = order.vorname + " " + order.nachname;
            const address = document.createElement("p");
            address.innerText = order.strasse + ", " + order.stadt;
            const articles = document.createElement("p");
            articles.innerText = normalizeArticleList(order.artikel).join(", ");
            const count = document.createElement("p");
            count.innerText = order.anzahl + " Artikel";
            const price = document.createElement("p");
            price.innerText = order.preis.replace(".", ",") + "EUR";
            const date = document.createElement("p");
            date.innerText = "Erstellt: " + new Date(order.createdAt).toLocaleString();
            const editButton = document.createElement("button");
            editButton.innerText = "Adresse bearbeiten";
            editButton.setAttribute("class", "adminbutton");
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Löschen";
            deleteButton.setAttribute("class", "adminbutton");
            const editWrapper = document.createElement("div");
            const streetInput = document.createElement("input");
            streetInput.type = "text";
            streetInput.placeholder = "Neue Strasse";
            streetInput.value = order.strasse;
            const cityInput = document.createElement("input");
            cityInput.type = "text";
            cityInput.placeholder = "Neue Stadt";
            cityInput.value = order.stadt;
            const saveButton = document.createElement("button");
            saveButton.type = "button";
            saveButton.id = "admineditbutton";
            saveButton.innerText = "Ändern";
            editWrapper.style.display = "none";
            editWrapper.appendChild(streetInput);
            editWrapper.appendChild(cityInput);
            editWrapper.appendChild(document.createElement("br"));
            editWrapper.appendChild(saveButton);
            editButton.addEventListener("click", () => {
                editWrapper.style.display = editWrapper.style.display === "none" ? "block" : "none";
            });
            saveButton.addEventListener("click", () => {
                const street = streetInput.value.trim();
                const city = cityInput.value.trim();
                if (!street || !city) {
                    alert("Bitte Strasse und Stadt eingeben.");
                    return;
                }
                const updatedOrders = loadOrders();
                const orderIndex = updatedOrders.findIndex((entry) => entry.id === order.id);
                if (orderIndex >= 0) {
                    updatedOrders[orderIndex].strasse = street;
                    updatedOrders[orderIndex].stadt = city;
                    saveOrders(updatedOrders);
                    renderOrders();
                }
            });
            deleteButton.addEventListener("click", () => {
                const updatedOrders = loadOrders().filter((entry) => entry.id !== order.id);
                saveOrders(updatedOrders);
                renderOrders();
            });
            ordersDiv.appendChild(heading);
            ordersDiv.appendChild(name);
            ordersDiv.appendChild(address);
            ordersDiv.appendChild(articles);
            ordersDiv.appendChild(count);
            ordersDiv.appendChild(price);
            ordersDiv.appendChild(date);
            ordersDiv.appendChild(editButton);
            ordersDiv.appendChild(deleteButton);
            ordersDiv.appendChild(editWrapper);
            allOrdersDiv.appendChild(ordersDiv);
        });
    }
    function normalizeArticleList(_value) {
        if (Array.isArray(_value)) {
            return _value;
        }
        if (!_value) {
            return [];
        }
        return _value.split(",").map((entry) => entry.trim()).filter(Boolean);
    }
    function loadOrders() {
        const raw = localStorage.getItem(ORDERS_KEY);
        if (!raw) {
            return [];
        }
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch (_error) {
            return [];
        }
    }
    function saveOrders(_orders) {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(_orders));
    }
})(Pruefungsaufgabe || (Pruefungsaufgabe = {}));
//# sourceMappingURL=adminclientscript.js.map