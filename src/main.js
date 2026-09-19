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

const PER_PAGE = 15;
let currentQuery = '';
let currentPage = 1;
let pageLimit = 0;

function showEndOfResultsMessage() {
  iziToast.info({
    position: 'topRight',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

function showErrorMessage() {
  iziToast.error({
    position: 'topRight',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}

function scrollByGalleryItem() {
  const firstItem = document.querySelector('.gallery-item');
  if (!firstItem) {
    return;
  }
  window.scrollBy({
    top: firstItem.getBoundingClientRect().height * 2,
    left: 0,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchField.value.trim();
  if (!query) {
    return;
  }

  currentQuery = query;
  currentPage = 1;
  pageLimit = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const pixResponse = await getImagesByQuery(currentQuery, currentPage);
    const images = pixResponse.hits;
    pageLimit = Math.ceil(pixResponse.totalHits / PER_PAGE);

    if (images.length === 0) {
      showErrorMessage();
      return;
    }

    createGallery(images);

    if (currentPage < pageLimit) {
      showLoadMoreButton();
    } else {
      showEndOfResultsMessage();
    }
  } catch (error) {
    console.log(error);
    showErrorMessage();
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  hideLoadMoreButton();
  showLoader();

  try {
    const nextPage = currentPage + 1;
    const pixResponse = await getImagesByQuery(currentQuery, nextPage);
    const images = pixResponse.hits;
    currentPage = nextPage;

    createGallery(images);
    scrollByGalleryItem();

    if (currentPage < pageLimit) {
      showLoadMoreButton();
    } else {
      showEndOfResultsMessage();
    }
  } catch (error) {
    console.log(error);
    showErrorMessage();
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
});
