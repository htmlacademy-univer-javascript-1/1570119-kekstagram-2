import { generatePosts } from './data.js';
import { renderThumbnail } from './thumbnail.js';
import { showUploadFileForm } from './form.js';
// import './form-picture-filters.js';
renderThumbnail(generatePosts(25));
document
  .querySelector('#upload-file')
  .addEventListener('change', showUploadFileForm);
