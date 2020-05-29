namespace Aufgabe05 {
    for (let i: number = 0; i < artikelMöbel.length; i++) {
        let divElement: HTMLDivElement = document.createElement("div");
        divElement.id = "div" + i;
        divElement.setAttribute("class", "Produkt");
        document.getElementById("flex1")?.appendChild(divElement);

        let nameElement: HTMLHeadingElement = document.createElement("h3");
        nameElement.innerHTML = artikelMöbel[i].name;
        divElement.appendChild(nameElement);

        let imgElement: HTMLImageElement = document.createElement("img");
        imgElement.src = artikelMöbel[i].img;
        divElement.appendChild(imgElement);

        let descElement: HTMLParagraphElement = document.createElement("p");
        descElement.innerHTML = artikelMöbel[i].descr;
        divElement.appendChild(descElement);

        let priceElement: HTMLParagraphElement = document.createElement("p");
        let p: String = artikelMöbel[i].price;
        priceElement.innerHTML = p.italics();
        divElement.appendChild(priceElement);

        let button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = "In den Einkaufswagen";
        divElement.appendChild(button);
    }


    for (let i: number = 0; i < artikelBewohner.length; i++) {
        let divElement: HTMLDivElement = document.createElement("div");
        divElement.id = "div" + i;
        divElement.setAttribute("class", "Produkt");
        document.getElementById("flex2")?.appendChild(divElement);

        let nameElement: HTMLHeadingElement = document.createElement("h3");
        nameElement.innerHTML = artikelBewohner[i].name;
        divElement.appendChild(nameElement);

        let imgElement: HTMLImageElement = document.createElement("img");
        imgElement.src = artikelBewohner[i].img;
        divElement.appendChild(imgElement);

        let descElement: HTMLParagraphElement = document.createElement("p");
        descElement.innerHTML = artikelBewohner[i].descr;
        divElement.appendChild(descElement);

        let priceElement: HTMLParagraphElement = document.createElement("p");
        let p: String = artikelBewohner[i].price;
        priceElement.innerHTML = p.italics();
        divElement.appendChild(priceElement);

        let button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = "In den Einkaufswagen";
        divElement.appendChild(button);
    }
}