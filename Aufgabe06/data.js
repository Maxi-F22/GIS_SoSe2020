"use strict";
var Aufgabe06;
(function (Aufgabe06) {
    //Möbel
    let apfelstuhl = { name: "Apfelstuhl", img: "Bilder/Möbel/apfelstuhl.png", descr: "...Warum nicht?", price: 12.99 };
    let anatomisch = { name: "Anatomisches Modell", img: "Bilder/Möbel/anatomisch.png", descr: "Halb Mensch, halb gehäutet", price: 45.98 };
    let arcade = { name: "Arcade", img: "Bilder/Möbel/arcade.png", descr: "Für das Spiel im Spiel", price: 150.00 };
    let astronaut = { name: "Astronaut", img: "Bilder/Möbel/astronaut.png", descr: "Nur der Anzug", price: 199.99 };
    let asteroid = { name: "Asteroid", img: "Bilder/Möbel/asteroid.png", descr: "Hat der Astronaut mitgebracht", price: 123.99 };
    let muelltonne = { name: "Mülltonne", img: "Bilder/Möbel/mülltonne.png", descr: "Um alte Klausuren zu entsorgen", price: 1.00 };
    //Bewohner
    let anton = { name: "Anton", img: "Bilder/Bewohner/Anton.png", descr: "Jeder mag Affen", price: 20 };
    let armin = { name: "Armin", img: "Bilder/Bewohner/Armin.png", descr: "Vogel mit Mittelscheitel", price: 30 };
    let ede = { name: "Ede", img: "Bilder/Bewohner/Ede.png", descr: "Hat schon viel erlebt", price: 25 };
    let grischa = { name: "Grischa", img: "Bilder/Bewohner/Grischa.png", descr: "Veni, vidi, vici", price: 19 };
    let hubert = { name: "Hubert", img: "Bilder/Bewohner/Hubert.png", descr: "Bär mit Bart und Brille", price: 22 };
    let koko = { name: "Koko", img: "Bilder/Bewohner/Koko.png", descr: "Starrt direkt in deine Seele", price: 150 };
    Aufgabe06.allArticles = [apfelstuhl, anatomisch, arcade, astronaut, asteroid, muelltonne, anton, armin, ede, grischa, hubert, koko];
})(Aufgabe06 || (Aufgabe06 = {}));
//# sourceMappingURL=data.js.map