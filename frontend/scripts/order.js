// -------------------- CART --------------------
let cartProducts = JSON.parse(localStorage.getItem("storeproducts")) || {};
let elementQuantity = document.querySelector(".js-items");
let items = 0;

// calculate initial items
Object.values(cartProducts).forEach(qty => items += qty);
elementQuantity.innerHTML = items;

// update function
function updateCart() {
    localStorage.setItem("storeproducts", JSON.stringify(cartProducts));
    elementQuantity.innerHTML = items;
}

// -------------------- ORDERS --------------------
let element = document.querySelector('.orders-grid');
let orders = [];
let order_id = JSON.parse(localStorage.getItem('order_id')) || [];

// -------------------- DISPLAY --------------------
function displayHeader(order, orderIndex) {
    element.innerHTML += `
    <div class="order-container">
        <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${order.orderplaced}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${order.total}</div>
                </div>
            </div>
            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order._id}</div>
            </div>
        </div>

        <div class="order-details-grid">
            ${order.products.map((product, productIndex) => `
                <div class="product-image-container">
                    <img src="${product.img}">
                </div>

                <div class="product-details">
                    <div class="product-name">${product.name}</div>
                    <div class="product-delivery-date">
                        Arriving on: ${product.arrival}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>

                    <button 
                        class="buy-again-button button-primary js-buy-again"
                        data-order="${orderIndex}"
                        data-product="${productIndex}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <button 
                        class="track-package-button button-secondary js-track"
                        data-order="${orderIndex}"
                        data-product="${productIndex}">
                        Track package
                    </button>
                </div>
            `).join("")}
        </div>
    </div>
    `;
}

// -------------------- FETCH --------------------
async function getItems(orderId, index) {
    try {
        let response = await fetch(`http://127.0.0.1:8000/items/${orderId}`);
        let data = await response.json();

        orders[index] = data;
        displayHeader(data, index);

    } catch (err) {
        console.error("Error fetching order:", err);
    }
}

// load all orders (sequential to keep order safe)
async function loadOrders() {
    for (let [index, id] of order_id.entries()) {
        await getItems(id, index);
    }
}
loadOrders();

// -------------------- EVENT DELEGATION (BEST PRACTICE) --------------------
document.addEventListener('click', (e) => {

    // ---------- TRACK ----------
    const trackBtn = e.target.closest('.js-track');
    if (trackBtn) {
        const orderIndex = trackBtn.dataset.order;
        const productIndex = trackBtn.dataset.product;

        const product = orders[orderIndex].products[productIndex];
        localStorage.setItem('track', JSON.stringify(product));

        window.location.href = "tracking.html";
        return;
    }

    // ---------- BUY AGAIN ----------
    const buyBtn = e.target.closest('.js-buy-again');
    if (buyBtn) {
        const orderIndex = buyBtn.dataset.order;
        const productIndex = buyBtn.dataset.product;

        const product = orders[orderIndex].products[productIndex];

        // UI feedback
        if (buyBtn.timeoutId) {
            clearTimeout(buyBtn.timeoutId);
        }

        buyBtn.innerHTML = `<span class="buy-again-message">&#10003; Added</span>`;

        buyBtn.timeoutId = setTimeout(() => {
            buyBtn.innerHTML = `
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            `;
        }, 2000);

        // update cart
        items += 1;
        const id = product.id;
        cartProducts[id] = (cartProducts[id] || 0) + 1;

        updateCart();
    }
});