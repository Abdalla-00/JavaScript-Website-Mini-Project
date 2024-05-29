// Global
const galleryImages = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    },
    {
        src: "./assets/gallery/img1.png",
        alt: "Thumbnail Image 1"
    },

];

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
];

// Menu Section

function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

function celsiusToFahr(temp) {
    return (temp * 9 / 5) + 32;
}

//Greeting Section
function greetingHandler() {
    const greetingText = "Good Morning";
    const weatherCondition = "Sunny";
    const userLocation = "New York";
    let temperature = 35.8763;
    let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside.`;
    let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;

    document.querySelector("#greeting").innerHTML = greetingText;
    document.querySelector("p#weather").innerHTML = celsiusText;

    document.querySelector(".weather-group").addEventListener("click", function (e) {

        if (e.target.id === "celsius") {
            document.querySelector("p#weather").innerHTML = celsiusText;
        }
        else if (e.target.id) {
            document.querySelector("p#weather").innerHTML = fahrText;
        }
    });

}

// Clock Section
function clockHandler() {
    setInterval(function () {
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0");
    }, 1000);
}

// Gallery Section
function galleryHandler(){
    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");

    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;

    galleryImages.forEach(function (image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = false;

        thumb.addEventListener("click", function (e) {
            mainImage.src = e.target.src;
            mainImage.alt = e.target.alt;

            //set all imgs false
            thumbnails.querySelectorAll("img").forEach(function (img) {
                img.dataset.selected = false;
            });
            e.target.dataset = true;
        });
        thumbnails.appendChild(thumb);
    });
}

function productHandler(){

    let freeProducts = products.filter(function(obj){
        return !obj.price || obj.price <= 0;
    });

    let paidProducts = products.filter(function(obj){
        return obj.price > 0;
    });

    //Initial load
    populateProducts(products);

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;
    
    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e){
        console.log(e.target);
        if (e.target.id === "paid") populateProducts(freeProducts);
        else if (e.target.id === "free") populateProducts(paidProducts);
        else populateProducts(products);

    });

}

function populateProducts(productList){

    let productsSection = document.querySelector(".products-area");
    productsSection.textContent = "";

    // Run loop over each product to create HTML element ("product-item")
    productList.forEach(function(product, index){

            //Create HTML element for individual product
            let prodElm = document.createElement("div");
            prodElm.classList.add("product-item");
            productsSection.append(prodElm);
    
            //Create image HTML element 
            let prodImg = document.createElement("img");
            prodImg.src = product.image;
            prodImg.alt = "Image for " + product.title;
            prodElm.append(prodImg);
    
            //Create HTML elementt for product deatils
            let prodDetails = document.createElement("div");
            prodDetails.classList.add("product-details");
            prodElm.append(prodDetails);
    
            //title
            let prodTitle = document.createElement("h3");
            prodTitle.classList.add("product-title");
            prodTitle.innerHTML = product.title;
            prodDetails.append(prodTitle);
    
            //Author
            let prodAuthor = document.createElement("p");
            prodAuthor.classList.add("product-author")
            prodAuthor.innerText = product.author;
            prodDetails.append(prodAuthor);
    
            //Price Title
            let priceTitle = document.createElement("p");
            priceTitle.classList.add("price-title");
            priceTitle.innerText = "Price";
            prodDetails.append(priceTitle);
    
            //Product Price
            let prodPrice = document.createElement("p");
            prodPrice.classList.add("product-price");
            prodPrice.innerText =  product.price > 0 ? "$" + product.price.toFixed(2) : "Free";
            prodDetails.append(prodPrice);
    
    
    });

}


// Page Loader
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productHandler();