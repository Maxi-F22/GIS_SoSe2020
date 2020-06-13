namespace Aufgabe07 {
    export interface Artikel {
        name: string;
        img: string;
        descr: string;
        price: number;
        category: string;
    }
    //Array für Artikel
    export let allArticles: Artikel[];
}