import Transloadit, { COMPANION_URL } from '@petimg/transloadit'
import petimg from '@petimg/core'
import Form from '@petimg/form'
import Dashboard from '@petimg/dashboard'
import RemoteSources from '@petimg/remote-sources'
import ImageEditor from '@petimg/image-editor'
import Webcam from '@petimg/webcam'
import ProgressBar from '@petimg/progress-bar'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'
import '@petimg/image-editor/dist/style.css'
import '@petimg/progress-bar/dist/style.css'

const TRANSLOADIT_KEY = '35c1aed03f5011e982b6afe82599b6a0'
// A trivial template that resizes images, just for example purposes.
//
// "steps": {
//   ":original": { "robot": "/upload/handle" },
//   "resize": {
//     "use": ":original",
//     "robot": "/image/resize",
//     "width": 100,
//     "height": 100,
//     "imagemagick_stack": "v1.0.0"
//   }
// }
const TEMPLATE_ID = 'bbc273f69e0c4694a5a9d1b587abc1bc'

/**
 * Form
 */

const formpetimg = new petimg({
  debug: true,
  autoProceed: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    trigger: '#petimg-select-files',
    closeAfterFinish: true,
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#test-form',
    fields: ['message'],
    // submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

formpetimg.on('error', (err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formpetimg.on('upload-error', (file, err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formpetimg.on('complete', ({ transloadit }) => {
  const btn = document.getElementById('petimg-select-files')
  btn.hidden = true
  const selectedFiles = document.getElementById('petimg-form-selected-files')
  selectedFiles.textContent = `selected files: ${Object.keys(transloadit[0].results).length}`
})

window.formpetimg = formpetimg

/**
 * Form with Dashboard
 */

const formpetimgWithDashboard = new petimg({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard-form .dashboard',
    note: 'Only PNG files please!',
    hideUploadButton: true,
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#dashboard-form',
    fields: ['message'],
    triggerUploadOnSubmit: true,
    submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.formpetimgWithDashboard = formpetimgWithDashboard

/**
 * Dashboard
 */

const dashboard = new petimg({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard',
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.dashboard = dashboard

// /**
//  * Dashboard Modal
//  */

const dashboardModal = new petimg({
  debug: true,
  autoProceed: false,
})
  .use(Dashboard, { closeAfterFinish: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

dashboardModal.on('complete', ({ transloadit, successful, failed }) => {
  if (failed?.length !== 0) {
    // eslint-disable-next-line no-console
    console.error('it failed', failed)
  } else {
    // eslint-disable-next-line no-console
    console.log('success', { transloadit, successful })
  }
})

function openModal () {
  dashboardModal.getPlugin('Dashboard').openModal()
}

window.openModal = openModal

// /**
//  * petimg.upload (files come from input[type=file])
//  */

const petimgWithoutUI = new petimg({
  debug: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })
  .use(ProgressBar, { target: '#upload-progress' })

window.doUpload = (event) => {
  const resultEl = document.querySelector('#upload-result')
  const errorEl = document.querySelector('#upload-error')

  petimgWithoutUI.addFiles(event.target.files)
  petimgWithoutUI.upload()

  petimgWithoutUI.on('complete', ({ transloadit }) => {
    resultEl.classList.remove('hidden')
    errorEl.classList.add('hidden')
    resultEl.textContent = JSON.stringify(transloadit[0].results, null, 2)

    const resizedUrl = transloadit[0].results['resize'][0]['ssl_url']
    const img = document.createElement('img')
    img.src = resizedUrl
    document.getElementById('upload-result-image').appendChild(img)
  })

  petimgWithoutUI.on('error', (err) => {
    resultEl.classList.add('hidden')
    errorEl.classList.remove('hidden')
    errorEl.textContent = err.message
  })
}
