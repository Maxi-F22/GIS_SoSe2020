namespace Aufgabe06 {
    export interface Artikel {
        name: string;
        img: string;
        descr: string;
        price: number;

    }
    //Möbel
    let apfelstuhl: Artikel = { name: "Apfelstuhl", img: "Bilder/Möbel/apfelstuhl.png", descr: "...Warum nicht?", price: 12.99 };
    let anatomisch: Artikel = { name: "Anatomisches Modell", img: "Bilder/Möbel/anatomisch.png", descr: "Halb Mensch, halb gehäutet", price: 45.98 };
    let arcade: Artikel = { name: "Arcade", img: "Bilder/Möbel/arcade.png", descr: "Für das Spiel im Spiel", price: 150.00 };
    let astronaut: Artikel = { name: "Astronaut", img: "Bilder/Möbel/astronaut.png", descr: "Nur der Anzug", price: 199.99 };
    let asteroid: Artikel = { name: "Asteroid", img: "Bilder/Möbel/asteroid.png", descr: "Hat der Astronaut mitgebracht", price: 123.99 };
    let muelltonne: Artikel = { name: "Mülltonne", img: "Bilder/Möbel/mülltonne.png", descr: "Um alte Klausuren zu entsorgen", price: 1.00 };

    //Bewohner
    let anton: Artikel = { name: "Anton", img: "Bilder/Bewohner/Anton.png", descr: "Jeder mag Affen", price: 20 };
    let armin: Artikel = { name: "Armin", img: "Bilder/Bewohner/Armin.png", descr: "Vogel mit Mittelscheitel", price: 30 };
    let ede: Artikel = { name: "Ede", img: "Bilder/Bewohner/Ede.png", descr: "Hat schon viel erlebt", price: 25 };
    let grischa: Artikel = { name: "Grischa", img: "Bilder/Bewohner/Grischa.png", descr: "Veni, vidi, vici", price: 19 };
    let hubert: Artikel = { name: "Hubert", img: "Bilder/Bewohner/Hubert.png", descr: "Bär mit Bart und Brille", price: 22 };
    let koko: Artikel = { name: "Koko", img: "Bilder/Bewohner/Koko.png", descr: "Starrt direkt in deine Seele", price: 150 };

    export let allArticles: Artikel[] = [apfelstuhl, anatomisch, arcade, astronaut, asteroid, muelltonne, anton, armin, ede, grischa, hubert, koko];
}