namespace Pruefungsaufgabe {
    interface Article {
        id: string;
        name: string;
        img: string;
        price: number;
        category: "Containers" | "Flavours" | "Toppings" | "Extras";
    }

    interface CartItem {
        articleId: string;
        name: string;
        category: Article["category"];
        unitPrice: number;
        quantity: number;
    }

    interface CartState {
        items: CartItem[];
    }

    interface Order {
        id: string;
        createdAt: string;
        vorname: string;
        nachname: string;
        strasse: string;
        stadt: string;
        artikel: string[];
        preis: string;
        anzahl: string;
    }

    const CART_KEY: string = "eisdealer_cart_v1";
    const ORDERS_KEY: string = "eisdealer_orders_v1";

    const burgerDivMenu: HTMLDivElement = document.getElementById("burgernav") as HTMLDivElement;
    const burgerDivOpen: HTMLDivElement = document.getElementById("burgeropen") as HTMLDivElement;
    const burgerDivClose: HTMLDivElement = document.getElementById("burgerclose") as HTMLDivElement;
    const mainDiv: HTMLDivElement = document.getElementById("flex") as HTMLDivElement;

    const cartDivMenu: HTMLDivElement = document.getElementById("cart") as HTMLDivElement;
    const cartDivOpen: HTMLDivElement = document.getElementById("cartopen") as HTMLDivElement;
    const cartDivClose: HTMLDivElement = document.getElementById("cartclose") as HTMLDivElement;

    const showAllButton: HTMLButtonElement = document.getElementById("showall") as HTMLButtonElement;
    const showContainersLink: HTMLLinkElement = document.getElementById("showcontainers") as HTMLLinkElement;
    const showFlavoursLink: HTMLLinkElement = document.getElementById("showflavours") as HTMLLinkElement;
    const showToppingsLink: HTMLLinkElement = document.getElementById("showtoppings") as HTMLLinkElement;
    const showExtrasLink: HTMLLinkElement = document.getElementById("showextras") as HTMLLinkElement;

    const cartContentDiv: HTMLDivElement = document.getElementById("cartcontent") as HTMLDivElement;
    const cartFormDiv: HTMLDivElement = document.getElementById("cartformdiv") as HTMLDivElement;
    const cartForm: HTMLFormElement = document.getElementById("cartform") as HTMLFormElement;
    const buttonSend: HTMLButtonElement = document.getElementById("buttonsend") as HTMLButtonElement;

    const cartHeading: HTMLHeadingElement = document.createElement("h2");
    cartHeading.innerHTML = "Warenkorb";
    cartContentDiv.appendChild(cartHeading);

    const cartContainerDiv: HTMLDivElement = document.createElement("div");
    const cartFlavourDiv: HTMLDivElement = document.createElement("div");
    const cartToppingDiv: HTMLDivElement = document.createElement("div");
    const cartExtraDiv: HTMLDivElement = document.createElement("div");

    cartContainerDiv.setAttribute("class", "cartcategorydiv");
    cartFlavourDiv.setAttribute("class", "cartcategorydiv");
    cartToppingDiv.setAttribute("class", "cartcategorydiv");
    cartExtraDiv.setAttribute("class", "cartcategorydiv");

    const cartContainerDesc: HTMLHeadingElement = document.createElement("h2");
    cartContainerDesc.innerHTML = "Ihre ausgewählten Behälter:";
    cartContainerDiv.appendChild(cartContainerDesc);

    const cartFlavourDesc: HTMLHeadingElement = document.createElement("h2");
    cartFlavourDesc.innerHTML = "Ihre ausgewählten Eissorten:";
    cartFlavourDiv.appendChild(cartFlavourDesc);

    const cartToppingDesc: HTMLHeadingElement = document.createElement("h2");
    cartToppingDesc.innerHTML = "Ihre ausgewählten Toppings:";
    cartToppingDiv.appendChild(cartToppingDesc);

    const cartExtrasDesc: HTMLHeadingElement = document.createElement("h2");
    cartExtrasDesc.innerHTML = "Ihre ausgewählten Extras:";
    cartExtraDiv.appendChild(cartExtrasDesc);

    const cartPriceParagraph: HTMLParagraphElement = document.createElement("p");
    const cartStartOverButton: HTMLButtonElement = document.createElement("button");
    cartStartOverButton.setAttribute("id", "cartstartoverbutton");
    cartStartOverButton.innerHTML = "Neu anfangen";

