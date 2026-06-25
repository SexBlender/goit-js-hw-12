import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query;
let page;
let totalPages;
const PER_PAGE = 15;

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  query = formData.get('search-text').trim();
  page = 1;

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();

  showLoader();
  hideLoadMoreBtn();
  try {
    const data = await getImagesByQuery(query, page);
    const images = data.hits || [];

    if (!images.length) {
      iziToast.error({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    totalPages = Math.ceil(data.totalHits / PER_PAGE);

    createGallery(images);
    updLoadMoreBtnVisibility();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
    });
  } finally {
    hideLoader();
  }
  form.reset();
}

async function handleLoadMore() {
  page += 1;
  hideLoadMoreBtn();
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const galleryCard = document.querySelector('.gallery-item');
    const cardHeight = galleryCard.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    updLoadMoreBtnVisibility();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
    });
  } finally {
    hideLoader();
  }
}

function updLoadMoreBtnVisibility() {
  if (page < totalPages) {
    showLoadMoreBtn();
  } else {
    hideLoadMoreBtn();

    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
}
