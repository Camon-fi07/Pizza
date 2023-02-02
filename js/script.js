function findIndexOfPizza(collection, element){
    let index = 0;
    for (const elementNow of collection) {
        if(element == elementNow) return index;
        index++
    }
}

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
    new CreateProduct("Карбонара", "30см", "Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок", 749, "recomendated stock", "img/pizzas/Carbonara.png"),

    new CreateProduct("Аррива!", "30см", "Цыпленок, острая чоризо, соус бургер, сладкий перец, красный лук, томаты, моцарелла", 649, "recomendated sweet", "img/pizzas/Arriva.png"),

    new CreateProduct("Диабло", "30см", "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты", 749, "recomendated", "img/pizzas/Diablo.png"),

    new CreateProduct("Овощи и грибы", "30см", "Шампиньоны, томаты, сладкий перец, красный лук, кубики брынзы, моцарелла, томатный соус", 549, "recomendated without-meat", "img/pizzas/VegMush.png"),

    new CreateProduct("Карбонара", "20см", "Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок", 649, "recomendated stock", "img/pizzas/Carbonara.png"),

    new CreateProduct("Аррива!", "20см", "Цыпленок, острая чоризо, соус бургер, сладкий перец, красный лук, томаты, моцарелла", 549, "recomendated sweet", "img/pizzas/Arriva.png"),

    new CreateProduct("Диабло", "20см", "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты", 649, "recomendated", "img/pizzas/Diablo.png"),

    new CreateProduct("Овощи и грибы", "20см", "Шампиньоны, томаты, сладкий перец, красный лук, кубики брынзы, моцарелла, томатный соус", 449, "recomendated without-meat", "img/pizzas/VegMush.png")
]

localStorage.setItem("countOfProducts", allProducts.length);
for (const index in allProducts) {
    localStorage.setItem(index, JSON.stringify(allProducts[index]));
}

const blockForProducts = document.querySelector('.products');

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
                <img src="img/bagBlack.png" alt="">
                <img class="hidden" src="img/bagWhite.png" alt="">
            </button>
        </div>
        `
    )
}


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
        // Фильтрация элментов по типу
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
            boughtProducts.push(index);
        }
        else{
            boughtProducts.splice(boughtProducts.indexOf(index), 1);
        }

        localStorage.setItem("boughtProducts", boughtProducts.join(","));
        localStorage.setItem("count", boughtProducts.length);
        orders.textContent = `Оформить заказ(${boughtProducts.length})`;
    }
})