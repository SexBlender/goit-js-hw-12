import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createImageCard(img) {
  return `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>

      <div class="info">
        <p><b>Likes:</b> ${img.likes}</p>
        <p><b>Views:</b> ${img.views}</p>
        <p><b>Comments:</b> ${img.comments}</p>
        <p><b>Downloads:</b> ${img.downloads}</p>
      </div>
    </li>
  `;
}

export function createGallery(images) {
  const markup = images.map(createImageCard).join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.remove('hidden');
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
}

export function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}
