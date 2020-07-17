namespace Pruefungsaufgabe {
    //Off-Canvas Menu
    let burgerDivMenu: HTMLDivElement = <HTMLDivElement>document.getElementById("burgernav");

    let burgerDivOpen: HTMLDivElement = <HTMLDivElement>document.getElementById("burgeropen");
    burgerDivOpen.addEventListener("click", handleClickBurgerOpen);

    let burgerDivClose: HTMLDivElement = <HTMLDivElement>document.getElementById("burgerclose");
    burgerDivClose.addEventListener("click", handleClickBurgerClose);

    function handleClickBurgerOpen(_click: Event): void {
        if (screen.width <= 600) {
            burgerDivMenu.style.width = "100%";
        } else { burgerDivMenu.style.width = "250px"; }
    }

    function handleClickBurgerClose(_click: Event): void {
        burgerDivMenu.style.width = "0px";
    }

    //Off-Canvas Cart
    let cartDivMenu: HTMLDivElement = <HTMLDivElement>document.getElementById("cart");

    let cartDivOpen: HTMLDivElement = <HTMLDivElement>document.getElementById("cartopen");
    cartDivOpen.addEventListener("click", handleClickCartOpen);

    let cartDivClose: HTMLDivElement = <HTMLDivElement>document.getElementById("cartclose");
    cartDivClose.addEventListener("click", handleClickCartClose);

    function handleClickCartOpen(_click: Event): void {
        if (screen.width <= 600) {
            cartDivMenu.style.width = "100%";
        } else { cartDivMenu.style.width = "550px"; }
    }

    function handleClickCartClose(_click: Event): void {
        cartDivMenu.style.width = "0px";
    }
}