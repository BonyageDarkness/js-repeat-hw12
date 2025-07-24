import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryBox = new SimpleLightbox('.gallery a');
function showLoader() {
  document.getElementById('loader').classList.add('is-visible');
}
function hideLoader() {
  document.getElementById('loader').classList.remove('is-visible');
}

function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const galleryItems = images
    .map(image => {
      return `
    <li class="gallery-item" style="list-style-type: none;">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}"
            style="width: 360px; height: 200px; flex-shrink: 0; font-size: 0;" />
      </a>
      <div class="description">
      <p class="likes"><strong>Likes</strong>${image.likes}</p>
      <p class="views"><strong>Views</strong>${image.views}</p>
      <p class="comments"><strong>Comments</strong>${image.comments}</p>
      <p class="downloads"><strong>Downloads</strong>${image.downloads}</p>
      </div>

    </li>
  `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryItems);

  galleryBox.refresh();
  hideLoader();
}

export default createGallery;
