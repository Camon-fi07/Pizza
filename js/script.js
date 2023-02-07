async function getProducts(){
    let promise = await fetch('https://shift-winter-2023-backend.onrender.com/api/pizza');
    let answer = await promise.json();
    return answer;
}

getProducts().then(result => localStorage.setItem("allProducts", JSON.stringify(result)));
const allProducts = JSON.parse(localStorage.getItem("allProducts"));
const blockForProducts = document.querySelector(".products");
for (const product of allProducts) {
    let s = "stocks ";
    for (const key in product.classifications) {
        if (product.classifications[key]) s+=`${key} `;
    }
    blockForProducts.insertAdjacentHTML(
        "beforeend",
        `
        <div class="products__items item ${s}">
            <div class="item__image">
                <img src='${product.img}' alt="oj">
            </div>
            <div class="item__title">
                <h2>${product.name}</h2>
                <span>30 см</span>
            </div>
            <p class="item__text">${product.ingredients}</p>
            <span class="item__cost">${product.price.default} ₽</span>
            <button class="item__purchase">
                <img src="assets/img/bagBlack.png" alt="">
                <img class="hidden" src="assets/img/bagWhite.png" alt="">
            </button>
        </div>
        `
    )
}


function findIndexOfPizza(collection, element){
    let index = 0;
    for (const elementNow of collection) {
        if(element == elementNow) return index;
        index++
    }
}
/*
function CreateProduct(name, size, structure, cost, type, image){
   this.name = name;
   this.size = size;
   this.structure = structure;
   this.cost = cost;
   this.type = type;
   this.image = image;
}

// Добавление продуктов
const allProducts = [
    new CreateProduct("Карбонара", "30см", "Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок", 749, "recomendated stock", "assets/img/pizzas/Carbonara.png"),

    new CreateProduct("Аррива!", "30см", "Цыпленок, острая чоризо, соус бургер, сладкий перец, красный лук, томаты, моцарелла", 649, "recomendated sweet", "assets/img/pizzas/Arriva.png"),

    new CreateProduct("Диабло", "30см", "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты", 749, "recomendated", "assets/img/pizzas/Diablo.png"),

    new CreateProduct("Овощи и грибы", "30см", "Шампиньоны, томаты, сладкий перец, красный лук, кубики брынзы, моцарелла, томатный соус", 549, "recomendated without-meat", "assets/img/pizzas/VegMush.png"),

    new CreateProduct("Карбонара", "20см", "Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок", 649, "recomendated stock", "assets/img/pizzas/Carbonara.png"),

    new CreateProduct("Аррива!", "20см", "Цыпленок, острая чоризо, соус бургер, сладкий перец, красный лук, томаты, моцарелла", 549, "recomendated sweet", "assets/img/pizzas/Arriva.png"),

    new CreateProduct("Диабло", "20см", "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты", 649, "recomendated", "assets/img/pizzas/Diablo.png"),

    new CreateProduct("Овощи и грибы", "20см", "Шампиньоны, томаты, сладкий перец, красный лук, кубики брынзы, моцарелла, томатный соус", 449, "recomendated without-meat", "assets/img/pizzas/VegMush.png")
]

// const blockForProducts = document.querySelector(".products");

localStorage.setItem("allProducts", JSON.stringify(allProducts));

for (const product of allProducts) {
    blockForProducts.insertAdjacentHTML(
        "beforeend", 
        `
        <div class="products__items item ${product.type}">
            <div class="item__image">
                <img src=${product.image} alt="">
            </div>
            <div class="item__title">
                <h2>${product.name}</h2>
                <span>${product.size}</span>
            </div>
            <p class="item__text">${product.structure}</p>
            <span class="item__cost">${product.cost} ₽</span>
            <button class="item__purchase">
                <img src="assets/img/bagBlack.png" alt="">
                <img class="hidden" src="assets/img/bagWhite.png" alt="">
            </button>
        </div>
        `
    )
}
*/

const buttons = document.querySelector('.buttons');
let oldElement, typeNow;
buttons.addEventListener("click", function (event) {
    if (event.target.closest(".buttons__button")) {
        // Убираем стили с кнопки, нажатой до этого
        if (oldElement){
            oldElement.style.background = "linear-gradient(0deg, #ECEEF6, #ECEEF6), #59AAF1";
        } 

        event.target.closest(".buttons__button").style.background = "#F6B716";
        oldElement = event.target.closest(".buttons__button");

        typeNow = event.target.closest(".buttons__button").id;
        // Фильтрация элементов по типу
        for (const element of blockForProducts.children) {
            if (!element.classList.contains(typeNow)) {
                element.classList.add("hidden");
            }
            else {
                element.classList.remove("hidden");
            }
        }
    }
})


const orders = document.querySelector("#orders");

let boughtProducts = [];
// Обнуление хранилища(при переходе от одной странички к другой)
localStorage.setItem("boughtProducts", "");
localStorage.setItem("count", boughtProducts.length);

let buttonNow;
blockForProducts.addEventListener("click", function(event){
    if (event.target.closest(".item__purchase")){

        buttonNow = event.target.closest(".item__purchase");

        buttonNow.classList.toggle("bought");
        for (const element of buttonNow.children) {
            element.classList.toggle("hidden");
        }
        
        index = findIndexOfPizza(blockForProducts.children, buttonNow.parentElement);

        if(buttonNow.classList.contains("bought")){
            boughtProducts.push({index: `${index}`, count: 1});
        }
        else{
            boughtProducts.splice(boughtProducts.find(item => item.index==index), 1);
        }

        localStorage.setItem("boughtProducts", JSON.stringify(boughtProducts));
        localStorage.setItem("count", boughtProducts.length);
        orders.textContent = `Оформить заказ(${boughtProducts.length})`;
    }
})