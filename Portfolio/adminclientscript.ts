namespace Pruefungsaufgabe {
    interface Order {
        id: string;
        createdAt: string;
        vorname: string;
        nachname: string;
        strasse: string;
        stadt: string;
        artikel: string[] | string;
        preis: string;
        anzahl: string;
    }

    const ORDERS_KEY: string = "eisdealer_orders_v1";
    const allOrdersDiv: HTMLDivElement = document.getElementById("adminorders") as HTMLDivElement;

    renderOrders();

    function renderOrders(): void {
        allOrdersDiv.innerHTML = "";
        const orders: Order[] = loadOrders();

        if (orders.length === 0) {
            return;
        }

        orders.forEach((order: Order, index: number): void => {
            const ordersDiv: HTMLDivElement = document.createElement("div");
            ordersDiv.setAttribute("class", "adminordersdiv");

            const heading: HTMLHeadingElement = document.createElement("h3");
            heading.innerText = "Bestellung " + (index + 1);

            const name: HTMLParagraphElement = document.createElement("p");
            name.innerText = order.vorname + " " + order.nachname;

            const address: HTMLParagraphElement = document.createElement("p");
            address.innerText = order.strasse + ", " + order.stadt;

            const articles: HTMLParagraphElement = document.createElement("p");
            articles.innerText = normalizeArticleList(order.artikel).join(", ");

            const count: HTMLParagraphElement = document.createElement("p");
            count.innerText = order.anzahl + " Artikel";

            const price: HTMLParagraphElement = document.createElement("p");
            price.innerText = order.preis.replace(".", ",") + "EUR";

            const date: HTMLParagraphElement = document.createElement("p");
            date.innerText = "Erstellt: " + new Date(order.createdAt).toLocaleString();

            const editButton: HTMLButtonElement = document.createElement("button");
            editButton.innerText = "Adresse bearbeiten";
            editButton.setAttribute("class", "adminbutton");

            const deleteButton: HTMLButtonElement = document.createElement("button");
            deleteButton.innerText = "Löschen";
            deleteButton.setAttribute("class", "adminbutton");

            const editWrapper: HTMLDivElement = document.createElement("div");
            const streetInput: HTMLInputElement = document.createElement("input");
            streetInput.type = "text";
            streetInput.placeholder = "Neue Strasse";
            streetInput.value = order.strasse;

            const cityInput: HTMLInputElement = document.createElement("input");
            cityInput.type = "text";
            cityInput.placeholder = "Neue Stadt";
            cityInput.value = order.stadt;

            const saveButton: HTMLButtonElement = document.createElement("button");
            saveButton.type = "button";
            saveButton.id = "admineditbutton";
            saveButton.innerText = "Ändern";

            editWrapper.style.display = "none";
            editWrapper.appendChild(streetInput);
            editWrapper.appendChild(cityInput);
            editWrapper.appendChild(document.createElement("br"));
            editWrapper.appendChild(saveButton);

            editButton.addEventListener("click", (): void => {
                editWrapper.style.display = editWrapper.style.display === "none" ? "block" : "none";
            });

            saveButton.addEventListener("click", (): void => {
                const street: string = streetInput.value.trim();
                const city: string = cityInput.value.trim();
                if (!street || !city) {
                    alert("Bitte Strasse und Stadt eingeben.");
                    return;
                }

                const updatedOrders: Order[] = loadOrders();
                const orderIndex: number = updatedOrders.findIndex((entry: Order): boolean => entry.id === order.id);
                if (orderIndex >= 0) {
                    updatedOrders[orderIndex].strasse = street;
                    updatedOrders[orderIndex].stadt = city;
                    saveOrders(updatedOrders);
                    renderOrders();
                }
            });

            deleteButton.addEventListener("click", (): void => {
                const updatedOrders: Order[] = loadOrders().filter((entry: Order): boolean => entry.id !== order.id);
                saveOrders(updatedOrders);
                renderOrders();
            });

            ordersDiv.appendChild(heading);
            ordersDiv.appendChild(name);
            ordersDiv.appendChild(address);
            ordersDiv.appendChild(articles);
            ordersDiv.appendChild(count);
            ordersDiv.appendChild(price);
            ordersDiv.appendChild(date);
            ordersDiv.appendChild(editButton);
            ordersDiv.appendChild(deleteButton);
            ordersDiv.appendChild(editWrapper);

            allOrdersDiv.appendChild(ordersDiv);
        });
    }

    function normalizeArticleList(_value: string[] | string): string[] {
        if (Array.isArray(_value)) {
            return _value;
        }
        if (!_value) {
            return [];
        }
        return _value.split(",").map((entry: string): string => entry.trim()).filter(Boolean);
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

    function saveOrders(_orders: Order[]): void {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(_orders));
    }
}
