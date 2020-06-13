namespace Aufgabe07 {
    getArticles("json_data.json");

    async function getArticles(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let jsonArticles: JSON = await response.json();
        allArticles = await JSON.parse(JSON.stringify(jsonArticles));

        let priceAll: number = 0;
        priceAll = parseFloat(<string>localStorage.getItem("gesamtPreis"));
        let artikelZaehler: number = 0;
        artikelZaehler = parseInt(<string>localStorage.getItem("artikelCount"));

        //Alles Löschen Button
        let buttonDeleteAll: HTMLButtonElement = document.createElement("button");
        buttonDeleteAll.innerHTML = "Alles Löschen";
        buttonDeleteAll.setAttribute("id", "Delete-Button");
        document.getElementById("Price-Delete")?.appendChild(buttonDeleteAll);
        buttonDeleteAll.addEventListener("click", handleDeleteAll);

        function handleDeleteAll(_click: Event): void {
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
        if (parseInt(<string>localStorage.getItem("artikelCount")) == 0) {
            let emptyCartH: HTMLHeadingElement = document.createElement("h3");
            emptyCartH.innerHTML = "Der Einkaufswagen ist leer";
            document.getElementById("Price-Delete")?.appendChild(emptyCartH);
        }
        else {
            let priceParagraph: HTMLHeadingElement = document.createElement("h3");
            priceParagraph.setAttribute("id", "Preis-Cart");
            priceParagraph.innerHTML = "Preis: " + priceAll.toFixed(2) + "€";
            document.getElementById("Price-Delete")?.appendChild(priceParagraph);
            buttonDeleteAll.style.display = "inline-block";
        }


        for (let i: number = 1; i <= artikelZaehler; i++) {

            //Div erstellen
            let divElement: HTMLDivElement = document.createElement("div");
            divElement.setAttribute("class", "Artikel");
            divElement.id = "Artikel" + i;
            document.getElementById("flex-cart")?.appendChild(divElement);

            //Name
            let nameElement: HTMLHeadingElement = document.createElement("h3");
            nameElement.innerHTML = <string>localStorage.getItem("name" + i);
            divElement.appendChild(nameElement);

            //Bild
            let imgElement: HTMLImageElement = document.createElement("img");
            imgElement.setAttribute("src", <string>localStorage.getItem("img" + i));
            imgElement.setAttribute("alt", <string>localStorage.getItem("title" + i));
            divElement.appendChild(imgElement);

            //Beschreibung Text
            let descTextElement: HTMLHeadingElement = document.createElement("h4");
            descTextElement.innerHTML = "Beschreibung:";
            divElement.appendChild(descTextElement);

            //Beschreibung
            let descElement: HTMLParagraphElement = document.createElement("p");
            descElement.innerHTML = <string>localStorage.getItem("descr" + i);
            divElement.appendChild(descElement);

            //Preis
            let priceElement: HTMLParagraphElement = document.createElement("p");
            let p: String = "Preis: " + <string>localStorage.getItem("price" + i) + "€";
            priceElement.innerHTML = p.italics();
            divElement.appendChild(priceElement);


            //Button
            let buttonElement: HTMLButtonElement = document.createElement("button");
            buttonElement.innerHTML = "Löschen";
            buttonElement.setAttribute("identifier", "" + i);
            buttonElement.addEventListener("click", handleDeleteArticle);
            divElement.appendChild(buttonElement);

        }

        //Funktion, um Artikel aus Einkaufswagen zu entfernen
        function handleDeleteArticle(_click: Event): void {
            //Identifizieren, um welchen Artikel es sich handelt
            let button: HTMLElement = <HTMLElement>_click.currentTarget;
            let idButton: string = <string>button.getAttribute("identifier");
            //Preis neu berechnen
            priceAll = priceAll - parseFloat(<string>localStorage.getItem("price" + idButton));
            localStorage.removeItem("gesamtPreis");
            localStorage.setItem("gesamtPreis", priceAll.toString());
            //Artikel removen
            localStorage.removeItem("name" + idButton);
            localStorage.removeItem("img" + idButton);
            localStorage.removeItem("descr" + idButton);
            localStorage.removeItem("price" + idButton);
            let removeDiv: HTMLElement = <HTMLElement>document.getElementById("Artikel" + idButton);
            removeDiv.remove();
            //Nachfolgende Artikel neu anordnen
            for (let i: number = parseInt(idButton); i <= artikelZaehler; i++) {
                localStorage.setItem("name" + i, <string>localStorage.getItem("name" + (i + 1)));
                localStorage.setItem("img" + i, <string>localStorage.getItem("img" + (i + 1)));
                localStorage.setItem("descr" + i, <string>localStorage.getItem("descr" + (i + 1)));
                localStorage.setItem("price" + i, <string>localStorage.getItem("price" + (i + 1)));
                localStorage.removeItem("name" + (i + 1));
                localStorage.removeItem("img" + (i + 1));
                localStorage.removeItem("descr" + (i + 1));
                localStorage.removeItem("price" + (i + 1));
            }
            //Artikel neu zählen
            artikelZaehler--;
            localStorage.removeItem("artikelCount");
            localStorage.setItem("artikelCount", artikelZaehler.toString());
            
            location.reload();
        }

    }

}