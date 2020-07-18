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
    //Artikel erzeugen
    getArticles("example.json");
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
    async function getArticles(_url) {
        let response = await fetch(_url);
        let articlesJson = await response.json();
        allArticles = await JSON.parse(JSON.stringify(articlesJson));
        for (let i = 0; i < allArticles.length; i++) {
            let divElement = document.createElement("div");
            divElement.setAttribute("id", "div" + i);
            let nameElement = document.createElement("h3");
            let imgElement = document.createElement("img");
            let priceElement = document.createElement("p");
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
                    divElement.setAttribute("class", "artikel");
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
            nameElement.innerHTML = allArticles[i].name;
            divElement.appendChild(nameElement);
            imgElement.src = allArticles[i].img;
            divElement.appendChild(imgElement);
            let p = `Preis: ${allArticles[i].price.toString()}€`;
            priceElement.innerHTML = p.italics();
            divElement.appendChild(priceElement);
        }
    }
})(Pruefungsaufgabe || (Pruefungsaufgabe = {}));
//# sourceMappingURL=clientscript.js.map