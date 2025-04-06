const formwrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

//by calling this function, we initialize the event listeners
runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

//this function empties the contents of the search input when clear button is clicked
function clear() {
    searchInput.value = ""
}

function search(e) {
    const searchInputvalue = searchInput.value.trim();
    //gets each child element that contains the search results, deletes each child (images in search results)
    Array.from(imageListWrapper.children).forEach((child) => child.remove())

    //it retrieves images from Unsplash API based on the search term entered by the user and adds them to the interface
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

//function that creates a card with the given image url, and adds it to the UI
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