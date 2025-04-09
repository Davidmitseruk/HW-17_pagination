const API_KEY = '49691874-76c1eab4356b4a44377f52682';
const API_URL = 'https://pixabay.com/api/';
const IMAGES_PER_PAGE = 12;

let currentPage = parseInt(localStorage.getItem('pixabayPage')) || 1;

const gallery = document.getElementById('image-gallery');
const loadMoreBtn = document.getElementById('load-more-btn');

async function fetchImages(page = 1) {
  try {
    const url = `${API_URL}?key=${API_KEY}&editors_choice=true&per_page=${IMAGES_PER_PAGE}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length > 0) {
      renderImages(data.hits);
    } else {
      loadMoreBtn.disabled = true;
      loadMoreBtn.innerText = "No more images";
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function renderImages(images) {
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    gallery.appendChild(img);
  });
}

function loadMoreImages() {
  currentPage++;
  localStorage.setItem('pixabayPage', currentPage);
  fetchImages(currentPage);
}

loadMoreBtn.addEventListener('click', loadMoreImages);

// Initial load
fetchImages(currentPage);