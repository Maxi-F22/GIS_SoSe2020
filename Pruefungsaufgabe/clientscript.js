"use strict";
var Pruefungsaufgabe;
(function (Pruefungsaufgabe) {
    //Off-Canvas Menu
    let burgerDivMenu = document.getElementById("burgernav");
    let burgerDivOpen = document.getElementById("burgeropen");
    burgerDivOpen.addEventListener("click", handleClickBurgerOpen);
    let burgerDivClose = document.getElementById("burgerclose");
    burgerDivClose.addEventListener("click", handleClickBurgerClose);
    function handleClickBurgerOpen(_click) {
        if (screen.width <= 600) {
            burgerDivMenu.style.width = "100%";
        }
        else {
            burgerDivMenu.style.width = "250px";
        }
    }
    function handleClickBurgerClose(_click) {
        burgerDivMenu.style.width = "0px";
    }
    //Off-Canvas Cart
    let cartDivMenu = document.getElementById("cart");
    let cartDivOpen = document.getElementById("cartopen");
    cartDivOpen.addEventListener("click", handleClickCartOpen);
    let cartDivClose = document.getElementById("cartclose");
    cartDivClose.addEventListener("click", handleClickCartClose);
    function handleClickCartOpen(_click) {
        if (screen.width <= 600) {
            cartDivMenu.style.width = "100%";
        }
        else {
            cartDivMenu.style.width = "550px";
        }
    }
    function handleClickCartClose(_click) {
        cartDivMenu.style.width = "0px";
    }
})(Pruefungsaufgabe || (Pruefungsaufgabe = {}));
//# sourceMappingURL=clientscript.js.map