function findIndex(collection, element){
    let index = 0;
    for (const elementNow of collection) {
        if (elementNow == element) return index;
        index++;
    }
}

const content = document.querySelector('.content');
const buttons = document.querySelector('.buttons');
const products = document.querySelector('.products');
const head = document.querySelector(".head");

console.log(head);

head.addEventListener("click", function () {
    for (const key in localStorage.length) {
        alert(localStorage.getItem(key));
    }
})



const typeOfpizzas = ["recomendated", "without-meat", "sweet", "stocks", "drinks"];
let oldElement;
buttons.addEventListener("click", function (event) {
    if (event.target.closest(".buttons__button")) {
        if (oldElement) oldElement.style.background = "linear-gradient(0deg, #ECEEF6, #ECEEF6), #59AAF1";
        event.target.closest(".buttons__button").style.background = "#F6B716";
        oldElement = event.target.closest(".buttons__button");
        let index = findIndex(buttons.children, event.target.closest(".buttons__button"));
        for (const element of products.children) {
            if (!element.classList.contains(typeOfpizzas[index])) {
                element.classList.add("hidden");
            }
            else {
                element.classList.remove("hidden");
            }
        }
    }
})
content.addEventListener("click", function(event){
    if (event.target.closest(".item__purchase")){
        event.target.closest(".item__purchase").classList.toggle("bought");
        for (const element of event.target.closest(".item__purchase").children) {
            element.classList.toggle("hidden");
        }
    }
})


