"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    getArticles("json_data.json");
    async function getArticles(_url) {
        let response = await fetch(_url);
        let jsonArticles = await response.json();
        Aufgabe07.allArticles = await JSON.parse(JSON.stringify(jsonArticles));
        let priceAll = 0;
        priceAll = parseFloat(localStorage.getItem("gesamtPreis"));
        let artikelZaehler = 0;
        artikelZaehler = parseInt(localStorage.getItem("artikelCount"));
        //Alles Löschen Button
        let buttonDeleteAll = document.createElement("button");
        buttonDeleteAll.innerHTML = "Alles Löschen";
        buttonDeleteAll.setAttribute("id", "Delete-Button");
        document.getElementById("Price-Delete")?.appendChild(buttonDeleteAll);
        buttonDeleteAll.addEventListener("click", handleDeleteAll);
        function handleDeleteAll(_click) {
            localStorage.clear();
            location.reload();
            priceAll = 0;
            localStorage.removeItem("gesamtPreis");
            localStorage.setItem("gesamtPreis", priceAll.toString());
            artikelZaehler = 0;
            localStorage.removeItem("artikelCount");
            localStorage.setItem("artikelCount", artikelZaehler.toString());
        }
        //Preis
        if (parseInt(localStorage.getItem("artikelCount")) == 0) {
            let emptyCartH = document.createElement("h3");
            emptyCartH.innerHTML = "Der Einkaufswagen ist leer";
            document.getElementById("Price-Delete")?.appendChild(emptyCartH);
        }
        else {
            let priceParagraph = document.createElement("h3");
            priceParagraph.setAttribute("id", "Preis-Cart");
            priceParagraph.innerHTML = "Preis: " + priceAll.toFixed(2) + "€";
            document.getElementById("Price-Delete")?.appendChild(priceParagraph);
            buttonDeleteAll.style.display = "inline-block";
        }
        for (let i = 1; i <= artikelZaehler; i++) {
            //Div erstellen
            let divElement = document.createElement("div");
            divElement.setAttribute("class", "Artikel");
            divElement.id = "Artikel" + i;
            document.getElementById("flex-cart")?.appendChild(divElement);
            //Name
            let nameElement = document.createElement("h3");
            nameElement.innerHTML = localStorage.getItem("name" + i);
            divElement.appendChild(nameElement);
            //Bild
            let imgElement = document.createElement("img");
            imgElement.setAttribute("src", localStorage.getItem("img" + i));
            imgElement.setAttribute("alt", localStorage.getItem("title" + i));
            divElement.appendChild(imgElement);
            //Beschreibung Text
            let descTextElement = document.createElement("h4");
            descTextElement.innerHTML = "Beschreibung:";
            divElement.appendChild(descTextElement);
            //Beschreibung
            let descElement = document.createElement("p");
            descElement.innerHTML = localStorage.getItem("descr" + i);
            divElement.appendChild(descElement);
            //Preis
            let priceElement = document.createElement("p");
            let p = "Preis: " + localStorage.getItem("price" + i) + "€";
            priceElement.innerHTML = p.italics();
            divElement.appendChild(priceElement);
            //Button
            let buttonElement = document.createElement("button");
            buttonElement.innerHTML = "Löschen";
            buttonElement.setAttribute("identifier", "" + i);
            buttonElement.addEventListener("click", handleDeleteArticle);
            divElement.appendChild(buttonElement);
        }
        //Funktion, um Artikel aus Einkaufswagen zu entfernen
        function handleDeleteArticle(_click) {
            //Identifizieren, um welchen Artikel es sich handelt
            let button = _click.currentTarget;
            let idButton = button.getAttribute("identifier");
            //Preis neu berechnen
            priceAll = priceAll - parseFloat(localStorage.getItem("price" + idButton));
            localStorage.removeItem("gesamtPreis");
            localStorage.setItem("gesamtPreis", priceAll.toString());
            //Artikel removen
            localStorage.removeItem("name" + idButton);
            localStorage.removeItem("img" + idButton);
            localStorage.removeItem("descr" + idButton);
            localStorage.removeItem("price" + idButton);
            let removeDiv = document.getElementById("Artikel" + idButton);
            removeDiv.remove();
            //Nachfolgende Artikel neu anordnen
            for (let i = parseInt(idButton); i <= artikelZaehler; i++) {
                localStorage.setItem("name" + i, localStorage.getItem("name" + (i + 1)));
                localStorage.setItem("img" + i, localStorage.getItem("img" + (i + 1)));
                localStorage.setItem("descr" + i, localStorage.getItem("descr" + (i + 1)));
                localStorage.setItem("price" + i, localStorage.getItem("price" + (i + 1)));
                localStorage.removeItem("name" + (i + 1));
                localStorage.removeItem("img" + (i + 1));
                localStorage.removeItem("descr" + (i + 1));
                localStorage.removeItem("price" + (i + 1));
            }
            //Artikel neu zählen
            artikelZaehler--;
            localStorage.removeItem("artikelCount");
            localStorage.setItem("artikelCount", artikelZaehler.toString());
            document.location.reload();
        }
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=script_cart.js.map