// console.log("Hi");

const API_URL ="https://fakestoreapi.com/products";

let products= [];

let cart =[];

async function loadProducts() {
    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        products =data;
        console.log(products);

        displayProducts();
        
    }catch(error){
        console.error("Error loading products: ",error);
    }
}


function displayProducts(){
    let productHTML="";

    products.forEach(function(product){
        productHTML += `
             <div class="col-12 col-sm-6 col-lg-3">

                <div class="card h-100 shadow-sm">

                    <img
                        src="${product.image}"
                        class="card-img-top product-img"
                        alt="${product.title}"
                    >

                    <div class="card-body d-flex flex-column">

                        <h5 class="card-title">
                            ${product.title}
                        </h5>

                        <p class="card-text text-secondary">
                            ${product.description}
                        </p>

                        <h5 class="text-success">
                            $${product.price.toFixed(2)}
                        </h5>

                        <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>

                    </div>
                </div>

            </div>
        `;
    });
    document.getElementById("productList").innerHTML = productHTML;
}

loadProducts();

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    displayCart();
}

function displayCart() {

    let cartHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(function(item) {

        const subtotal = item.price * item.quantity;

        total += subtotal;
        count += item.quantity;

        cartHTML += `
            <div class="card mb-3">
                <div class="card-body">

                    <h5>${item.title}</h5>

                    <p>
                        Price: $${item.price.toFixed(2)}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <p>
                        Subtotal: $${subtotal.toFixed(2)}
                    </p>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="removeFromCart(${item.id})">

                        Remove

                    </button>

                </div>
            </div>
        `;
    });

    document.getElementById("cartList").innerHTML =
        cartHTML || "<p>Your cart is empty.</p>";

    document.getElementById("cartCount").textContent = count;

    document.getElementById("cartTotal").textContent =
        total.toFixed(2);
}

function removeFromCart(productId) {

    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    displayCart();
}

document.getElementById("clearCartButton")
    .addEventListener("click", function() {

        cart = [];

        displayCart();
    });


    document.getElementById("cartButton")
    .addEventListener("click", function() {

        document.getElementById("cartSection")
            .scrollIntoView({
                behavior: "smooth"
            });
    });