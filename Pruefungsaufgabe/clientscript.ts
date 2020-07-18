namespace Pruefungsaufgabe {
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

    interface Artikel {
        name: string;
        img: string;
        price: number;
        category: string;
    }

    let allArticles: Artikel[];

    //Artikel erzeugen
    getArticles("example.json");

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


    async function getArticles(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let articlesJson: JSON = await response.json();
        allArticles = await JSON.parse(JSON.stringify(articlesJson));

        for (let i: number = 0; i < allArticles.length; i++) {
            let divElement: HTMLDivElement = document.createElement("div");
            divElement.setAttribute("id", "div" + i);
            let nameElement: HTMLHeadingElement = document.createElement("h3");
            let imgElement: HTMLImageElement = document.createElement("img");
            let priceElement: HTMLParagraphElement = document.createElement("p");

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
            let p: String = `Preis: ${allArticles[i].price.toString()}€`;
            priceElement.innerHTML = p.italics();
            divElement.appendChild(priceElement);
        }
    }
}