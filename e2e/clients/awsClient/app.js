import { petimg } from '@petimg/core'
import Dashboard from '@petimg/dashboard'
import AwsS3 from '@petimg/aws-s3'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'

const petimg = new petimg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
  })

window.petimg = petimg
