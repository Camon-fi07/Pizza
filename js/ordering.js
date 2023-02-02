const blockOfBoughtProducts = document.querySelector(".content__bought-products");
const costOfOrdering = document.querySelector(".content__cost");
const oldText = costOfOrdering.innerHTML;

// Количество пицц
const orders = document.querySelector("#orders");
orders.textContent = `Оформить заказ(${localStorage.getItem("count")})`;

//Обрабокта всех пицц
let allProducts = [];
const countOfProducts = Number(localStorage.getItem("countOfProducts"));
for (let index = 0; index < countOfProducts; index++) {
    allProducts.push(JSON.parse(localStorage.getItem(index)));
}

// Обработка купленных пицц
let boughtProducts = localStorage['boughtProducts'].split(",");
for (const i in boughtProducts) {
    boughtProducts[i] = {
        count: 1,
        index:boughtProducts[i],
    }
}

//Вычисление стоимости заказа
let cost = 0;
for (const element of boughtProducts) {
    if (element.index != "") cost += allProducts[Number(element.index)].cost;
}
costOfOrdering.textContent = `${oldText} ${cost} ₽`


// Заполнение корзины
function addElement(index){
    blockOfBoughtProducts.insertAdjacentHTML(
        'beforeend',
        `<div class = "content__product product">
            <div class = "product__image">
                <img src = ${allProducts[index].image}> </div>
            <div class = "product__about">
                <h2 class = "product__title">${allProducts[index].name}</h2>
                <span class = "product__text">${allProducts[index].size}</span>
            </div>
            <div class="product__cost">${allProducts[index].cost} ₽</div>
            <div id = "${index}" class="product__panel">
                <button class="product__panel_minus">-</button>
                <span>1</span>
                <button class="product__panel_plus">+</button>
            </div>
            <button class="product__cancel">+</button>
        </div>
        `
    )
}

for (const element of boughtProducts) {
    if (element.index != "") addElement(Number(element.index));
}


//Удаление пиццы и обновление хранилища
function deleteProduct(product){
    for (const i in boughtProducts) {
        if(boughtProducts[i].index == product) boughtProducts.splice(i, 1);
    }

    let newBoughtProducts = [];
    for (const element of boughtProducts) {
        newBoughtProducts.push(element.index);
    }
    localStorage.setItem("boughtProducts", newBoughtProducts.join(","));

    localStorage.setItem("count", localStorage.getItem("count") - 1);
    orders.textContent = `Оформить заказ(${localStorage.getItem("count")})`;
}


let count, indexOfProuct;
blockOfBoughtProducts.addEventListener("click", function(event){
    //минус
    if (event.target.closest(".product__panel_minus")){
        indexOfProuct = event.target.closest(".product__panel_minus").parentElement.id;

        cost -= allProducts[indexOfProuct].cost;
        costOfOrdering.innerHTML = `${oldText}${cost} ₽`;

        count = --boughtProducts.find(item => item.index == indexOfProuct).count;

        if (count == 0) {
            deleteProduct(indexOfProuct);
            event.target.closest(".product__panel_minus").parentElement.parentElement.remove();
            
        }
        else{
            event.target.closest(".product__panel_minus").nextElementSibling.textContent = count;
        }

    }
    // Плюс
    if (event.target.closest(".product__panel_plus")) {
        indexOfProuct = event.target.closest(".product__panel_plus").parentElement.id;

        count = ++boughtProducts.find(item => item.index == indexOfProuct).count;
        event.target.closest(".product__panel_plus").previousElementSibling.textContent = count;

        cost += allProducts[indexOfProuct].cost
        costOfOrdering.innerHTML = `${oldText}${cost} ₽`;
        
    }
    // Удаление
    if (event.target.closest(".product__cancel")){
        indexOfProuct = event.target.closest(".product__cancel").previousElementSibling.id;

        count = boughtProducts.find(item => item.index == indexOfProuct).count;
        cost -= allProducts[indexOfProuct].cost * count;

        costOfOrdering.innerHTML = `${oldText}${cost} ₽`;

        event.target.closest(".product__cancel").parentElement.remove();
        deleteProduct(indexOfProuct);
    }
})