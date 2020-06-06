namespace Aufgabe06 {

    //Variablen für Einkaufswagen und Preis
    let artikelCount: number = 0;
    let gesamtPreis: number = 0;
    let wagenCounterDiv: HTMLDivElement = document.createElement("div");
    document.getElementById("Cart")?.appendChild(wagenCounterDiv);
    wagenCounterDiv.setAttribute("id", "Zaehler");
    let zaehlerP: HTMLParagraphElement = document.createElement("p");
    wagenCounterDiv.appendChild(zaehlerP);
    wagenCounterDiv.style.display = "none";

    //Kategorien für Artikel
    let moebel: HTMLDivElement = document.createElement("div");
    moebel.setAttribute("class", "flex-div");
    document.getElementById("flex")?.appendChild(moebel);
    let bewohner: HTMLDivElement = document.createElement("div");
    bewohner.setAttribute("class", "flex-div");
    document.getElementById("flex")?.appendChild(bewohner);

    for (let i: number = 0; i < allArticles.length; i++) {

        //Überschrift Möbel
        let furnDiv: HTMLDivElement = document.createElement("div");
        furnDiv.setAttribute("class", "Kat");
        furnDiv.setAttribute("id", "Kat1");
        if (i == 0) {
            moebel.appendChild(furnDiv);
            let furnHeader: HTMLHeadingElement = document.createElement("h2");
            furnHeader.innerHTML = "Möbel";
            furnDiv.appendChild(furnHeader);
        }

        //Überschrift Bewohner
        let villDiv: HTMLDivElement = document.createElement("div");
        villDiv.setAttribute("class", "Kat");
        villDiv.setAttribute("id", "Kat2");
        if (i == 6) {
            bewohner.appendChild(villDiv);
            let villHeader: HTMLHeadingElement = document.createElement("h2");
            villHeader.innerHTML = "Bewohner";
            villDiv.appendChild(villHeader);
        }

        //Div erstellen
        let divElement: HTMLDivElement = document.createElement("div");
        divElement.setAttribute("id", "div" + i);
        if (i < 6) {
            moebel.appendChild(divElement);
        }
        if (i >= 6) {
            bewohner.appendChild(divElement);
        }

        //Name
        let nameElement: HTMLHeadingElement = document.createElement("h3");
        nameElement.innerHTML = allArticles[i].name;
        divElement.appendChild(nameElement);

        //Bild
        let imgElement: HTMLImageElement = document.createElement("img");
        imgElement.src = allArticles[i].img;
        divElement.appendChild(imgElement);

        //Beschreibung Text
        let descTextElement: HTMLHeadingElement = document.createElement("h4");
        descTextElement.innerHTML = "Beschreibung:";
        divElement.appendChild(descTextElement);

        //Beschreibung
        let descElement: HTMLParagraphElement = document.createElement("p");
        descElement.innerHTML = allArticles[i].descr;
        divElement.appendChild(descElement);

        //Preis Möbel
        if (i <= 5) {
            let priceElement: HTMLParagraphElement = document.createElement("p");
            let p: String = `Preis: ${allArticles[i].price.toString()}€`;
            priceElement.innerHTML = p.italics();
            divElement.appendChild(priceElement);
        }

        //Preis Bewohner
        else if (i > 5) {
            let priceElement: HTMLParagraphElement = document.createElement("p");
            //Euro statt NMT, damit Preisberechnung Sinn macht
            let p: String = `Preis: ${allArticles[i].price.toString()}€`;
            priceElement.innerHTML = p.italics();
            divElement.appendChild(priceElement);
        }

        //Button
        let buttonElement: HTMLButtonElement = document.createElement("button");
        buttonElement.innerHTML = "In den Einkaufswagen";
        divElement.appendChild(buttonElement);
        buttonElement.addEventListener("click", handleClick);


        //Artikel in Klassen sortieren
        if (i <= 5) {
            divElement.setAttribute("class", "Moebel");
        }
        else if (i > 5) {
            divElement.setAttribute("class", "Bewohner");
        }

        //Funktion für Einkaufswagen und Preis
        function handleClick(_click: Event): void {
            artikelCount++;
            if (artikelCount == 0) {
                wagenCounterDiv.style.display = "none";
            } else { wagenCounterDiv.style.display = "inline-block"; }
            if (artikelCount < 10) {
                zaehlerP.setAttribute("id", "ZaehlerText1");
            } else { zaehlerP.setAttribute("id", "ZaehlerText2"); }
            gesamtPreis = gesamtPreis + allArticles[i].price;
            console.log("Gesamter Preis: " + gesamtPreis.toFixed(2) + "€");
            zaehlerP.innerHTML = artikelCount.toString();
        }



        //Event Listener für die Navigationspunkte
        document.getElementById("Moebel")?.addEventListener("click", handleHideVill);
        document.getElementById("Bewohner")?.addEventListener("click", handleHideFurn);
        document.getElementById("Alle")?.addEventListener("click", handleShowAll);


        //Funktionen, um Artikel auszublenden/einzublenden
        function handleHideVill(_click: Event): void {
            villDiv.style.display = "none";
            for (let i: number = 6; i < 12; i++)
                bewohner.style.display = "none";
            furnDiv.style.display = "block";
            for (let i: number = 0; i < 6; i++)
                moebel.style.display = "flex";
        }

        function handleHideFurn(_click: Event): void {
            furnDiv.style.display = "none";
            for (let i: number = 0; i < 6; i++)
                moebel.style.display = "none";
            villDiv.style.display = "block";
            for (let i: number = 6; i < 12; i++)
                bewohner.style.display = "flex";
        }

        function handleShowAll(_click: Event): void {
            furnDiv.style.display = "block";
            for (let i: number = 0; i < 6; i++)
                moebel.style.display = "flex";
            villDiv.style.display = "block";
            for (let i: number = 6; i < 12; i++)
                bewohner.style.display = "flex";
        }

    }



}