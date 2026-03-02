"use strict";
var Pruefungsaufgabe;
(function (Pruefungsaufgabe) {
    const CART_KEY = "eisdealer_cart_v1";
    const ORDERS_KEY = "eisdealer_orders_v1";
    const burgerDivMenu = document.getElementById("burgernav");
    const burgerDivOpen = document.getElementById("burgeropen");
    const burgerDivClose = document.getElementById("burgerclose");
    const mainDiv = document.getElementById("flex");
    const cartDivMenu = document.getElementById("cart");
    const cartDivOpen = document.getElementById("cartopen");
    const cartDivClose = document.getElementById("cartclose");
    const showAllButton = document.getElementById("showall");
    const showContainersLink = document.getElementById("showcontainers");
    const showFlavoursLink = document.getElementById("showflavours");
    const showToppingsLink = document.getElementById("showtoppings");
    const showExtrasLink = document.getElementById("showextras");
    const cartContentDiv = document.getElementById("cartcontent");
    const cartFormDiv = document.getElementById("cartformdiv");
    const cartForm = document.getElementById("cartform");
    const buttonSend = document.getElementById("buttonsend");
    const cartHeading = document.createElement("h2");
    cartHeading.innerHTML = "Warenkorb";
    cartContentDiv.appendChild(cartHeading);
    const cartContainerDiv = document.createElement("div");
    const cartFlavourDiv = document.createElement("div");
    const cartToppingDiv = document.createElement("div");
    const cartExtraDiv = document.createElement("div");
    cartContainerDiv.setAttribute("class", "cartcategorydiv");
    cartFlavourDiv.setAttribute("class", "cartcategorydiv");
    cartToppingDiv.setAttribute("class", "cartcategorydiv");
    cartExtraDiv.setAttribute("class", "cartcategorydiv");
    const cartContainerDesc = document.createElement("h2");
    cartContainerDesc.innerHTML = "Ihre ausgewählten Behälter:";
    cartContainerDiv.appendChild(cartContainerDesc);
    const cartFlavourDesc = document.createElement("h2");
    cartFlavourDesc.innerHTML = "Ihre ausgewählten Eissorten:";
    cartFlavourDiv.appendChild(cartFlavourDesc);
    const cartToppingDesc = document.createElement("h2");
    cartToppingDesc.innerHTML = "Ihre ausgewählten Toppings:";
    cartToppingDiv.appendChild(cartToppingDesc);
    const cartExtrasDesc = document.createElement("h2");
    cartExtrasDesc.innerHTML = "Ihre ausgewählten Extras:";
    cartExtraDiv.appendChild(cartExtrasDesc);
    const cartPriceParagraph = document.createElement("p");
    const cartStartOverButton = document.createElement("button");
    cartStartOverButton.setAttribute("id", "cartstartoverbutton");
    cartStartOverButton.innerHTML = "Neu anfangen";
    cartContentDiv.appendChild(cartContainerDiv);
    cartContentDiv.appendChild(cartFlavourDiv);
    cartContentDiv.appendChild(cartToppingDiv);
    cartContentDiv.appendChild(cartExtraDiv);
    const containers = createCategory("category1", "Behälter");
    const flavours = createCategory("category2", "Eissorte");
    const toppings = createCategory("category3", "Toppings");
    const extras = createCategory("category4", "Extras");
    const cartState = loadCart();
    burgerDivOpen.addEventListener("click", handleClickBurgerOpen);
    burgerDivClose.addEventListener("click", handleClickBurgerClose);
    cartDivOpen.addEventListener("click", handleClickCartOpen);
    cartDivClose.addEventListener("click", handleClickCartClose);
    showAllButton.addEventListener("click", showAll);
    showContainersLink.addEventListener("click", showContainers);
    showFlavoursLink.addEventListener("click", showFlavours);
    showToppingsLink.addEventListener("click", showToppings);
    showExtrasLink.addEventListener("click", showExtras);
    cartStartOverButton.addEventListener("click", deleteCart);
    buttonSend.addEventListener("click", sendOrder);
    loadProducts();
    renderCart();
    async function loadProducts() {
        const response = await fetch("./products.json");
        const articles = await response.json();
        renderArticles(articles);
    }
    function createCategory(_id, _title) {
        const category = document.createElement("div");
        category.setAttribute("class", "category");
        category.setAttribute("id", _id);
        const headerDiv = document.createElement("div");
        headerDiv.setAttribute("class", "cat-header");
        const header = document.createElement("h2");
        header.innerText = _title;
        const hideButton = document.createElement("div");
        hideButton.setAttribute("class", "hide");
        hideButton.innerText = window.innerWidth <= 600 ? "X" : "(Ausblenden)";
        hideButton.addEventListener("click", () => {
            category.style.display = "none";
        });
        headerDiv.appendChild(header);
        headerDiv.appendChild(hideButton);
        category.appendChild(headerDiv);
        mainDiv.appendChild(category);
        return category;
    }
    function renderArticles(_articles) {
        for (const article of _articles) {
            const card = document.createElement("div");
            card.setAttribute("class", article.category === "Flavours" ? "flavourartikel" : "artikel");
            const nameElement = document.createElement("h3");
            nameElement.innerText = article.name;
            const imageElement = document.createElement("img");
            imageElement.src = article.img;
            imageElement.alt = article.name;
            const priceElement = document.createElement("p");
            if (article.category === "Containers") {
                priceElement.innerText = "Kostenlos*";
            }
            else {
                priceElement.innerHTML = ("Preis: " + article.price.toFixed(2).replace(".", ",") + "€").italics();
            }
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = "0";
            quantityInput.value = "1";
            quantityInput.id = "numberinput";
            const scoopLabel = document.createElement("h4");
            scoopLabel.innerText = "Anzahl an Kugeln:";
            const buttonElement = document.createElement("button");
            buttonElement.innerText = "Auswählen";
            buttonElement.addEventListener("click", () => {
                let quantity = 1;
                if (article.category === "Flavours") {
                    quantity = parseInt(quantityInput.value, 10);
                    if (!Number.isFinite(quantity) || quantity <= 0) {
                        return;
                    }
                }
                addToCart(article, quantity);
                if (article.category === "Flavours") {
                    quantityInput.value = "1";
                }
            });
            card.appendChild(nameElement);
            card.appendChild(imageElement);
            card.appendChild(priceElement);
            if (article.category === "Flavours") {
                card.appendChild(scoopLabel);
                card.appendChild(quantityInput);
                card.appendChild(document.createElement("br"));
            }
            card.appendChild(buttonElement);
            switch (article.category) {
                case "Containers":
                    containers.appendChild(card);
                    break;
                case "Flavours":
                    flavours.appendChild(card);
                    break;
                case "Toppings":
                    toppings.appendChild(card);
                    break;
                case "Extras":
                    extras.appendChild(card);
                    break;
            }
        }
    }
    function addToCart(_article, _quantity) {
        const existingItem = cartState.items.find((item) => item.articleId === _article.id);
        if (existingItem) {
            existingItem.quantity += _quantity;
        }
        else {
            cartState.items.push({
                articleId: _article.id,
                name: _article.name,
                category: _article.category,
                unitPrice: _article.price,
                quantity: _quantity
            });
        }
        saveCart();
        renderCart();
        cartFormDiv.style.display = "block";
    }
    function renderCart() {
        clearCategory(cartContainerDiv);
        clearCategory(cartFlavourDiv);
        clearCategory(cartToppingDiv);
        clearCategory(cartExtraDiv);
        for (const item of cartState.items) {
            const itemLine = document.createElement("p");
            itemLine.innerText = item.quantity > 1 ? item.name + " x" + item.quantity : item.name;
            switch (item.category) {
                case "Containers":
                    cartContainerDiv.style.display = "block";
                    cartContainerDiv.appendChild(itemLine);
                    break;
                case "Flavours":
                    cartFlavourDiv.style.display = "block";
                    cartFlavourDiv.appendChild(itemLine);
                    break;
                case "Toppings":
                    cartToppingDiv.style.display = "block";
                    cartToppingDiv.appendChild(itemLine);
                    break;
                case "Extras":
                    cartExtraDiv.style.display = "block";
                    cartExtraDiv.appendChild(itemLine);
                    break;
            }
        }
        if (!cartState.items.some((item) => item.category === "Containers")) {
            cartContainerDiv.style.display = "none";
        }
        if (!cartState.items.some((item) => item.category === "Flavours")) {
            cartFlavourDiv.style.display = "none";
        }
        if (!cartState.items.some((item) => item.category === "Toppings")) {
            cartToppingDiv.style.display = "none";
        }
        if (!cartState.items.some((item) => item.category === "Extras")) {
            cartExtraDiv.style.display = "none";
        }
        const totalPrice = cartState.items.reduce((sum, item) => {
            return sum + item.unitPrice * item.quantity;
        }, 0);
        const articleCount = cartState.items.reduce((sum, item) => {
            return sum + item.quantity;
        }, 0);
        if (articleCount > 0) {
            cartPriceParagraph.innerText = "Gesamtpreis: " + totalPrice.toFixed(2).replace(".", ",") + "EUR";
            if (!cartContentDiv.contains(cartPriceParagraph)) {
                cartContentDiv.appendChild(cartPriceParagraph);
            }
            if (!cartContentDiv.contains(cartStartOverButton)) {
                cartContentDiv.appendChild(cartStartOverButton);
            }
            cartFormDiv.style.display = "block";
        }
        else {
            if (cartContentDiv.contains(cartPriceParagraph)) {
                cartContentDiv.removeChild(cartPriceParagraph);
            }
            if (cartContentDiv.contains(cartStartOverButton)) {
                cartContentDiv.removeChild(cartStartOverButton);
            }
            cartFormDiv.style.display = "none";
        }
    }
    function clearCategory(_element) {
        while (_element.childNodes.length > 1) {
            _element.removeChild(_element.lastChild);
        }
    }
    function loadCart() {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) {
            return { items: [] };
        }
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.items)) {
                return parsed;
            }
            return { items: [] };
        }
        catch (_error) {
            return { items: [] };
        }
    }
    function saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(cartState));
    }
    function deleteCart() {
        cartState.items = [];
        saveCart();
        cartForm.reset();
        renderCart();
    }
    function sendOrder() {
        if (cartState.items.length === 0) {
            alert("Der Warenkorb ist leer.");
            return;
        }
        const formData = new FormData(cartForm);
        const vorname = String(formData.get("vorname") || "").trim();
        const nachname = String(formData.get("nachname") || "").trim();
        const strasse = String(formData.get("strasse") || "").trim();
        const stadt = String(formData.get("stadt") || "").trim();
        if (!vorname || !nachname || !strasse || !stadt) {
            alert("Bitte alle Felder im Formular ausfüllen.");
            return;
        }
        const totalPrice = cartState.items.reduce((sum, item) => {
            return sum + item.unitPrice * item.quantity;
        }, 0);
        const articleCount = cartState.items.reduce((sum, item) => {
            return sum + item.quantity;
        }, 0);
        const articleNames = [];
        for (const item of cartState.items) {
            for (let i = 0; i < item.quantity; i++) {
                articleNames.push(item.name);
            }
        }
        const newOrder = {
            id: "order_" + Date.now(),
            createdAt: new Date().toISOString(),
            vorname: vorname,
            nachname: nachname,
            strasse: strasse,
            stadt: stadt,
            artikel: articleNames,
            preis: totalPrice.toFixed(2),
            anzahl: String(articleCount)
        };
        const orders = loadOrders();
        orders.push(newOrder);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        deleteCart();
        alert("Bestellung lokal gespeichert. Du kannst sie im Admin-Bereich sehen.");
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
    function handleClickBurgerOpen() {
        if (window.innerWidth <= 600) {
            burgerDivMenu.style.width = "100%";
            cartDivOpen.style.display = "none";
        }
        else {
            burgerDivMenu.style.width = "250px";
            mainDiv.style.marginLeft = "250px";
        }
    }
    function handleClickBurgerClose() {
        burgerDivMenu.style.width = "0px";
        mainDiv.style.marginLeft = "0px";
        cartDivOpen.style.display = "block";
    }
    function handleClickCartOpen() {
        if (window.innerWidth <= 600) {
            cartDivMenu.style.width = "100%";
            burgerDivOpen.style.display = "none";
        }
        else {
            cartDivMenu.style.width = "550px";
            mainDiv.style.marginRight = "550px";
        }
    }
    function handleClickCartClose() {
        cartDivMenu.style.width = "0px";
        mainDiv.style.marginRight = "0px";
        burgerDivOpen.style.display = "block";
    }
    function showAll() {
        containers.style.display = "flex";
        flavours.style.display = "flex";
        toppings.style.display = "flex";
        extras.style.display = "flex";
    }
    function showContainers() {
        containers.style.display = "flex";
    }
    function showFlavours() {
        flavours.style.display = "flex";
    }
    function showToppings() {
        toppings.style.display = "flex";
    }
    function showExtras() {
        extras.style.display = "flex";
    }
})(Pruefungsaufgabe || (Pruefungsaufgabe = {}));
//# sourceMappingURL=clientscript.js.map