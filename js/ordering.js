const blockOfBoughtProducts = document.querySelector(".content__bought-products");
const costOfOrdering = document.querySelector(".content__cost");
const oldText = costOfOrdering.innerHTML;

// Количество пицц
const orders = document.querySelector("#orders");
orders.textContent = `Оформить заказ(${localStorage.getItem("count")})`;

// Получение всех продуктов
const allProducts = JSON.parse(localStorage.getItem("allProducts"));

// Получение купленных продуктов
const boughtProducts = JSON.parse(localStorage.getItem("boughtProducts"));

//Вычисление стоимости заказа
let cost = 0;
for (const element of boughtProducts) {
    if (!!element.index) cost += allProducts[Number(element.index)].price.default
}
costOfOrdering.textContent = `${oldText} ${cost} ₽`


// Заполнение корзины
function addElement(index){
    blockOfBoughtProducts.insertAdjacentHTML(
        'beforeend',
        `<div class = "content__product product">
            <div class = "product__image">
                <img src = ${allProducts[index].img}> </div>
            <div class = "product__about">
                <h2 class = "product__title">${allProducts[index].name}</h2>
                <span class = "product__text">30см</span>
            </div>
            <div class="product__cost">${allProducts[index].price.default} ₽</div>
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
    if (!!element.index) addElement(Number(element.index));
}


//Удаление пиццы и обновление хранилища
function deleteProduct(product){
    for (const i in boughtProducts) {
        if(boughtProducts[i].index == product) boughtProducts.splice(i, 1);
    }
    localStorage.setItem("boughtProducts", JSON.stringify(boughtProducts));

    localStorage.setItem("count", localStorage.getItem("count") - 1);
    orders.textContent = `Оформить заказ(${localStorage.getItem("count")})`;
}


let count, indexOfProduct;
blockOfBoughtProducts.addEventListener("click", function(event){
    //минус
    if (event.target.closest(".product__panel_minus")){
        indexOfProduct = event.target.closest(".product__panel_minus").parentElement.id;

        cost -= allProducts[indexOfProduct].price.default;
        costOfOrdering.innerHTML = `${oldText}${cost} ₽`;

        count = --boughtProducts.find(item => item.index == indexOfProduct).count;

        if (count == 0) {
            deleteProduct(indexOfProduct);
            event.target.closest(".product__panel_minus").parentElement.parentElement.remove();
            
        }
        else{
            event.target.closest(".product__panel_minus").nextElementSibling.textContent = count;
        }

    }
    // Плюс
    if (event.target.closest(".product__panel_plus")) {
        indexOfProduct = event.target.closest(".product__panel_plus").parentElement.id;

        count = ++boughtProducts.find(item => item.index == indexOfProduct).count;
        event.target.closest(".product__panel_plus").previousElementSibling.textContent = count;

        cost += allProducts[indexOfProduct].price.default
        costOfOrdering.innerHTML = `${oldText}${cost} ₽`;
        
    }
    // Удаление
    if (event.target.closest(".product__cancel")){
        indexOfProduct = event.target.closest(".product__cancel").previousElementSibling.id;

        count = boughtProducts.find(item => item.index == indexOfProduct).count;
        cost -= allProducts[indexOfProduct].price.default * count;

        costOfOrdering.innerHTML = `${oldText}${cost} ₽`;

        event.target.closest(".product__cancel").parentElement.remove();
        deleteProduct(indexOfProduct);
    }
})


// работа с формой
const withoutPatronymic = document.querySelector("[name=withoutPatronymic]");
const patronymic = document.querySelector("[name=patronymic]");
withoutPatronymic.addEventListener("click", function () {
    if (withoutPatronymic.checked) patronymic.setAttribute("disabled", "disabled");
    else patronymic.removeAttribute("disabled");
})

const withoutFlat = document.querySelector("[name=withoutFlat]");
const flat = document.querySelector("[name=flat]");
withoutFlat.addEventListener("click", function () {
    if (withoutFlat.checked) flat.setAttribute("disabled", "disabled");
    else flat.removeAttribute("disabled");
})

const buttonSubmit = document.querySelector(".content__form-submit");

function createNote(text){
    let note = document.createElement("div");
    note.classList.add("note");
    note.textContent = text;
    buttonSubmit.before(note);
}

// проверка длины тех или инх значений
function check(order){
    // Удаление старых замечаний
    let oldNotes = document.querySelectorAll(".note");
    if(oldNotes.length){
        for (const element of oldNotes) {
            element.remove();
        }
    }
    
    let isRight = true, minLength = 2;
    if (order.details.user.firstname < minLength){
        createNote("длина имени должна быть не менее двух букв");
        isRight = false;
    }
    if (order.details.user.lastname < minLength){
        createNote("длина фамилии должна быть не менее двух букв");
        isRight = false;
    }
    if (order.details.address.city < minLength) {
        createNote("длина названия города должна быть не менее двух букв");
        isRight = false;
    }
    if (order.details.address.street < minLength) {
        createNote("длина названия улицы должна быть не менее двух букв");
        isRight = false;
    }
    if (order.details.address.house < minLength-1) {
        createNote("длина номера дома должна быть не менее двух букв");
        isRight = false;
    }
    if (order.details.address.apartment < minLength-1) {
        createNote("длина номера квартиры должна быть не менее двух букв");
        isRight = false;
    }
    return isRight;
}

async function sendingForm(order){
    let response = await fetch('https://shift-winter-2023-backend.onrender.com/api/pizza/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(order)
    });

    if (response.ok){
        const answer = document.querySelector(".answer");
        answer.style.display = "flex";
    }
}

function AddProduct(index){
    this.id = index+1;
    this.size = "small";
    this.crust = "cheesy"
}

buttonSubmit.addEventListener("click", function(){
    let order = {
        pizzas:[],
        details: {
            user: {
                firstname: document.querySelector("[name=firstName]").value,
                lastname: document.querySelector("[name=lastName]").value,
                birthdate: document.querySelector("[name=dateOfBirth]").value,
            },
            address:{
                city: document.querySelector("[name=city]").value,
                street: document.querySelector("[name=street]").value,
                house: document.querySelector("[name=house]").value,
                apartment: document.querySelector("[name=flat]").value,
                comment: document.querySelector("[name=comment]").value,
            }
        }
    }

    order.details.user.registrationAddress = JSON.stringify(order.details.address);

    // если человек заказл несколько продуктов одного типа, то они просто добавятся последовательно
    for (const element of boughtProducts) {
        for (let i = 0; i < element.count; i++) {
            order.pizzas.push(new AddProduct(+element.index));
        }
    }

    if(check(order)){
       sendingForm(order);
    }

})
