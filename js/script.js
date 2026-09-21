// ===============================
// ADD PRODUCT TO CART
// ===============================

let buttons = document.querySelectorAll(".product-card button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let card = button.closest(".product-card");

        let product = {
            name: card.querySelector("h2").innerText,
            price: parseInt(
                card.querySelector("h3").innerText
                    .replace("₹", "")
                    .replace(",", "")
            ),
            image: card.querySelector("img").getAttribute("src"),
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(product.name + " added to cart!");

    });

});


// ===============================
// DISPLAY CART
// ===============================

let cartItems = document.getElementById("cart-items");

if (cartItems) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        let total = 0;

        cart.forEach(function(product, index) {

            // For older products that don't have quantity
            if (!product.quantity) {
                product.quantity = 1;
            }

            let subtotal = product.price * product.quantity;

            total = total + subtotal;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <img src="${product.image}" width="150">

                    <h2>${product.name}</h2>

                    <p>
                        Price: ₹${product.price.toLocaleString("en-IN")}
                    </p>

                    <div class="quantity">

                        <button onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>${product.quantity}</span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <p>
                        Subtotal: ₹${subtotal.toLocaleString("en-IN")}
                    </p>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>
            `;
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        document.getElementById("cart-total").innerText =
            "Total: ₹" + total.toLocaleString("en-IN");
    }
}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
    }
}
// ===============================
// PLACE ORDER
// ===============================

function placeOrder() {

    alert("Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "order-success.html";
}