// DOM Selectors
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photoArray = [];
let ready = false;
let totalImage = 0;
let imagesLoaded = 0;

// To check if all image were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImage) {
    ready = true;
    loader.hidden = true;
    imagesLoaded = 0;
  }
}

// Display photos to DOM
function displayPhoto() {
  totalImage = photoArray.length;
  photoArray.forEach((image) => {
    const item = document.createElement("a");
    item.setAttribute("href", image.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", image.urls.regular);
    img.setAttribute("alt", image.alt_description);
    img.setAttribute("title", image.alt_description);

    // Load listner
    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Unsplash API
const count = 30;
const API_KEY = "rMbEs3DDGAPSK_w4pyiNf8hdiGhiC-sQIBLMQl8sivk";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;

//--*-- Fetch Photos form unsplash API
async function getPhotos() {
  const response = await fetch(apiURL);
  try {
    photoArray = await response.json();

    displayPhoto();
  } catch (err) {
    alert(err);
  }
}

// Scroll Listener
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

// load function
getPhotos();
