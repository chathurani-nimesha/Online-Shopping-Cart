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
