namespace Aufgabe08 {
    

    let buttonClick: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
    buttonClick.addEventListener("click", handleClick);
    

    async function handleClick(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020maxfla.herokuapp.com/";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        await fetch(url);
        for (let entry of query) {
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
    }
}