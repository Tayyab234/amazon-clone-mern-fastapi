/*const checkout_product = [{
    delivery_data: {
        day: "",
        month: "",
        date: 21
    }
}]*/
import { products, loaddata } from "./product.js"
await loaddata();
let element = document.querySelector(".js-order-summary");
let cartProducts = JSON.parse(localStorage.getItem("storeproducts"));
let elementQuantity = document.querySelector(".js-items");
let items = 0;
let shipping = JSON.parse(localStorage.getItem("shipping")) || {};

function update() {
    localStorage.setItem("storeproducts", JSON.stringify(cartProducts));
    localStorage.setItem("shipping", JSON.stringify(shipping));
    elementQuantity.innerHTML = `${items} items`
}
if (cartProducts) {

    Object.keys(cartProducts).forEach((key) => {
        items += cartProducts[key]
    });
    ``
    elementQuantity.innerHTML = `${items} items`
}

function matchproducts(product) {
    let match = 0;
    Object.keys(cartProducts).forEach((id) => {

        if (id === product.id) {
            match = 1;
            return;
        }
    });
    return match;
}

let filterproducts = products.filter((product) => {
    return matchproducts(product)
});

filterproducts.forEach((product, index) => {
    if (!shipping[`delivery-option-${index}`])
        shipping[`delivery-option-${index}`] = "9";
});
update();





function display() {
    filterproducts.forEach((product, index) => {
        let quantity = cartProducts[product.id];
        element.innerHTML += `
        <div class="cart-item-container js-container-${index} " >
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image" src=${product.image}>
                <div class="cart-item-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-price">
                        $${(product.priceCents/100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                        <span class="js-quantity-${index}">
            Quantity: <span class="quantity-label">${quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update">
            Update
          </span>
                        <span class="delete-quantity-link link-primary js-delete" data-id="${product.id}">
            Delete
          </span>
                    </div>
                </div>
              ${dilveryoption(index)}

            </div>
        </div>
        `;

    });
}
display();

function cartvalue(index, value) {

    if (shipping[`delivery-option-${index}`] == value)
        return true;
    else
        return false;
}

function dilveryoption(index) {
    const html = `
    <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio"  class="delivery-option-input" ${cartvalue(index, 9) ? "checked" : ""} name="delivery-option-${index}" value="9">
            <div>
                <div class="delivery-option-date">
                    ${dayjs().add(9,'day').format('dddd, MMMM D')}
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${index}"  ${cartvalue(index, 3) ? "checked" : ""} value="3">
            <div>
                <div class="delivery-option-date">
                   ${dayjs().add(3,'day').format('dddd, MMMM D')}
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${index}"  ${cartvalue(index, 1) ? "checked" : ""} value="1">
            <div>
                <div class="delivery-option-date">
                  ${dayjs().add(1,'day').format('dddd, MMMM D')}
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
            </div>
        </div>
    </div>
    `
    return html;

}

