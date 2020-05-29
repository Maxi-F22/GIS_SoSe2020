"use strict";
var Aufgabe05;
(function (Aufgabe05) {
    for (let i = 0; i < Aufgabe05.artikelMöbel.length; i++) {
        let divElement = document.createElement("div");
        divElement.id = "div" + i;
        divElement.setAttribute("class", "Produkt");
        document.getElementById("flex1")?.appendChild(divElement);
        let nameElement = document.createElement("h3");
        nameElement.innerHTML = Aufgabe05.artikelMöbel[i].name;
        divElement.appendChild(nameElement);
        let imgElement = document.createElement("img");
        imgElement.src = Aufgabe05.artikelMöbel[i].img;
        divElement.appendChild(imgElement);
        let descElement = document.createElement("p");
        descElement.innerHTML = Aufgabe05.artikelMöbel[i].descr;
        divElement.appendChild(descElement);
        let priceElement = document.createElement("p");
        let p = Aufgabe05.artikelMöbel[i].price;
        priceElement.innerHTML = p.italics();
        divElement.appendChild(priceElement);
        let button = document.createElement("button");
        button.innerHTML = "In den Einkaufswagen";
        divElement.appendChild(button);
    }
    for (let i = 0; i < Aufgabe05.artikelBewohner.length; i++) {
        let divElement = document.createElement("div");
        divElement.id = "div" + i;
        divElement.setAttribute("class", "Produkt");
        document.getElementById("flex2")?.appendChild(divElement);
        let nameElement = document.createElement("h3");
        nameElement.innerHTML = Aufgabe05.artikelBewohner[i].name;
        divElement.appendChild(nameElement);
        let imgElement = document.createElement("img");
        imgElement.src = Aufgabe05.artikelBewohner[i].img;
        divElement.appendChild(imgElement);
        let descElement = document.createElement("p");
        descElement.innerHTML = Aufgabe05.artikelBewohner[i].descr;
        divElement.appendChild(descElement);
        let priceElement = document.createElement("p");
        let p = Aufgabe05.artikelBewohner[i].price;
        priceElement.innerHTML = p.italics();
        divElement.appendChild(priceElement);
        let button = document.createElement("button");
        button.innerHTML = "In den Einkaufswagen";
        divElement.appendChild(button);
    }
})(Aufgabe05 || (Aufgabe05 = {}));
//# sourceMappingURL=script.js.map