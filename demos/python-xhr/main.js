import petimg from '@petimg/core'
import Webcam from '@petimg/webcam'
import Dashboard from '@petimg/dashboard'
import XHRUpload from '@petimg/xhr-upload'

import '@petimg/core/dist/style.css'
import '@petimg/webcam/dist/style.css'
import '@petimg/dashboard/dist/style.css'

const petimg = new petimg({
  debug: true,
  autoProceed: false,
})

petimg.use(Webcam)
petimg.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['Webcam'],
})
petimg.use(XHRUpload, {
  endpoint: 'http://localhost:3020/upload',
})
