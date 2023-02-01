function findIndex(collection, element){
    let index = 0;
    for (const elementNow of collection) {
        if (elementNow == element) return index;
        index++;
    }
}

function findIndexOfPizza(collection, element){
    let index = 0;
    for (const elementNow of collection) {
        if(element == elementNow.children[4]) return index;
        index++
    }
}


const content = document.querySelector('.content');
const buttons = document.querySelector('.buttons');
const products = document.querySelector('.products');
const linkOrders = document.querySelector(".menu").children[2].children[0];

const typeOfProducts = ["recomendated", "without-meat", "sweet", "stocks", "drinks"];

let oldElement, index;
buttons.addEventListener("click", function (event) {
    if (event.target.closest(".buttons__button")) {
        if (oldElement) oldElement.style.background = "linear-gradient(0deg, #ECEEF6, #ECEEF6), #59AAF1";

        event.target.closest(".buttons__button").style.background = "#F6B716";
        oldElement = event.target.closest(".buttons__button");

        index = findIndex(buttons.children, event.target.closest(".buttons__button"));

        for (const element of products.children) {
            if (!element.classList.contains(typeOfProducts[index])) {
                element.classList.add("hidden");
            }
            else {
                element.classList.remove("hidden");
            }
        }
    }
})

let allPizzas = "";
let boughtProducts = "";
for (const element of products.children) {
    allPizzas += `${element.children[1].children[0].textContent};${element.children[1].children[1].textContent};${element.children[3].textContent};${element.children[0].children[0].getAttribute("src")},`
}

localStorage.setItem("allPizzas", allPizzas);
let temp, count = 0;

content.addEventListener("click", function(event){
    if (event.target.closest(".item__purchase")){
        event.target.closest(".item__purchase").classList.toggle("bought");
        for (const element of event.target.closest(".item__purchase").children) {
            element.classList.toggle("hidden");
        }
        
        index = findIndexOfPizza(products.children, event.target.closest(".item__purchase"));
        if(event.target.closest(".item__purchase").classList.contains("bought")){
            boughtProducts += `${index},`;

            count++;
            
        }
        else{
            temp = `${index},`;
            count--;

            boughtProducts = boughtProducts.slice(0, boughtProducts.indexOf(temp)) + boughtProducts.slice(boughtProducts.indexOf(temp) + temp.length, boughtProducts.length);   
        }

        localStorage.setItem("boughtProducts", boughtProducts);
        localStorage.setItem("count", count);
        linkOrders.textContent = `Оформить заказ(${localStorage.getItem("count")})`;
    }
})





