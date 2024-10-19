import petimg from '@petimg/core'
import Dashboard from '@petimg/dashboard'
import RemoteSources from '@petimg/remote-sources'
import Webcam from '@petimg/webcam'
import ScreenCapture from '@petimg/screen-capture'
import GoldenRetriever from '@petimg/golden-retriever'
import ImageEditor from '@petimg/image-editor'
import DropTarget from '@petimg/drop-target'
import Audio from '@petimg/audio'
import Compressor from '@petimg/compressor'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.petimg.io'

const petimg = new petimg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access petimg in tests
window.petimg = petimg