/*document.querySelectorAll(".js-delete").forEach((dbtn, index) => {
    dbtn.addEventListener("click", () => {
        let delElement = document.querySelector(`.js-container-${index}`);
        let product = filterproducts[index];
        items = items - cartProducts[product.id];
        delete cartProducts[product.id];
        filterproducts.splice(index, 1);
        update();
        delElement.remove();
        // display();
    });

});*/

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-delete")) {
        const btn = e.target;
        const id = btn.dataset.id;
        let index = filterproducts.findIndex(p => p.id == id);
        let delElement = btn.closest(`.cart-item-container`);
        let product = filterproducts[index];
        items = items - cartProducts[product.id];
        delete cartProducts[product.id];
        filterproducts.splice(index, 1);
        update();
        delElement.remove();
        //display();
    }
});
document.querySelectorAll(".js-update").forEach((ubtn, index) => {

    let isEditing = false;

    ubtn.addEventListener("click", () => {

        let element2 = document.querySelector(`.js-quantity-${index}`);

        if (!isEditing) {
            // 👉 Enter edit mode
            let quantity = cartProducts[filterproducts[index].id];

            items -= quantity;

            element2.innerHTML = `
                Quantity: 
                <input  
                    type="number"  
                    class="quantity-input js-input-${index}"  
                    value="${quantity}"  
                    min="1" 
                />
            `;

            ubtn.innerHTML = "Save";
            isEditing = true;

        } else {
            // 👉 Save mode
            let input = document.querySelector(`.js-input-${index}`);
            let newval = Number(input.value);

            items += newval;

            let product = filterproducts[index];
            cartProducts[product.id] = newval;

            update();

            element2.innerHTML = `
                Quantity: 
                <span class="quantity-label">${newval}</span>
            `;

            ubtn.innerHTML = "update";
            isEditing = false;
        }
    });
});
/*document.querySelectorAll(".js-update").forEach((ubtn, index) => {
    ubtn.addEventListener("click", () => {
        let quantity;
        filterproducts.forEach((product, ind) => {
            if (ind === index) {
                quantity = cartProducts[product.id];
                items = items - quantity;
                console.log(items);
            }
        });
        let element2 = document.querySelector(`.js-quantity-${index}`)

        element2.innerHTML = ` Quantity: <input  type="number"  class="quantity-input"  value="${quantity}"  min="1" />`
        ubtn.innerHTML = `save`;
        ubtn.addEventListener("click", () => {
            let element3 = document.querySelector(".quantity-input")
            console.log(element3);
            let newval = Number(element3.value);
            items += newval;
            console.log(items, newval);
            filterproducts.forEach((product, ind) => {
                if (ind === index) {
                    cartProducts[product.id] = newval;
                    //items += newval;
                }
            });
            update();
            element2.innerHTML = `<span class="js-quantity-${index}">
      Quantity: <span class="quantity-label">${newval}</span>`
            ubtn.innerHTML = `update`;

        })
    })

});*/
document.querySelectorAll(".delivery-date").forEach((dateelement, i) => {
    let radios = document.querySelectorAll(`input[name="delivery-option-${i}"]`);
    radios.forEach(radio => {
        let selected = document.querySelector(`input[name="delivery-option-${i}"]:checked`);
        dateelement.innerHTML = `${dayjs().add(Number(selected.value), 'day').format('dddd, MMMM D')}`;
        radio.addEventListener('change', () => {
            selected = document.querySelector(`input[name="delivery-option-${i}"]:checked`);
            dateelement.innerHTML = `${dayjs().add(Number(selected.value), 'day').format('dddd, MMMM D')}`;
            shipping[`delivery-option-${i}`] = Number(selected.value);
            update();
            calculatemoney();
            orderdisplay();
        });
    });

});
console.log(typeof cartProducts);


//------------------------------------------------------------------------------------------------------------------
let itemMoney = 0;
let shippingMoney = 0;
let total = 0;
let tax = 0;
let grandTotal = 0;

function calculatemoney() {
    itemMoney = shippingMoney = total = tax = grandTotal = 0;
    filterproducts.forEach((product, index) => {
        itemMoney += product.priceCents;
        let value = shipping[`delivery-option-${index}`];
        if (value == 3)
            shippingMoney += 499;
        else if (value == 1)
            shippingMoney += 999;
    });
    total = shippingMoney + itemMoney;
    tax = Math.round(total * 0.10);
    grandTotal = total + tax;

}


function orderdisplay() {
    let ordersummary = document.querySelector(".payment-summary");
    ordersummary.innerHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>
    <div class="payment-summary-row">
        <div>Items ${items}:</div>
        <div class="payment-summary-money">$${(itemMoney/100).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(shippingMoney/100).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(total/100).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(grandTotal/100).toFixed(2)}</div>
    </div>
    <button class="place-order-button button-primary">
    Place your order
    </button>
 `
}
calculatemoney();
orderdisplay();