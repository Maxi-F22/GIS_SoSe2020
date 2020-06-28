namespace Aufgabe09 {
    let formData: FormData;
    //Event Listener für Buttons erstellen
    let htmlClick: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonHtml");
    htmlClick.addEventListener("click", handleHTMLClick);
    let jsonClick: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonJson");
    jsonClick.addEventListener("click", handleJSONClick);

    async function handleHTMLClick(): Promise<void> {
        formData = new FormData(document.forms[0]);
        //URL setzen und HTML + Query hinzufügen
        let url: string = "https://gissose2020maxfla.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/html" + "?" + query.toString();
        //Response deklarieren und Query Text ausgeben
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("response");
        responseDiv.innerHTML = responseText;
    }

    async function handleJSONClick(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020maxfla.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/json" + "?" + query.toString();
        //JSON fetchen und in Konsole ausgeben
        let response: Response = await fetch(url);
        let responseText: string = await response.json();
        console.log(responseText);
    }
}