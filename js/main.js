import { renderThumbnail } from './thumbnail.js';
import { showUploadFileForm } from './form.js';
import { getPosts } from './api.js';
import { showErrorToast } from './error-toast.js';

getPosts(renderThumbnail, showErrorToast);
document
  .querySelector('#upload-file')
  .addEventListener('change', showUploadFileForm);
