import getImagesByQuery from './js/pixabay-api';

import createGallery from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadBtn = document.querySelector('.loadBtn');

let page = 1;
let lastQuery = '';
let totalHits = 0;
const perPage = 15;

loadBtn.style.display = 'none';

form.addEventListener('submit', imageSearch);

function imageSearch(e) {
  e.preventDefault();
  const input = e.currentTarget;
  const queryValue = input.elements['search-text'].value.toLowerCase();

  if (queryValue !== lastQuery) {
    page = 1;
    document.querySelector('.gallery').innerHTML = '';
  }
  lastQuery = queryValue;

  getImagesByQuery(queryValue, page)
    .then(data => {
      if (data.hits.length === 0) {
        loadBtn.style.display = 'none';
        return iziToast.error({
          message: `Sorry, there are no images matching your ${queryValue}. Please try again!`,
        });
      }

      createGallery(data.hits);
      totalHits = data.totalHits;
      updateLoadBtnVisibility();
    })
    .catch(err => console.log('error catch', err));

  form.reset();
}

loadBtn.addEventListener('click', async () => {
  const data = await getImagesByQuery(lastQuery, page + 1);
  if (data.hits.length === 0) {
    loadBtn.style.display = 'none';
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }
  page += 1;
  createGallery(data.hits);
  totalHits = data.totalHits;
  updateLoadBtnVisibility();
  const allItems = document.querySelectorAll('.gallery-item');
  const firstNewIndex = (page - 1) * perPage;
  const firstNewItem = allItems[firstNewIndex];
  if (firstNewItem) {
    firstNewItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

function updateLoadBtnVisibility() {
  if (page * perPage >= totalHits || totalHits <= perPage) {
    loadBtn.style.display = 'none';
    iziToast.success({
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    loadBtn.style.display = 'block';
  }
}
