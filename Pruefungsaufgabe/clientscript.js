"use strict";
var Pruefungsaufgabe;
(function (Pruefungsaufgabe) {
    //Off-Canvas Menu
    let burgerDivMenu = document.getElementById("burgernav");
    let burgerDivOpen = document.getElementById("burgeropen");
    burgerDivOpen.addEventListener("click", handleClickBurgerOpen);
    let burgerDivClose = document.getElementById("burgerclose");
    burgerDivClose.addEventListener("click", handleClickBurgerClose);
    let mainDiv = document.getElementById("flex");
    //Off-Canvas Cart
    let cartDivMenu = document.getElementById("cart");
    let cartDivOpen = document.getElementById("cartopen");
    cartDivOpen.addEventListener("click", handleClickCartOpen);
    let cartDivClose = document.getElementById("cartclose");
    cartDivClose.addEventListener("click", handleClickCartClose);
    //Funktionen für Off-Canvas Menüs
    function handleClickBurgerOpen(_click) {
        if (screen.width <= 600) {
            burgerDivMenu.style.width = "100%";
            cartDivOpen.style.display = "none";
        }
        else {
            burgerDivMenu.style.width = "250px";
            mainDiv.style.marginLeft = "250px";
        }
    }
    function handleClickBurgerClose(_click) {
        burgerDivMenu.style.width = "0px";
        mainDiv.style.marginLeft = "0px";
        cartDivOpen.style.display = "block";
    }
    function handleClickCartOpen(_click) {
        if (screen.width <= 600) {
            cartDivMenu.style.width = "100%";
            burgerDivOpen.style.display = "none";
        }
        else {
            cartDivMenu.style.width = "550px";
            mainDiv.style.marginRight = "550px";
        }
    }
    function handleClickCartClose(_click) {
        cartDivMenu.style.width = "0px";
        mainDiv.style.marginRight = "0px";
        burgerDivOpen.style.display = "block";
    }
    let allArticles;
    //getArticles("example.json");
    receiveArticles();
    //Divs für einzelne Kategorien erzeugen
    let containers = document.createElement("div");
    let flavours = document.createElement("div");
    let toppings = document.createElement("div");
    let extras = document.createElement("div");
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
    let containerHeader = document.createElement("h2");
    containerHeader.innerHTML = "Behälter";
    let containerHeaderDiv = document.createElement("div");
    containerHeaderDiv.setAttribute("class", "cat-header");
    containerHeaderDiv.appendChild(containerHeader);
    let flavourHeader = document.createElement("h2");
    flavourHeader.innerHTML = "Eissorte";
    let flavourHeaderDiv = document.createElement("div");
    flavourHeaderDiv.setAttribute("class", "cat-header");
    flavourHeaderDiv.appendChild(flavourHeader);
    let toppingHeader = document.createElement("h2");
    toppingHeader.innerHTML = "Toppings";
    let toppingHeaderDiv = document.createElement("div");
    toppingHeaderDiv.setAttribute("class", "cat-header");
    toppingHeaderDiv.appendChild(toppingHeader);
    let extraHeader = document.createElement("h2");
    extraHeader.innerHTML = "Extras";
    let extraHeaderDiv = document.createElement("div");
    extraHeaderDiv.setAttribute("class", "cat-header");
    extraHeaderDiv.appendChild(extraHeader);
    //Kategorien ausblenden
    let hideContainersDiv = document.createElement("div");
    hideContainersDiv.setAttribute("class", "hide");
    hideContainersDiv.addEventListener("click", hideContainers);
    containerHeaderDiv.appendChild(hideContainersDiv);
    let hideFlavoursDiv = document.createElement("div");
    hideFlavoursDiv.setAttribute("class", "hide");
    hideFlavoursDiv.addEventListener("click", hideFlavours);
    flavourHeaderDiv.appendChild(hideFlavoursDiv);
    let hideToppingsDiv = document.createElement("div");
    hideToppingsDiv.setAttribute("class", "hide");
    hideToppingsDiv.addEventListener("click", hideToppings);
    toppingHeaderDiv.appendChild(hideToppingsDiv);
    let hideExtrasDiv = document.createElement("div");
    hideExtrasDiv.setAttribute("class", "hide");
    hideExtrasDiv.addEventListener("click", hideExtras);
    extraHeaderDiv.appendChild(hideExtrasDiv);
    if (screen.width <= 600) {
        hideContainersDiv.innerHTML = "<img src =\"Images/Design/Cross.png\">";
        hideFlavoursDiv.innerHTML = "<img src =\"Images/Design/Cross.png\">";
        hideToppingsDiv.innerHTML = "<img src =\"Images/Design/Cross.png\">";
        hideExtrasDiv.innerHTML = "<img src =\"Images/Design/Cross.png\">";
    }
    else {
        hideContainersDiv.innerHTML = "(Ausblenden)";
        hideFlavoursDiv.innerHTML = "(Ausblenden)";
        hideToppingsDiv.innerHTML = "(Ausblenden)";
        hideExtrasDiv.innerHTML = "(Ausblenden)";
    }
    //Kategorien einblenden
    let showAllButton = document.getElementById("showall");
    showAllButton.addEventListener("click", showAll);
    let showContainersLink = document.getElementById("showcontainers");
    let showFlavoursLink = document.getElementById("showflavours");
    let showToppingsLink = document.getElementById("showtoppings");
    let showExtrasLink = document.getElementById("showextras");
    showContainersLink.addEventListener("click", showContainers);
    showFlavoursLink.addEventListener("click", showFlavours);
    showToppingsLink.addEventListener("click", showToppings);
    showExtrasLink.addEventListener("click", showExtras);
    //Einkaufswagen
    let artikelCount = 0;
    let gesamtPreis = 0;
    let cartContentDiv = document.getElementById("cartcontent");
    let cartHeading = document.createElement("h2");
    cartHeading.innerHTML = "Warenkorb";
    cartContentDiv.appendChild(cartHeading);
    let cartContainerDiv = document.createElement("div");
    let cartFlavourDiv = document.createElement("div");
    let cartToppingDiv = document.createElement("div");
    let cartExtraDiv = document.createElement("div");
    cartContainerDiv.setAttribute("class", "cartcategorydiv");
    cartFlavourDiv.setAttribute("class", "cartcategorydiv");
    cartToppingDiv.setAttribute("class", "cartcategorydiv");
    cartExtraDiv.setAttribute("class", "cartcategorydiv");
    cartContentDiv.appendChild(cartContainerDiv);
    cartContentDiv.appendChild(cartFlavourDiv);
    cartContentDiv.appendChild(cartToppingDiv);
    cartContentDiv.appendChild(cartExtraDiv);
    let cartContainerDesc = document.createElement("h2");
    cartContainerDesc.innerHTML = "Ihre ausgewählten Behälter: ";
    cartContainerDiv.appendChild(cartContainerDesc);
    let cartFlavourDesc = document.createElement("h2");
    cartFlavourDesc.innerHTML = "Ihre ausgewählten Eissorten: ";
    cartFlavourDiv.appendChild(cartFlavourDesc);
    let cartToppingDesc = document.createElement("h2");
    cartToppingDesc.innerHTML = "Ihre ausgewählten Toppings: ";
    cartToppingDiv.appendChild(cartToppingDesc);
    let cartExtrasDesc = document.createElement("h2");
    cartExtrasDesc.innerHTML = "Ihre ausgewählten Extras: ";
    cartExtraDiv.appendChild(cartExtrasDesc);
    let cartFormDiv = document.getElementById("cartformdiv");
    let cartPriceParagraph = document.createElement("p");
    async function getArticles(_url) {
        let response = await fetch(_url);
        let articlesJson = await response.json();
        allArticles = await JSON.parse(JSON.stringify(articlesJson));
        //Artikel dynamisch erzeugen
        for (let i = 0; i < allArticles.length; i++) {
            let divElement = document.createElement("div");
            divElement.setAttribute("id", "div" + i);
            let nameElement = document.createElement("h3");
            nameElement.innerHTML = allArticles[i].name;
            let imgElement = document.createElement("img");
            imgElement.src = allArticles[i].img;
            let priceElement = document.createElement("p");
            let priceString = "Preis: " + allArticles[i].price.toFixed(2).toString().replace(".", ",") + "€";
            let buttonElement = document.createElement("button");
            let descInputElement = document.createElement("h4");
            descInputElement.innerHTML = "Anzahl an Kugeln:";
            let inputElement = document.createElement("input");
            inputElement.setAttribute("type", "number");
            inputElement.setAttribute("min", "0");
            inputElement.setAttribute("id", "numberinput");
            let breakElement = document.createElement("br");
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
            }
            else {
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
            function toCart(_click) {
                if (allArticles[i].category != "Flavours") {
                    artikelCount++;
                    gesamtPreis = gesamtPreis + allArticles[i].price;
                    cartPriceParagraph.innerHTML = "Gesamtpreis: " + gesamtPreis.toFixed(2).toString().replace(".", ",") + "€";
                    localStorage.setItem("name" + artikelCount, allArticles[i].name);
                    localStorage.setItem("img" + artikelCount, allArticles[i].img);
                    localStorage.setItem("price" + artikelCount, allArticles[i].price.toString());
                    localStorage.setItem("gesamtPreis", gesamtPreis.toFixed(2).toString());
                    localStorage.setItem("artikelCount", artikelCount.toString());
                    cartFormDiv.style.display = "block";
                    switch (allArticles[i].category) {
                        case "Containers":
                            let cartContainerContent = document.createElement("p");
                            cartContainerDiv.style.display = "block";
                            cartContainerContent.innerHTML = allArticles[i].name;
                            cartContainerDiv.appendChild(cartContainerContent);
                            break;
                        case "Toppings":
                            let cartToppingContent = document.createElement("p");
                            cartToppingDiv.style.display = "block";
                            cartToppingContent.innerHTML = allArticles[i].name;
                            cartToppingDiv.appendChild(cartToppingContent);
                            break;
                        case "Extras":
                            let cartExtraContent = document.createElement("p");
                            cartExtraDiv.style.display = "block";
                            cartExtraContent.innerHTML = allArticles[i].name;
                            cartExtraDiv.appendChild(cartExtraContent);
                    }
                    cartContentDiv.appendChild(cartPriceParagraph);
                }
                else {
                    if (parseInt(inputElement.value) > 0) {
                        for (let j = artikelCount; j <= (artikelCount + parseInt(inputElement.value)); j++) {
                            localStorage.setItem("name" + j, allArticles[i].name);
                            localStorage.setItem("img" + j, allArticles[i].img);
                            localStorage.setItem("price" + j, allArticles[i].price.toString());
                        }
                        artikelCount = artikelCount + parseInt(inputElement.value);
                        gesamtPreis = gesamtPreis + (allArticles[i].price * parseInt(inputElement.value));
                        cartPriceParagraph.innerHTML = "Gesamtpreis: " + gesamtPreis.toFixed(2).toString().replace(".", ",") + "€";
                        localStorage.setItem("gesamtPreis", gesamtPreis.toFixed(2).toString());
                        localStorage.setItem("artikelCount", artikelCount.toString());
                        cartFormDiv.style.display = "block";
                        for (let j = 1; j <= parseInt(inputElement.value); j++) {
                            let cartFlavourContent = document.createElement("p");
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
    function hideContainers(_click) {
        containers.style.display = "none";
    }
    function hideFlavours(_click) {
        flavours.style.display = "none";
    }
    function hideToppings(_click) {
        toppings.style.display = "none";
    }
    function hideExtras(_click) {
        extras.style.display = "none";
    }
    function showAll(_click) {
        containers.style.display = "flex";
        flavours.style.display = "flex";
        toppings.style.display = "flex";
        extras.style.display = "flex";
    }
    function showContainers(_click) {
        containers.style.display = "flex";
    }
    function showFlavours(_click) {
        flavours.style.display = "flex";
    }
    function showToppings(_click) {
        toppings.style.display = "flex";
    }
    function showExtras(_click) {
        extras.style.display = "flex";
    }
    //Server + Datenbank Verbindung
    //let formdata: FormData;
    async function receiveArticles() {
        let url = "https://gissose2020maxfla.herokuapp.com/";
        url += "/get";
        let response = await fetch(url);
        let responseText = await response.text();
        getArticles(responseText);
    }
})(Pruefungsaufgabe || (Pruefungsaufgabe = {}));
//# sourceMappingURL=clientscript.js.map