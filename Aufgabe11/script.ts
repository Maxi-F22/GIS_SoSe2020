namespace Aufgabe11 {
    let formData: FormData;

    let sendClick: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonSend");
    sendClick.addEventListener("click", handleSendClick);
    let retrieveClick: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonGet");
    retrieveClick.addEventListener("click", handleRetrieveClick);

    async function handleSendClick(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020maxfla.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/send" + "?" + query.toString();
        await fetch(url);
    }

    async function handleRetrieveClick(): Promise<void> {
        let url: string = "https://gissose2020maxfla.herokuapp.com";
        url += "/get";
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("response");
        responseDiv.innerHTML = responseText;
    }
}