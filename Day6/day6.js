import {
  get,
  getDatabase,
  set,
  ref,
  onValue,
  update,
  remove,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaJ2vvQpxxLn4rf5QOvwklpE-qF5476zY",
  authDomain: "jsi41-c1052.firebaseapp.com",
  projectId: "jsi41-c1052",
  storageBucket: "jsi41-c1052.firebasestorage.app",
  messagingSenderId: "604648008255",
  appId: "1:604648008255:web:f73a72a0cbb1c5707da68a",
  measurementId: "G-2E4ZDNGQQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let inputImage = document.getElementById("input_image");
let inputCategory = document.getElementById("input_category")
let inputName = document.getElementById("input_name");
let inputDescription = document.getElementById("input_description");
let inputPrice = document.getElementById("input_price");
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function() {
    let product_id = window.uuidv4();
    set(ref(database, "products/" + product_id), {
        id: product_id,
        image: inputImage.value,
        category: inputCategory.value,
        name: inputName.value,
        description: inputDescription.value,
        price: inputPrice.value
    })
    alert("Add thanh cong")
})
let getAllBtn = document.getElementById("getAllBtn");
getAllBtn.addEventListener("click", function() {
    get(ref(database, "products/"))
    .then((snapShot) => {
        if (snapShot.exists()) {
            let products = Object.values(snapShot.val());
            console.log(products);
            const productList = document.querySelector('.productList');
            productList.innerHTML = '';
            products.forEach(product => {
                const card_item = document.createElement('div');
                card_item.style.border = '1px solid #000';
                card_item.style.margin = '5px';
                card_item.style.padding = '5px';
                card_item.innerHTML = `
                    <h3>${product.name}</h3>
                    <img src="${product.image}" alt="${product.name}" width="100">
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                `;
                productList.appendChild(card_item);
            });
        }
    });
});