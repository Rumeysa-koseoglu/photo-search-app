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
    searchButton.addEventListener("click", hideClearButton);
    searchInput.addEventListener("input", handleInputChange);
}

function handleInputChange() {
    const value = searchInput.value.trim();
    
    if (value === "") {
        clearButton.classList.add("hide");
        searchButton.classList.remove("hide");
    }
}

function hideClearButton(e) {
const value = searchInput.value.trim();
if (value !== "") {
    searchButton.classList.add("hide");
    clearButton.classList.remove("hide");
}else {
    showAlert("info", "Please enter a word");
}
}

//this function empties the contents of the search input when clear button is clicked
function clear() {
    searchInput.value = ""
    clearButton.classList.add("hide");
  searchButton.classList.remove("hide");
}

function search(e) {
    const searchInputvalue = searchInput.value.trim();
    //gets each child element that contains the search results, deletes each child (images in search results)
    Array.from(imageListWrapper.children).forEach((child) => child.remove())

    //it retrieves images from Unsplash API based on the search term entered by the user and adds them to the interface
    fetch(`https://api.unsplash.com/search/photos?query=${searchInputvalue}`, {
        method: "GET",
        headers: {
            authorization: "Client-ID CIgmCunSZsBKuT1nvsCER-Vj5QYoRMg8x5dLvWNLetw"
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
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = "400";
    img.width = "400";

    div.appendChild(img);
    imageListWrapper.appendChild(div);
}

function showAlert(type, message) {
    const body = document.querySelector("body")

    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.role = "alert";
    div.textContent = message;

    body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
    clearButton.classList.add("hide"); // sayfa ilk açıldığında clear gizli olsun
    searchButton.classList.remove("hide"); // search görünsün
    searchInput.value = ""; // input temizlensin (opsiyonel ama önerilir)
  });