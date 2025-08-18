const data = JSON.parse(localStorage.getItem("input")) || [];
const listElement = document.getElementById("list");
data.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    listElement.appendChild(li);
});