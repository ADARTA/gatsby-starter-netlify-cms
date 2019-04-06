import CMS from 'netlify-cms-app'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import FileSystemBackend from 'netlify-cms-backend-fs'

const config = { }
if (process.env.NODE_ENV === 'development') {
  // config.load_config_file = false
  config.backend = {
    "name": "file-system",
    "api_root": "/api"
  }
  config.display_url = "http://localhost:8000"
  CMS.registerBackend('file-system', FileSystemBackend)
} else {
  config.backend = {
    "name": "github",
    "repo": "ADARTA/gatsby-starter-netlify-cms",
    "branch": "master"
  }
}
CMS.init({config})

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
