let resp;
let cartProducts = JSON.parse(localStorage.getItem("storeproducts"));
let elementQuantity = document.querySelector(".js-items");
let items = 0;
if (cartProducts) {
    Object.keys(cartProducts).forEach((key) => {
        items += cartProducts[key]
    });
    ``
    elementQuantity.innerHTML = `${items}`
}

function update() {
    localStorage.setItem("storeproducts", JSON.stringify(cartProducts));
    elementQuantity.innerHTML = `${items}`
}
async function getitems(order_id) {
    let response = await fetch(`http://127.0.0.1:8000/items/${order_id}`)
    resp = await response.json()
}
let order_id = JSON.parse(localStorage.getItem('order_id'));
//getitems(order_id[0]);
Object.keys(order_id).forEach(key => {
    getitems(order_id[key]);
});