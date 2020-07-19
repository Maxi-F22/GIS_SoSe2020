namespace Pruefungsaufgabe {
    let formdata: FormData;

    interface Artikel {
        _id: string;
        name: string;
        img: string;
        price: number;
        category: string;
    }

    let allArticles: Artikel[];
    getJson();
    
    
    //Off-Canvas Menu
    let burgerDivMenu: HTMLDivElement = <HTMLDivElement>document.getElementById("burgernav");

    let burgerDivOpen: HTMLDivElement = <HTMLDivElement>document.getElementById("burgeropen");
    burgerDivOpen.addEventListener("click", handleClickBurgerOpen);

    let burgerDivClose: HTMLDivElement = <HTMLDivElement>document.getElementById("burgerclose");
    burgerDivClose.addEventListener("click", handleClickBurgerClose);

    let mainDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("flex");

    //Off-Canvas Cart
    let cartDivMenu: HTMLDivElement = <HTMLDivElement>document.getElementById("cart");

    let cartDivOpen: HTMLDivElement = <HTMLDivElement>document.getElementById("cartopen");
    cartDivOpen.addEventListener("click", handleClickCartOpen);

    let cartDivClose: HTMLDivElement = <HTMLDivElement>document.getElementById("cartclose");
    cartDivClose.addEventListener("click", handleClickCartClose);

    //Funktionen für Off-Canvas Menüs
    function handleClickBurgerOpen(_click: Event): void {
        if (screen.width <= 600) {
            burgerDivMenu.style.width = "100%";
            cartDivOpen.style.display = "none";
        } else {
            burgerDivMenu.style.width = "250px";
            mainDiv.style.marginLeft = "250px";
        }
    }

    function handleClickBurgerClose(_click: Event): void {
        burgerDivMenu.style.width = "0px";
        mainDiv.style.marginLeft = "0px";
        cartDivOpen.style.display = "block";
    }

    function handleClickCartOpen(_click: Event): void {
        if (screen.width <= 600) {
            cartDivMenu.style.width = "100%";
            burgerDivOpen.style.display = "none";
        } else {
            cartDivMenu.style.width = "550px";
            mainDiv.style.marginRight = "550px";
        }
    }

    function handleClickCartClose(_click: Event): void {
        cartDivMenu.style.width = "0px";
        mainDiv.style.marginRight = "0px";
        burgerDivOpen.style.display = "block";
    }

    

    //Divs für einzelne Kategorien erzeugen
    let containers: HTMLDivElement = document.createElement("div");
    let flavours: HTMLDivElement = document.createElement("div");
    let toppings: HTMLDivElement = document.createElement("div");
    let extras: HTMLDivElement = document.createElement("div");

    containers.setAttribute("class", "category");
    flavours.setAttribute("class", "category");
    toppings.setAttribute("class", "category");
    extras.setAttribute("class", "category");
    containers.setAttribute("id", "category1");
    flavours.setAttribute("id", "category2");
    toppings.setAttribute("id", "category3");
    extras.setAttribute("id", "category4");

    document.getElementById("flex")?.appendChild(containers);
    document.getElementById("flex")?.appendChild(flavours);
    document.getElementById("flex")?.appendChild(toppings);
    document.getElementById("flex")?.appendChild(extras);

    //Überschriften für Kategorien
    let containerHeader: HTMLHeadingElement = document.createElement("h2");
    containerHeader.innerHTML = "Behälter";
    let containerHeaderDiv: HTMLDivElement = document.createElement("div");
    containerHeaderDiv.setAttribute("class", "cat-header");
    containerHeaderDiv.appendChild(containerHeader);
    let flavourHeader: HTMLHeadingElement = document.createElement("h2");
    flavourHeader.innerHTML = "Eissorte";
    let flavourHeaderDiv: HTMLDivElement = document.createElement("div");
    flavourHeaderDiv.setAttribute("class", "cat-header");
    flavourHeaderDiv.appendChild(flavourHeader);
    let toppingHeader: HTMLHeadingElement = document.createElement("h2");
    toppingHeader.innerHTML = "Toppings";
    let toppingHeaderDiv: HTMLDivElement = document.createElement("div");
    toppingHeaderDiv.setAttribute("class", "cat-header");
    toppingHeaderDiv.appendChild(toppingHeader);
    let extraHeader: HTMLHeadingElement = document.createElement("h2");
    extraHeader.innerHTML = "Extras";
    let extraHeaderDiv: HTMLDivElement = document.createElement("div");
    extraHeaderDiv.setAttribute("class", "cat-header");
    extraHeaderDiv.appendChild(extraHeader);

    //Kategorien ausblenden
    let hideContainersDiv: HTMLDivElement = document.createElement("div");
    hideContainersDiv.setAttribute("class", "hide");
    hideContainersDiv.addEventListener("click", hideContainers);
    containerHeaderDiv.appendChild(hideContainersDiv);
    let hideFlavoursDiv: HTMLDivElement = document.createElement("div");
    hideFlavoursDiv.setAttribute("class", "hide");
    hideFlavoursDiv.addEventListener("click", hideFlavours);
    flavourHeaderDiv.appendChild(hideFlavoursDiv);
    let hideToppingsDiv: HTMLDivElement = document.createElement("div");
    hideToppingsDiv.setAttribute("class", "hide");
    hideToppingsDiv.addEventListener("click", hideToppings);
    toppingHeaderDiv.appendChild(hideToppingsDiv);
    let hideExtrasDiv: HTMLDivElement = document.createElement("div");
    hideExtrasDiv.setAttribute("class", "hide");
    hideExtrasDiv.addEventListener("click", hideExtras);
    extraHeaderDiv.appendChild(hideExtrasDiv);

    if (screen.width <= 600) {
        hideContainersDiv.innerHTML = "<img src =\"Images/Design/Cross.png\">";
        hideFlavoursDiv.innerHTML = "<img src =\"Images/Design/Cross.png\">";
        hideToppingsDiv.innerHTML = "<img src =\"Images/Design/Cross.png\">";
        hideExtrasDiv.innerHTML = "<img src =\"Images/Design/Cross.png\">";
    } else {
        hideContainersDiv.innerHTML = "(Ausblenden)";
        hideFlavoursDiv.innerHTML = "(Ausblenden)";
        hideToppingsDiv.innerHTML = "(Ausblenden)";
        hideExtrasDiv.innerHTML = "(Ausblenden)";
    }

    //Kategorien einblenden
    let showAllButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showall");
    showAllButton.addEventListener("click", showAll);

    let showContainersLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById("showcontainers");
    let showFlavoursLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById("showflavours");
    let showToppingsLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById("showtoppings");
    let showExtrasLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById("showextras");

    showContainersLink.addEventListener("click", showContainers);
    showFlavoursLink.addEventListener("click", showFlavours);
    showToppingsLink.addEventListener("click", showToppings);
    showExtrasLink.addEventListener("click", showExtras);


    //Einkaufswagen
    let artikelCount: number = 0;
    let gesamtPreis: number = 0;
    let cartContentDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("cartcontent");
    let cartHeading: HTMLHeadingElement = document.createElement("h2");
    cartHeading.innerHTML = "Warenkorb";
    cartContentDiv.appendChild(cartHeading);
    let cartContainerDiv: HTMLDivElement = document.createElement("div");
    let cartFlavourDiv: HTMLDivElement = document.createElement("div");
    let cartToppingDiv: HTMLDivElement = document.createElement("div");
    let cartExtraDiv: HTMLDivElement = document.createElement("div");
    cartContainerDiv.setAttribute("class", "cartcategorydiv");
    cartFlavourDiv.setAttribute("class", "cartcategorydiv");
    cartToppingDiv.setAttribute("class", "cartcategorydiv");
    cartExtraDiv.setAttribute("class", "cartcategorydiv");
    cartContentDiv.appendChild(cartContainerDiv);
    cartContentDiv.appendChild(cartFlavourDiv);
    cartContentDiv.appendChild(cartToppingDiv);
    cartContentDiv.appendChild(cartExtraDiv);
    let cartContainerDesc: HTMLHeadingElement = document.createElement("h2");
    cartContainerDesc.innerHTML = "Ihre ausgewählten Behälter: ";
    cartContainerDiv.appendChild(cartContainerDesc);
    let cartFlavourDesc: HTMLHeadingElement = document.createElement("h2");
    cartFlavourDesc.innerHTML = "Ihre ausgewählten Eissorten: ";
    cartFlavourDiv.appendChild(cartFlavourDesc);
    let cartToppingDesc: HTMLHeadingElement = document.createElement("h2");
    cartToppingDesc.innerHTML = "Ihre ausgewählten Toppings: ";
    cartToppingDiv.appendChild(cartToppingDesc);
    let cartExtrasDesc: HTMLHeadingElement = document.createElement("h2");
    cartExtrasDesc.innerHTML = "Ihre ausgewählten Extras: ";
    cartExtraDiv.appendChild(cartExtrasDesc);
    let cartFormDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("cartformdiv");
    let cartPriceParagraph: HTMLParagraphElement = document.createElement("p");
    let buttonSend: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonsend");
    buttonSend.addEventListener("click", sendToDB);

    async function getJson(): Promise<void> {
        let url: string = "http://localhost:8100";
        url += "/get";
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        console.log(responseText);
        let responseJson: Artikel[] = JSON.parse(responseText);
        generateArticles(responseJson);
    }


    function generateArticles(_responseJson: Artikel[]): void {
     
        allArticles = _responseJson;
        console.log(allArticles.length);

        //Artikel dynamisch erzeugen
        for (let i: number = 0; i < allArticles.length; i++) {
            let divElement: HTMLDivElement = document.createElement("div");
            divElement.setAttribute("id", "div" + i);
            let nameElement: HTMLHeadingElement = document.createElement("h3");
            nameElement.innerHTML = allArticles[i].name;
            let imgElement: HTMLImageElement = document.createElement("img");
            imgElement.src = allArticles[i].img;
            let priceElement: HTMLParagraphElement = document.createElement("p");
            let priceString: String = "Preis: " + allArticles[i].price.toFixed(2).toString().replace(".", ",") + "€";
            let buttonElement: HTMLButtonElement = document.createElement("button");
            let descInputElement: HTMLHeadingElement = document.createElement("h4");
            descInputElement.innerHTML = "Anzahl an Kugeln:";
            let inputElement: HTMLInputElement = document.createElement("input");
            inputElement.setAttribute("type", "number");
            inputElement.setAttribute("min", "0");
            inputElement.setAttribute("id", "numberinput");
            let breakElement: HTMLElement = document.createElement("br");


            if (i == 0) {
                containers.appendChild(containerHeaderDiv);
            }

            switch (allArticles[i].category) {
                case "Containers":
                    containers.appendChild(divElement);
                    divElement.setAttribute("class", "artikel");
                    flavours.appendChild(flavourHeaderDiv);
                    break;
                case "Flavours":
                    flavours.appendChild(divElement);
                    divElement.setAttribute("class", "flavourartikel");
                    toppings.appendChild(toppingHeaderDiv);
                    break;
                case "Toppings":
                    toppings.appendChild(divElement);
                    divElement.setAttribute("class", "artikel");
                    extras.appendChild(extraHeaderDiv);
                    break;
                case "Extras":
                    extras.appendChild(divElement);
                    divElement.setAttribute("class", "artikel");
            }

            divElement.appendChild(nameElement);
            divElement.appendChild(imgElement);

            if (allArticles[i].category == "Containers") {
                priceElement.innerHTML = "Kostenlos*";
                divElement.appendChild(priceElement);
            } else {
                priceElement.innerHTML = priceString.italics();
                divElement.appendChild(priceElement);
            }

            if (allArticles[i].category == "Flavours") {
                divElement.appendChild(descInputElement);
                divElement.appendChild(inputElement);
                divElement.appendChild(breakElement);
            }

            buttonElement.innerHTML = "Auswählen";
            buttonElement.addEventListener("click", toCart);
            divElement.appendChild(buttonElement);


            function toCart(_click: Event): void {
                if (allArticles[i].category != "Flavours") {
                    artikelCount++;
                    gesamtPreis = gesamtPreis + allArticles[i].price;
                    cartPriceParagraph.innerHTML = "Gesamtpreis: " + gesamtPreis.toFixed(2).toString().replace(".", ",") + "€";
                    
                    cartFormDiv.style.display = "block";

                    switch (allArticles[i].category) {
                        case "Containers":
                            let cartContainerContent: HTMLParagraphElement = document.createElement("p");
                            cartContainerDiv.style.display = "block";
                            cartContainerContent.innerHTML = allArticles[i].name;
                            cartContainerDiv.appendChild(cartContainerContent);
                            break;
                        case "Toppings":
                            let cartToppingContent: HTMLParagraphElement = document.createElement("p");
                            cartToppingDiv.style.display = "block";
                            cartToppingContent.innerHTML = allArticles[i].name;
                            cartToppingDiv.appendChild(cartToppingContent);
                            break;
                        case "Extras":
                            let cartExtraContent: HTMLParagraphElement = document.createElement("p");
                            cartExtraDiv.style.display = "block";
                            cartExtraContent.innerHTML = allArticles[i].name;
                            cartExtraDiv.appendChild(cartExtraContent);
                    }
                    
                    allArticles[i].name = allArticles[i].name.replace(" ", "");
                    allArticles[i].name = allArticles[i].name.replace("ä", "ae");
                    allArticles[i].name = allArticles[i].name.replace("ö", "oe");
                    allArticles[i].name = allArticles[i].name.replace("ü", "ue");
                    localStorage.setItem("name" + artikelCount, allArticles[i].name);
                    localStorage.setItem("gesamtPreis", gesamtPreis.toFixed(2).toString());
                    localStorage.setItem("artikelCount", artikelCount.toString());

                    
                    cartContentDiv.appendChild(cartPriceParagraph);
                }
                else {
                    if (parseInt(inputElement.value) > 0) {
                        for (let j: number = artikelCount + 1; j <= (artikelCount + parseInt(inputElement.value)); j++) {
                            localStorage.setItem("name" + j, allArticles[i].name);
                        }

                        artikelCount = artikelCount + parseInt(inputElement.value);
                        gesamtPreis = gesamtPreis + (allArticles[i].price * parseInt(inputElement.value));
                        cartPriceParagraph.innerHTML = "Gesamtpreis: " + gesamtPreis.toFixed(2).toString().replace(".", ",") + "€";

                        localStorage.setItem("gesamtPreis", gesamtPreis.toFixed(2).toString());
                        localStorage.setItem("artikelCount", artikelCount.toString());

                        cartFormDiv.style.display = "block";

                        for (let j: number = 1; j <= parseInt(inputElement.value); j++) {
                            let cartFlavourContent: HTMLParagraphElement = document.createElement("p");
                            cartFlavourDiv.style.display = "block";
                            cartFlavourContent.innerHTML = allArticles[i].name;
                            cartFlavourDiv.appendChild(cartFlavourContent);
                        }

                        cartContentDiv.appendChild(cartPriceParagraph);
                        inputElement.value = "";
                    }
                }
            }
        }
    }

    //Funktionen für ausblenden/einblenden
    function hideContainers(_click: Event): void {
        containers.style.display = "none";
    }
    function hideFlavours(_click: Event): void {
        flavours.style.display = "none";
    }
    function hideToppings(_click: Event): void {
        toppings.style.display = "none";
    }
    function hideExtras(_click: Event): void {
        extras.style.display = "none";
    }

    function showAll(_click: Event): void {
        containers.style.display = "flex";
        flavours.style.display = "flex";
        toppings.style.display = "flex";
        extras.style.display = "flex";
    }

    function showContainers(_click: Event): void {
        containers.style.display = "flex";
    }
    function showFlavours(_click: Event): void {
        flavours.style.display = "flex";
    }
    function showToppings(_click: Event): void {
        toppings.style.display = "flex";
    }
    function showExtras(_click: Event): void {
        extras.style.display = "flex";
    }


    async function sendToDB(_click: Event): Promise<void> {
        formdata = new FormData(document.forms[0]);
        let url: string = "https://gissose2020maxfla.herokuapp.com";
        url += "/send";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formdata);
        url += "?" + query.toString();
        for (let i: number = 1; i <= artikelCount; i++) {
            url += "&artikel=" + localStorage.getItem("name" + i);
        }
        url += "&preis=" + localStorage.getItem("gesamtPreis");
        url += "&anzahl=" + localStorage.getItem("artikelCount");
        console.log(url);
        await fetch(url);
        localStorage.clear();
        let cartForm: HTMLFormElement = <HTMLFormElement>document.getElementById("cartform");
        cartForm.reset();
    }

}