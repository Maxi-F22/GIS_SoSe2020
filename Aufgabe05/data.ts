namespace Aufgabe05 {
    export interface Artikel {
        name: string;
        img: string;
        descr: string;
        price: string;
        
    }
    //Möbel
    let apfelstuhl: Artikel = { name: "Apfelstuhl", img: "Bilder/Möbel/apfelstuhl.png", descr: "...Warum nicht?", price: "Preis: 12,99€"};
    let anatomisch: Artikel = { name: "Anatomisches Modell", img: "Bilder/Möbel/anatomisch.png", descr: "Halb Mensch, halb gehäutet", price: "Preis: 45,98€"};
    let arcade: Artikel = { name: "Arcade", img: "Bilder/Möbel/arcade.png", descr: "Für das Spiel im Spiel", price: "Preis: 1299,00€"};
    let astronaut: Artikel = { name: "Astronaut", img: "Bilder/Möbel/astronaut.png", descr: "Nur der Anzug", price: "Preis: 199999,99€"};
    let asteroid: Artikel = { name: "Asteroid", img: "Bilder/Möbel/asteroid.png", descr: "Hat der Astronaut mitgebracht", price: "Preis: 1234,99€"};
    let muelltonne: Artikel = { name: "Mülltonne", img: "Bilder/Möbel/mülltonne.png", descr: "Um alte Klausuren zu entsorgen", price: "Preis: 1,00€"};

    //Bewohner
    let anton: Artikel = { name: "Anton", img: "Bilder/Bewohner/Anton.png", descr: "Jeder mag Affen", price: "Preis: 20 NMT"};
    let armin: Artikel = { name: "Armin", img: "Bilder/Bewohner/Armin.png", descr: "Vogel mit Mittelscheitel", price: "Preis: 20 NMT"};
    let ede: Artikel = { name: "Ede", img: "Bilder/Bewohner/Ede.png", descr: "Hat schon viel erlebt", price: "Preis: 20 NMT"};
    let grischa: Artikel = { name: "Grischa", img: "Bilder/Bewohner/Grischa.png", descr: "Veni, vidi, vici", price: "Preis: 20 NMT"};
    let hubert: Artikel = { name: "Hubert", img: "Bilder/Bewohner/Hubert.png", descr: "Bär mit Bart und Brille", price: "Preis: 20 NMT"};
    let koko: Artikel = { name: "Koko", img: "Bilder/Bewohner/Koko.png", descr: "Starrt direkt in deine Seele", price: "Preis: 20 NMT"};

    export let artikelMöbel: Artikel[] = [apfelstuhl, anatomisch, arcade, astronaut, asteroid, muelltonne];
    export let artikelBewohner: Artikel[] = [anton, armin, ede, grischa, hubert, koko];
}