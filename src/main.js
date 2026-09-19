import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchField = document.querySelector('input.search-form-input');
const loadMoreButton = document.querySelector('.load-more-button');
let currentPage = 1;
let pageLimit;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchField.value.trim();
  if (!query) {
    return;
  }

  clearGallery();
  showLoader();
  currentPage = 1;
  try {
    const pixResponse = await getImagesByQuery(query, currentPage);
    const images = pixResponse.hits;
    pageLimit = Math.ceil(pixResponse.totalHits / 15);
    if (images.length === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createGallery(images);
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async event => {
  const query = searchField.value.trim();
  currentPage += 1;
  if (currentPage > pageLimit) {
    hideLoadMoreButton();
    iziToast.error({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    try {
      showLoader();
      const pixResponse = await getImagesByQuery(query, currentPage);
      const images = pixResponse.hits;
      createGallery(images);
      window.scrollBy({
        top:
          document.querySelectorAll('.gallery-item')[0].getBoundingClientRect()
            .height * 2,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } finally {
      hideLoader();
    }
  }
});
