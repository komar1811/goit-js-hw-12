import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery li a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const galleryContent = [];
  for (const image of images) {
    const galleryItem = `<li class="gallery-item"><a class="gallery-link" href="${image.largeImageURL}"><img src="${image.webformatURL}" class="gallery-image" alt="${image.tags}" /></a><ul class="info"><li class="info-item"><p class="info-item-label">Likes</p><p class="info-item-value">${image.likes}</p></li><li class="info-item"><p class="info-item-label">Views</p><p class="info-item-value">${image.views}</p></li><li class="info-item"><p class="info-item-label">Comments</p><p class="info-item-value">${image.comments}</p></li><li class="info-item"><p class="info-item-label">Downloads</p><p class="info-item-value">${image.downloads}</p></li></ul></li>`;
    galleryContent.push(galleryItem);
  }
  gallery.insertAdjacentHTML('beforeend', galleryContent.join(''));
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('is-hidden');
}
