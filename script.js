const carousel = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const imageUrls = [
    "https://foodish-api.com/images/burger/burger50.jpg",
    "https://foodish-api.com/images/burger/burger79.jpg",
    "https://foodish-api.com/images/burger/burger27.jpg"
];

let index = 0;

function showSlide(i) {
    index = (i + items.length) % items.length;
    carousel.style.transform = `translateX(${-index * 100}%)`;
}

prevButton.addEventListener('click', () => showSlide(index - 1));
nextButton.addEventListener('click', () => showSlide(index + 1));
setInterval(() => showSlide(index + 1), 2000);

function fetchImage(id, url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.url;
      })
      .then(result => {
        const imageUrl = (result);
        const feed = document.getElementById(id);
        feed.innerHTML = `<img src="${imageUrl}" alt="Burger" />`;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        const feed = document.getElementById(id);
        feed.innerHTML = `<p>Error loading image</p>`;
      });
  }
  
  imageUrls.forEach((url, idx) => fetchImage(`feed${idx + 1}`, url));
  