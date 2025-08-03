let inputText = document.getElementById("inputText")
let convertButton = document.getElementById("convertButton")
let resultText = document.getElementById("resultText")
let emptyString = []
convertButton.addEventListener("click", function() {
    console.log(inputText.value.toUpperCase());
    let div = document.createElement("div")
    div.innerText = inputText.value.toUpperCase()
    resultText.appendChild(div)
    emptyString.push(inputText.value.toUpperCase())
    let textFromLocalStorage = JSON.parse(localStorage.getItem("input"))
    if (textFromLocalStorage === null) {
        textFromLocalStorage =  []
    }
    textFromLocalStorage.push(inputText.value.toUpperCase())
    localStorage.setItem("input",JSON.stringify(textFromLocalStorage))
    //localStorage.setItem("input",JSON.stringify(emptyString))
    inputText.value = ""
})