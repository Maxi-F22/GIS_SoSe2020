namespace Pruefungsaufgabe {
    interface Bestellungen {
        _id: string;
        vorname: string;
        nachname: string;
        strasse: string;
        stadt: string;
        artikel: string;
        preis: string;
        anzahl: string;
    }

    let orders: Bestellungen[];

    getOrders();

    let formData: FormData;

    async function getOrders(): Promise<void> {
        let url: string = "https://gissose2020maxfla.herokuapp.com";
        url += "/getadmin";
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseJson: Bestellungen[] = JSON.parse(responseText);
        generateOrders(responseJson);
    }

    let allOrdersDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("adminorders");

    function generateOrders(_responseJson: Bestellungen[]): void {
        orders = _responseJson;

        for (let i: number = 0; i < orders.length; i++) {
            let ordersDiv: HTMLDivElement = document.createElement("div");
            ordersDiv.setAttribute("class", "adminordersdiv");
            allOrdersDiv.appendChild(ordersDiv);
            let ordersHeading: HTMLHeadingElement = document.createElement("h3");
            ordersHeading.innerHTML = "Bestellung " + (i + 1);
            ordersDiv.appendChild(ordersHeading);

            let ordersName: HTMLParagraphElement = document.createElement("p");
            ordersName.innerHTML = orders[i].vorname + " " + orders[i].nachname;
            ordersDiv.appendChild(ordersName);

            let ordersAdresse: HTMLParagraphElement = document.createElement("p");
            ordersAdresse.innerHTML = orders[i].strasse + ", " + orders[i].stadt;
            ordersDiv.appendChild(ordersAdresse);

            let ordersArticles: HTMLParagraphElement = document.createElement("p");
            ordersArticles.innerHTML = orders[i].artikel;
            ordersDiv.appendChild(ordersArticles);

            let ordersCount: HTMLParagraphElement = document.createElement("p");
            ordersCount.innerHTML = orders[i].anzahl + " Artikel";
            ordersDiv.appendChild(ordersCount);

            let ordersPrice: HTMLParagraphElement = document.createElement("p");
            ordersPrice.innerHTML = orders[i].preis.replace(".", ",") + "€";
            ordersDiv.appendChild(ordersPrice);

            let editAdresseButton: HTMLButtonElement = document.createElement("button");
            editAdresseButton.innerHTML = "Adresse bearbeiten";
            editAdresseButton.setAttribute("class", "adminbutton");
            ordersDiv.appendChild(editAdresseButton);
            editAdresseButton.addEventListener("click", handleClickEdit);

            let deleteButton: HTMLButtonElement = document.createElement("button");
            deleteButton.innerHTML = "Löschen";
            deleteButton.setAttribute("class", "adminbutton");
            ordersDiv.appendChild(deleteButton);
            deleteButton.addEventListener("click", handleClickDelete);

            let editDiv: HTMLDivElement = document.createElement("div");
            let editHeader: HTMLHeadingElement = document.createElement("h4");
            editHeader.innerHTML = "Neue Adresse:";
            editDiv.appendChild(editHeader);
            let editForm: HTMLFormElement = document.createElement("form");
            editForm.setAttribute("method", "GET");
            editDiv.appendChild(editForm);
            let newAdressStreet: HTMLInputElement = document.createElement("input");
            newAdressStreet.setAttribute("type", "text");
            newAdressStreet.setAttribute("name", "strasse");
            newAdressStreet.setAttribute("placeholder", "Neue Straße");
            editForm.appendChild(newAdressStreet);
            let newAdressCity: HTMLInputElement = document.createElement("input");
            newAdressCity.setAttribute("type", "text");
            newAdressCity.setAttribute("name", "stadt");
            newAdressCity.setAttribute("placeholder", "Neue Stadt");
            editForm.appendChild(newAdressCity);
            let breakElement: HTMLElement = document.createElement("br");
            editForm.appendChild(breakElement);
            let editFormButton: HTMLButtonElement = document.createElement("button");
            editFormButton.setAttribute("type", "button");
            editFormButton.setAttribute("id", "admineditbutton");
            editFormButton.innerHTML = "Ändern";
            editFormButton.addEventListener("click", handleClickEditSend);
            editForm.appendChild(editFormButton);

            function handleClickEdit(): void {
                ordersDiv.appendChild(editForm);
            }

            async function handleClickDelete(): Promise<void> {
                let url: string = "https://gissose2020maxfla.herokuapp.com";
                url += "/delete" + "?_id=" + orders[i]._id;
                await fetch(url);
                document.location.reload();
            }

            async function handleClickEditSend(): Promise<void> {
                formData = new FormData(document.forms[0]);
                let url: string = "https://gissose2020maxfla.herokuapp.com";
                // tslint:disable-next-line: no-any
                let query: URLSearchParams = new URLSearchParams(<any>formData);
                console.log(query.toString());
                url += "/edit" + "?_id=" + orders[i]._id + "&" + query.toString();
                await fetch(url);
                document.location.reload();
            }

        }
    }
}
