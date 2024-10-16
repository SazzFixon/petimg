import { petimg } from '@petimg/core'
import Dashboard from '@petimg/dashboard'
import Tus from '@petimg/tus'
import Unsplash from '@petimg/unsplash'
import Url from '@petimg/url'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const petimg = new petimg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access petimg in tests
window.petimg = petimg
