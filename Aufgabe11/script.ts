namespace Aufgabe11 {
    let formData: FormData;

    let sendClick: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonSend");
    sendClick.addEventListener("click", handleSendClick);
    let retrieveClick: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonGet");
    retrieveClick.addEventListener("click", handleRetrieveClick);

    async function handleSendClick(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020maxfla.herokuapp.com";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/send" + "?" + query.toString();
        await fetch(url);
    }

    async function handleRetrieveClick(): Promise<void> {
        let url: string = "https://gissose2020maxfla.herokuapp.com";
        url += "/get";
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseP: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("response");
        responseP.innerHTML = responseText;
        let responseDiv: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("responseDiv");
        responseDiv.style.display = "block";
    }
}