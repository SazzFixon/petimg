import { petimg } from '@petimg/core'
import Dashboard from '@petimg/dashboard'
import Transloadit from '@petimg/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const petimg = new petimg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access petimg in tests
window.petimg = petimg
