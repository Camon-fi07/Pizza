const testButton = document.querySelector(".testButton");
const blockOfBoughtProducts = document.querySelector(".content__bought-products");
const costOfOrdering = document.querySelector(".content__cost");
const oldText = costOfOrdering.innerHTML;

//Количество пицц
const linkOrders = document.querySelector(".menu").children[2].children[0];
linkOrders.textContent = `Оформить заказ(${localStorage.getItem("count")})`;

//Обрабокта всех пицц
let allPizzas = localStorage['allPizzas'].split(",");
allPizzas = allPizzas.slice(0, allPizzas.length-1);
allPizzas = allPizzas.map(function (element) {
    return element.split(";");
});


let boughtProducts = localStorage['boughtProducts'].split(",");
boughtProducts = boughtProducts.slice(0, boughtProducts.length - 1);

//Вычисление стоимости заказа
let cost = 0;
function getCost(boughtProducts){
    boughtProducts.forEach(element => {
        cost += parseInt(allPizzas[Number(element)][2]);
    });

    costOfOrdering.innerHTML = `${oldText}${cost} ${allPizzas[0][2][allPizzas[0][2].length - 1]}`;
}

getCost(boughtProducts);
function addElement(index){
    blockOfBoughtProducts.insertAdjacentHTML(
        'beforeend',
        `<div class = "content__product product">
            <div class = "product__image">
                <img src = '${allPizzas[index][3]}'> </div>
            <div class = "product__about">
                <h2 class = "product__title">${allPizzas[index][0]}</h2>
                <span class = "product__text">${allPizzas[index][1]}</span>
            </div>
            <div class="product__cost">${allPizzas[index][2]}</div>
            <div class="product__panel">
                <button class="product__panel_minus">-</button>
                <span>1</span>
                <button class="product__panel_plus">+</button>
            </div>
            <button class="product__cancel">+</button>
        </div>
        `
    )
}

boughtProducts.forEach((element) => addElement(Number(element)));
let countOfProducts;
blockOfBoughtProducts.addEventListener("click", function(event){
    //минус
    if (event.target.closest(".product__panel_minus")){
        countOfProducts = Number(event.target.closest(".product__panel_minus").nextElementSibling.textContent);
        countOfProducts--;

        // Изменение цены
        cost -= parseInt(event.target.closest(".product__panel_minus").parentElement.previousElementSibling.textContent);

        costOfOrdering.innerHTML = `${oldText}${cost} ${allPizzas[0][2][allPizzas[0][2].length - 1]}`;

        if(countOfProducts == 0) {
            event.target.closest(".product__panel_minus").parentElement.parentElement.remove();
        }
        else{
            event.target.closest(".product__panel_minus").nextElementSibling.textContent = countOfProducts;
        }
    }
    // Плюс
    if (event.target.closest(".product__panel_plus")) {
        countOfProducts = Number(event.target.closest(".product__panel_plus").previousElementSibling.textContent);
        event.target.closest(".product__panel_plus").previousElementSibling.textContent = ++countOfProducts;

        // Изменение цены
        cost += parseInt(event.target.closest(".product__panel_plus").parentElement.previousElementSibling.textContent);

        costOfOrdering.innerHTML = `${oldText}${cost} ${allPizzas[0][2][allPizzas[0][2].length - 1]}`;
    }
    
    if (event.target.closest(".product__cancel")){
        cost -= parseInt(event.target.closest(".product__cancel").previousElementSibling.previousElementSibling.textContent);

        costOfOrdering.innerHTML = `${oldText}${cost} ${allPizzas[0][2][allPizzas[0][2].length - 1]}`;

        event.target.closest(".product__cancel").parentElement.remove();
    }

})
