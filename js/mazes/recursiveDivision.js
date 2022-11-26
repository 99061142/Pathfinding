export class RecursiveDivision {
    constructor() {
        this.init();
    }

    init() {
        console.log("start")
    }
}

let button = document.getElementById("recursiveDivision");
button.addEventListener("click", () => {
    new RecursiveDivision();
});
