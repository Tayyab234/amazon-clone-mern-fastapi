let products;
element = document.querySelector(".js-products-grid");
quantity = document.querySelector(".js-quantity");
let cartCount = 0
async function loaddata() {
    const res = await fetch("backend/products.json");
    products = await res.json();
    fetch("backend/products.json")

    products.forEach((product) => {
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
        <select>
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
    <div class="product-spacer"></div>
    <div class="added-to-cart">
        <img src="images/icons/checkmark.png"> Added
    </div>
    <div class="d1">
        <button class="add-to-cart-button button-primary js-cart">
        Add to Cart
        </button>
        
    </div>
    </div>
    `


    });

}

function added(element3) {
    element3.innerHTML += `<div class="d2"><img src="images/icons/checkmark.png" class="img_ch">Added</div>`
    setTimeout(() => {
        element3.innerHTML = `<button class="add-to-cart-button button-primary js-cart">
Add to Cart
</button>`

    }, 2000);
}
async function main() {
    await loaddata();
    element3 = document.querySelector(".d1");
    document.querySelectorAll(".js-cart").forEach((btn) => {
        btn.addEventListener("click", () => {
            quantity.innerHTML = ++cartCount;
            added(element3);
        })
    })
}
main();