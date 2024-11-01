import { petimg } from '@petimg/core'
import Dashboard from '@petimg/dashboard'
import XHRUpload from '@petimg/xhr-upload'
import Unsplash from '@petimg/unsplash'
import Url from '@petimg/url'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'

const companionUrl = 'http://localhost:3020'
const petimg = new petimg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(XHRUpload, { endpoint: 'https://xhr-server.herokuapp.com/upload', limit: 6 })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access petimg in tests
window.petimg = petimg
