import { products, loaddata } from "./product.js";
let element = document.querySelector(".js-products-grid");
let quantity = document.querySelector(".js-quantity");
const store_products = JSON.parse(localStorage.getItem("storeproducts")) || {};
let cartCount = 0;
if (store_products) {
    Object.keys(store_products).forEach(key => {
        cartCount += store_products[key];
    });
    if (quantity)
        quantity.innerHTML = cartCount;
}

function update() {
    localStorage.setItem("storeproducts", JSON.stringify(store_products));
}
async function productGrid() {
    await loaddata();
    products.forEach((product, index) => {
        element.innerHTML += `
    <div class="product-container">
    <div class="product-image-container">
        <img class="product-image" src=${product.image}>
    </div>
    <div class="product-name limit-text-to-2-lines">
        ${product.name}
    </div>
    <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
    </div>
    <div class="product-price">
        $${(product.priceCents/100).toFixed(2)}
    </div>
    <div class="product-quantity-container">
        <select class="selection">
  <option selected value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
</select>
    </div>

    <div class="d1">
        <button class="add-to-cart-button button-primary js-cart">
        Add to Cart
        </button>
        <div class="d2"></div>
        
    </div>
    </div>
    `


    });

}

function added(element3) {
    element3.innerHTML = `<img src="images/icons/checkmark.png" class="img_ch">Added`
        /*const msg = document.createElement("div");
        msg.className = "d2";
        msg.innerHTML = `
            <img src="images/icons/checkmark.png" class="img_ch">Added
        `;
        element3.appendChild(msg);*/
    setTimeout(() => {
        element3.innerHTML = '';

    }, 2000);
}
async function main() {
    await productGrid();

    document.querySelectorAll(".js-cart").forEach((btn, index) => {
        btn.addEventListener("click", () => {

            document.querySelectorAll(".selection").forEach((element, ind) => {
                if (index === ind) {
                    cartCount += Number(element.value);
                    quantity.innerHTML = cartCount;
                    store_products[products[ind].id] =
                        (store_products[products[ind].id] || 0) + Number(element.value);
                    update();

                }

            })

            document.querySelectorAll(`.d2`).forEach((element3, ind) => {
                if (index === ind) {
                    added(element3);
                }
            });

        })

    });
}
main();