    cartContentDiv.appendChild(cartContainerDiv);
    cartContentDiv.appendChild(cartFlavourDiv);
    cartContentDiv.appendChild(cartToppingDiv);
    cartContentDiv.appendChild(cartExtraDiv);

    const containers: HTMLDivElement = createCategory("category1", "Behälter");
    const flavours: HTMLDivElement = createCategory("category2", "Eissorte");
    const toppings: HTMLDivElement = createCategory("category3", "Toppings");
    const extras: HTMLDivElement = createCategory("category4", "Extras");

    const cartState: CartState = loadCart();

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

    async function loadProducts(): Promise<void> {
        const response: Response = await fetch("./products.json");
        const articles: Article[] = await response.json();
        renderArticles(articles);
    }

    function createCategory(_id: string, _title: string): HTMLDivElement {
        const category: HTMLDivElement = document.createElement("div");
        category.setAttribute("class", "category");
        category.setAttribute("id", _id);

        const headerDiv: HTMLDivElement = document.createElement("div");
        headerDiv.setAttribute("class", "cat-header");

        const header: HTMLHeadingElement = document.createElement("h2");
        header.innerText = _title;

        const hideButton: HTMLDivElement = document.createElement("div");
        hideButton.setAttribute("class", "hide");
        hideButton.innerText = window.innerWidth <= 600 ? "X" : "(Ausblenden)";
        hideButton.addEventListener("click", (): void => {
            category.style.display = "none";
        });

        headerDiv.appendChild(header);
        headerDiv.appendChild(hideButton);
        category.appendChild(headerDiv);

        mainDiv.appendChild(category);
        return category;
    }

