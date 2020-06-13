"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    //Funktion, um Artikel aus JSON auszulesen + erzeugen
    getArticles("json_data.json");
    //Variablen für Einkaufswagen und Preis
    let artikelCount = 0;
    let gesamtPreis = 0;
    let wagenCounterDiv = document.createElement("div");
    document.getElementById("Cart")?.appendChild(wagenCounterDiv);
    wagenCounterDiv.setAttribute("id", "Zaehler");
    let zaehlerP = document.createElement("p");
    wagenCounterDiv.appendChild(zaehlerP);
    wagenCounterDiv.style.display = "none";
    //Kategorien für Artikel
    let moebel = document.createElement("div");
    moebel.setAttribute("class", "flex-div");
    document.getElementById("flex")?.appendChild(moebel);
    let bewohner = document.createElement("div");
    bewohner.setAttribute("class", "flex-div");
    document.getElementById("flex")?.appendChild(bewohner);
    //Artikel aus JSON einlesen und in Array sortieren
    async function getArticles(_url) {
        let response = await fetch(_url);
        let jsonArticles = await response.json();
        Aufgabe07.allArticles = await JSON.parse(JSON.stringify(jsonArticles));
        //Artikel erzeugen
        for (let i = 0; i < Aufgabe07.allArticles.length; i++) {
            //Überschrift Möbel
            let furnDiv = document.createElement("div");
            furnDiv.setAttribute("class", "Kat");
            furnDiv.setAttribute("id", "Kat1");
            if (i == 0) {
                moebel.appendChild(furnDiv);
                let furnHeader = document.createElement("h2");
                furnHeader.innerHTML = "Möbel";
                furnDiv.appendChild(furnHeader);
            }
            //Überschrift Bewohner
            let villDiv = document.createElement("div");
            villDiv.setAttribute("class", "Kat");
            villDiv.setAttribute("id", "Kat2");
            if (i == 6) {
                bewohner.appendChild(villDiv);
                let villHeader = document.createElement("h2");
                villHeader.innerHTML = "Bewohner";
                villDiv.appendChild(villHeader);
            }
            //Div erstellen
            let divElement = document.createElement("div");
            divElement.setAttribute("id", "div" + i);
            if (Aufgabe07.allArticles[i].category == "Moebel") {
                moebel.appendChild(divElement);
            }
            else if (Aufgabe07.allArticles[i].category == "Bewohner") {
                bewohner.appendChild(divElement);
            }
            //Name
            let nameElement = document.createElement("h3");
            nameElement.innerHTML = Aufgabe07.allArticles[i].name;
            divElement.appendChild(nameElement);
            //Bild
            let imgElement = document.createElement("img");
            imgElement.src = Aufgabe07.allArticles[i].img;
            divElement.appendChild(imgElement);
            //Beschreibung Text
            let descTextElement = document.createElement("h4");
            descTextElement.innerHTML = "Beschreibung:";
            divElement.appendChild(descTextElement);
            //Beschreibung
            let descElement = document.createElement("p");
            descElement.innerHTML = Aufgabe07.allArticles[i].descr;
            divElement.appendChild(descElement);
            //Preis
            let priceElement = document.createElement("p");
            let p = `Preis: ${Aufgabe07.allArticles[i].price.toString()}€`;
            priceElement.innerHTML = p.italics();
            divElement.appendChild(priceElement);
            //Button
            let buttonElement = document.createElement("button");
            buttonElement.innerHTML = "In den Einkaufswagen";
            divElement.appendChild(buttonElement);
            buttonElement.addEventListener("click", handleClick);
            //Artikel in Klassen sortieren
            if (Aufgabe07.allArticles[i].category == "Moebel") {
                divElement.setAttribute("class", "Moebel");
            }
            else if (Aufgabe07.allArticles[i].category == "Bewohner") {
                divElement.setAttribute("class", "Bewohner");
            }
            //Funktion für Einkaufswagen und Preis
            function handleClick(_click) {
                artikelCount++;
                if (artikelCount == 0) {
                    wagenCounterDiv.style.display = "none";
                }
                else {
                    wagenCounterDiv.style.display = "inline-block";
                }
                if (artikelCount < 10) {
                    zaehlerP.setAttribute("id", "ZaehlerText1");
                }
                else {
                    zaehlerP.setAttribute("id", "ZaehlerText2");
                }
                gesamtPreis = gesamtPreis + Aufgabe07.allArticles[i].price;
                console.log("Gesamter Preis: " + gesamtPreis.toFixed(2) + "€");
                zaehlerP.innerHTML = artikelCount.toString();
                //Local Storage
                localStorage.setItem("name" + artikelCount, Aufgabe07.allArticles[i].name);
                localStorage.setItem("img" + artikelCount, Aufgabe07.allArticles[i].img);
                localStorage.setItem("descr" + artikelCount, Aufgabe07.allArticles[i].descr);
                localStorage.setItem("price" + artikelCount, Aufgabe07.allArticles[i].price.toString());
                localStorage.setItem("gesamtPreis", gesamtPreis.toFixed(2).toString());
                localStorage.setItem("artikelCount", artikelCount.toString());
            }
            //Event Listener für die Navigationspunkte
            document.getElementById("Moebel")?.addEventListener("click", handleHideVill);
            document.getElementById("Bewohner")?.addEventListener("click", handleHideFurn);
            document.getElementById("Alle")?.addEventListener("click", handleShowAll);
            //Funktionen, um Artikel auszublenden/einzublenden
            function handleHideVill(_click) {
                villDiv.style.display = "none";
                for (let i = 6; i < 12; i++)
                    bewohner.style.display = "none";
                furnDiv.style.display = "block";
                for (let i = 0; i < 6; i++)
                    moebel.style.display = "flex";
            }
            function handleHideFurn(_click) {
                furnDiv.style.display = "none";
                for (let i = 0; i < 6; i++)
                    moebel.style.display = "none";
                villDiv.style.display = "block";
                for (let i = 6; i < 12; i++)
                    bewohner.style.display = "flex";
            }
            function handleShowAll(_click) {
                furnDiv.style.display = "block";
                for (let i = 0; i < 6; i++)
                    moebel.style.display = "flex";
                villDiv.style.display = "block";
                for (let i = 6; i < 12; i++)
                    bewohner.style.display = "flex";
            }
        }
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=script.js.map