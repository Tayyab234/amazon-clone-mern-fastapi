let cartProducts = JSON.parse(localStorage.getItem("storeproducts")) || {};
let elementQuantity = document.querySelector(".js-items");
let items = 0;
if (cartProducts) {
    Object.keys(cartProducts).forEach((key) => {
        items += cartProducts[key]
    });
    ``
    elementQuantity.innerHTML = `${items}`
}
let element = document.querySelector('.order-tracking');
let product = JSON.parse(localStorage.getItem('track'));
element.innerHTML = `
<a class="back-to-orders-link link-primary" href="orders.html">
   View all orders
</a>
<div class="delivery-date">
    Arriving on ${product.arrival}
</div>
<div class="product-info">
    ${product.name}
</div>
<div class="product-info">
    Quantity: ${product.quantity}
</div>
<img class="product-image" src=${product.img}>
<div class="progress-labels-container">
    <div class="progress-label">
        Preparing
    </div>
    <div class="progress-label current-status">
        Shipped
    </div>
    <div class="progress-label">
        Delivered
    </div>
</div>
<div class="progress-bar-container">
    <div class="progress-bar"></div>
</div>

`