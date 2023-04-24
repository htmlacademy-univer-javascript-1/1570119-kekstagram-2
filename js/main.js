import { renderThumbnail } from './thumbnail.js';
import { showUploadFileForm } from './form.js';
import { getPosts } from './api.js';
import { showErrorToast } from './error-toast.js';
import { showFilters } from './thumbnailFilters.js';
const renderPostsWithFilter = (posts) => {
  renderThumbnail(posts);
  showFilters(posts);
};

getPosts(renderPostsWithFilter, showErrorToast);
document
  .querySelector('#upload-file')
  .addEventListener('change', showUploadFileForm);
