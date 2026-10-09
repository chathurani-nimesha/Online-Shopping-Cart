// console.log("Hi");

const API_URL ="https://fakestoreapi.com/products";

let products= [];

async function LoadProducts() {
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

                        <button class="btn btn-primary mt-auto">
                            Add to Cart
                        </button>

                    </div>
                </div>

            </div>
        `;
    });
    document.getElementById("productList").innerHTML = productHTML;
}

LoadProducts();