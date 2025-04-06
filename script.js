const formwrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

function clear() {
    searchInput.value = ""
}

function search(e) {
    const searchInputvalue = searchInput.value.trim();
    Array.from(imageListWrapper.children).forEach((child) => child.remove())

    fetch(`https://api.unsplash.com/search/photos?query=${searchInputvalue}`, {
        method : "GET",
        headers : {
            authorization : "Client-ID CIgmCunSZsBKuT1nvsCER-Vj5QYoRMg8x5dLvWNLetw"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        Array.from(data.results).forEach((image) => {
            addImageToUI(image.urls.small)
        })
    })
    .catch((err) => console.log(err));

    e.preventDefault();
}

function addImageToUI(url) {
    const div =document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = "400";
    img.width = "400";

    div.appendChild(img);
    imageListWrapper.appendChild(div);
}