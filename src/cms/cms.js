import CMS, { init } from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'

CMS.init = init
const config = { }
if (process.env.NODE_ENV === 'development') {
  const { FileSystemBackend } = require('netlify-cms-backend-fs');
  config.backend = {
    "name": "file-system",
    "api_root": "/api"
  }
  config.display_url = "http://localhost:8000"
  CMS.registerBackend('file-system', FileSystemBackend)
} else {
  config.backend = {
    "name": "git-gateway",
    "branch": "master"
  }
}
CMS.init({config})

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
