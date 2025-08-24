var url = new URL(window.location.href);
var productId = url.searchParams.get("productId");
var product = products.find(p => p.id == productId);
if (product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = "Price: " + product.price;
    document.getElementById("product-image").src = product.image;
    document.getElementById("category").textContent = "Category: " + product.category;
}