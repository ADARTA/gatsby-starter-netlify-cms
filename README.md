# Gatsby + Netlify CMS Starter

**Note:** This starter uses [Gatsby v2][1].

This repo contains an example business website that is built with [Gatsby][1], and [Netlify CMS][2]: **[Demo Link][4]**. [Original starter here.][3]

**Added:** Uses the development backend [netlify-cms-backend-fs](https://github.com/adarta/netlify-cms-backend-fs)

## Setting up netlify-cms-backend-fs in Gatsby (has NetlifyCMS)

**Requires:**

* Netlify CMS already in the project
* Gatsby v2.0+
* Manual init in NetlifyCMS

Add the backend to your project.
```sh
$ yarn add netlify-cms-backend-fs
```

### Modify `gatsby-config.js` to use manual init of the cms
```js
{
  resolve: 'gatsby-plugin-netlify-cms',
  options: {
    modulePath: `${__dirname}/src/cms/cms.js`,
    manualInit: true,
  },
}
```

### Add the dev server middleware api to `gatsby-node.js`
```js
// ...

exports.onCreateDevServer = ({ app }) => {
  const fsMiddlewareAPI = require('netlify-cms-backend-fs/dist/fs')
  fsMiddlewareAPI(app)
}
```

### Change/add `src/cms/cms.js`

This configuration is simplified and yours may have [widget registration, etc][5]

```js
import CMS from 'netlify-cms-app'
const config = { }
// Important to remove your backend config and replace it in this setup
if (process.env.NODE_ENV === 'development') {
  const FileSystemBackend = require('netlify-cms-backend-fs');
  config.backend = {
    "name": "file-system",
    "api_root": "/api"
  }
  config.display_url = "http://localhost:8000"
  CMS.registerBackend('file-system', FileSystemBackend)
} else {
  config.backend = {
    "backend": {
      "name": "github",
      "repo": "ADARTA/gatsby-starter-netlify-cms",
      "branch": "master"
    }
  }
}
CMS.init({config})
```

## Getting Started (One Click) with this starter

Netlify CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. The example here is the Kaldi coffee company template (adapted from [One Click Hugo CMS][3]). Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/adarta/gatsby-starter-netlify-cms&amp;stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>


[1]: https://www.gatsbyjs.org/
[2]: https://www.netlifycms.org/
[3]: https://github.com/netlify-templates/gatsby-starter-netlify-cms
[4]: https://gatsby-netlify-cms.netlify.com/
[5]: https://github.com/ADARTA/gatsby-starter-netlify-cms/blob/master/src/cms/cms.js