    function renderArticles(_articles: Article[]): void {
        for (const article of _articles) {
            const card: HTMLDivElement = document.createElement("div");
            card.setAttribute("class", article.category === "Flavours" ? "flavourartikel" : "artikel");

            const nameElement: HTMLHeadingElement = document.createElement("h3");
            nameElement.innerText = article.name;

            const imageElement: HTMLImageElement = document.createElement("img");
            imageElement.src = article.img;
            imageElement.alt = article.name;

            const priceElement: HTMLParagraphElement = document.createElement("p");
            if (article.category === "Containers") {
                priceElement.innerText = "Kostenlos*";
            } else {
                priceElement.innerHTML = ("Preis: " + article.price.toFixed(2).replace(".", ",") + "€").italics();
            }

            const quantityInput: HTMLInputElement = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = "0";
            quantityInput.value = "1";
            quantityInput.id = "numberinput";

            const scoopLabel: HTMLHeadingElement = document.createElement("h4");
            scoopLabel.innerText = "Anzahl an Kugeln:";

            const buttonElement: HTMLButtonElement = document.createElement("button");
            buttonElement.innerText = "Auswählen";
            buttonElement.addEventListener("click", (): void => {
                let quantity: number = 1;

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

    function addToCart(_article: Article, _quantity: number): void {
        const existingItem: CartItem | undefined = cartState.items.find((item: CartItem): boolean => item.articleId === _article.id);

        if (existingItem) {
            existingItem.quantity += _quantity;
        } else {
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

    function renderCart(): void {
        clearCategory(cartContainerDiv);
        clearCategory(cartFlavourDiv);
        clearCategory(cartToppingDiv);
        clearCategory(cartExtraDiv);

        for (const item of cartState.items) {
            const itemLine: HTMLParagraphElement = document.createElement("p");
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

        if (!cartState.items.some((item: CartItem): boolean => item.category === "Containers")) {
            cartContainerDiv.style.display = "none";
        }
        if (!cartState.items.some((item: CartItem): boolean => item.category === "Flavours")) {
            cartFlavourDiv.style.display = "none";
        }
        if (!cartState.items.some((item: CartItem): boolean => item.category === "Toppings")) {
            cartToppingDiv.style.display = "none";
        }
        if (!cartState.items.some((item: CartItem): boolean => item.category === "Extras")) {
            cartExtraDiv.style.display = "none";
        }

        const totalPrice: number = cartState.items.reduce((sum: number, item: CartItem): number => {
            return sum + item.unitPrice * item.quantity;
        }, 0);

        const articleCount: number = cartState.items.reduce((sum: number, item: CartItem): number => {
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
        } else {
            if (cartContentDiv.contains(cartPriceParagraph)) {
                cartContentDiv.removeChild(cartPriceParagraph);
            }
            if (cartContentDiv.contains(cartStartOverButton)) {
                cartContentDiv.removeChild(cartStartOverButton);
            }
            cartFormDiv.style.display = "none";
        }
    }

    function clearCategory(_element: HTMLDivElement): void {
        while (_element.childNodes.length > 1) {
            _element.removeChild(_element.lastChild as ChildNode);
        }
    }

    function loadCart(): CartState {
        const raw: string | null = localStorage.getItem(CART_KEY);
        if (!raw) {
            return { items: [] };
        }

        try {
            const parsed: CartState = JSON.parse(raw) as CartState;
            if (Array.isArray(parsed.items)) {
                return parsed;
            }
            return { items: [] };
        } catch (_error) {
            return { items: [] };
        }
    }

    function saveCart(): void {
        localStorage.setItem(CART_KEY, JSON.stringify(cartState));
    }

    function deleteCart(): void {
        cartState.items = [];
        saveCart();
        cartForm.reset();
        renderCart();
    }

    function sendOrder(): void {
        if (cartState.items.length === 0) {
            alert("Der Warenkorb ist leer.");
            return;
        }

        const formData: FormData = new FormData(cartForm);
        const vorname: string = String(formData.get("vorname") || "").trim();
        const nachname: string = String(formData.get("nachname") || "").trim();
        const strasse: string = String(formData.get("strasse") || "").trim();
        const stadt: string = String(formData.get("stadt") || "").trim();

        if (!vorname || !nachname || !strasse || !stadt) {
            alert("Bitte alle Felder im Formular ausfüllen.");
            return;
        }

        const totalPrice: number = cartState.items.reduce((sum: number, item: CartItem): number => {
            return sum + item.unitPrice * item.quantity;
        }, 0);

        const articleCount: number = cartState.items.reduce((sum: number, item: CartItem): number => {
            return sum + item.quantity;
        }, 0);

        const articleNames: string[] = [];
        for (const item of cartState.items) {
            for (let i: number = 0; i < item.quantity; i++) {
                articleNames.push(item.name);
            }
        }

        const newOrder: Order = {
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

        const orders: Order[] = loadOrders();
        orders.push(newOrder);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

        deleteCart();
        alert("Bestellung lokal gespeichert. Du kannst sie im Admin-Bereich sehen.");
    }

    function loadOrders(): Order[] {
        const raw: string | null = localStorage.getItem(ORDERS_KEY);
        if (!raw) {
            return [];
        }

        try {
            const parsed: Order[] = JSON.parse(raw) as Order[];
            return Array.isArray(parsed) ? parsed : [];
        } catch (_error) {
            return [];
        }
    }

    function handleClickBurgerOpen(): void {
        if (window.innerWidth <= 600) {
            burgerDivMenu.style.width = "100%";
            cartDivOpen.style.display = "none";
        } else {
            burgerDivMenu.style.width = "250px";
            mainDiv.style.marginLeft = "250px";
        }
    }

    function handleClickBurgerClose(): void {
        burgerDivMenu.style.width = "0px";
        mainDiv.style.marginLeft = "0px";
        cartDivOpen.style.display = "block";
    }

    function handleClickCartOpen(): void {
        if (window.innerWidth <= 600) {
            cartDivMenu.style.width = "100%";
            burgerDivOpen.style.display = "none";
        } else {
            cartDivMenu.style.width = "550px";
            mainDiv.style.marginRight = "550px";
        }
    }

    function handleClickCartClose(): void {
        cartDivMenu.style.width = "0px";
        mainDiv.style.marginRight = "0px";
        burgerDivOpen.style.display = "block";
    }

    function showAll(): void {
        containers.style.display = "flex";
        flavours.style.display = "flex";
        toppings.style.display = "flex";
        extras.style.display = "flex";
    }

    function showContainers(): void {
        containers.style.display = "flex";
    }

    function showFlavours(): void {
        flavours.style.display = "flex";
    }

    function showToppings(): void {
        toppings.style.display = "flex";
    }

    function showExtras(): void {
        extras.style.display = "flex";
    }
}
