import petimg from '@petimg/core'
import Dashboard from '@petimg/dashboard'
import Compressor from '@petimg/compressor'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'

const petimg = new petimg()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access petimg in tests
window.petimg = petimg
