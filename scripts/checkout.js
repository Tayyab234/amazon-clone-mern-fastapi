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

function update() {
    localStorage.setItem("storeproducts", JSON.stringify(cartProducts));
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

function display() {
    filterproducts.forEach((product, index) => {
        let quantity = cartProducts[product.id];
        element.innerHTML += `
        <div class="cart-item-container js-container-${index}">
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
                        <span class="delete-quantity-link link-primary js-delete">
            Delete
          </span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input" name="delivery-option-${index}">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${index}">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${index}">
                        <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

    });
}
display();

document.querySelectorAll(".js-delete").forEach((dbtn, index) => {
    dbtn.addEventListener("click", () => {
        let delIndex;
        let delElement = document.querySelector(`.js-container-${index}`);
        filterproducts.forEach((product, ind) => {
            if (ind === index) {
                delIndex = ind;
                items = items - cartProducts[product.id];
                delete cartProducts[product.id];
                update();
            }
        });
        if (delIndex)
            filterproducts.splice(delIndex, 1);

        delElement.remove();
        display();
    });

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