import AwsS3 from '@petimg/aws-s3'
import petimg from '@petimg/core'
import Dashboard from '@petimg/dashboard'
import GoogleDrive from '@petimg/google-drive'
import Webcam from '@petimg/webcam'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'
import '@petimg/webcam/dist/style.css'

const petimg = new petimg({
  debug: true,
  autoProceed: false,
})

petimg.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})
petimg.use(Webcam)
petimg.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'Webcam'],
})
petimg.use(AwsS3, {
  companionUrl: 'http://localhost:3020',
})
