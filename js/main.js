import { renderThumbnail } from './thumbnail.js';
import { showUploadFileForm } from './form.js';
import { getPosts } from './api.js';
import { showError } from './error.js';
import { showFilters } from './thumbnail-filters.js';

function renderPostsAndFilter(posts) {
  renderThumbnail(posts);
  showFilters(posts);
}

getPosts(renderPostsAndFilter, showError);

document
  .querySelector('#upload-file')
  .addEventListener('change', showUploadFileForm);
