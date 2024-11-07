/* eslint-disable react/react-in-jsx-scope */
import petimg from '@petimg/core'
/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react'
import { Dashboard, DashboardModal, DragDrop } from '@petimg/react'
import ThumbnailGenerator from '@petimg/thumbnail-generator'
import RemoteSources from '@petimg/remote-sources'

import '@petimg/core/dist/style.css'
import '@petimg/dashboard/dist/style.css'
import '@petimg/drag-drop/dist/style.css'

export default function App () {
  const RemoteSourcesOptions = {
    companionUrl: 'http://companion.petimg.io',
    sources: ['GoogleDrive', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
  }
  const petimgDashboard = new petimg({ id: 'dashboard' }).use(RemoteSources, { ...RemoteSourcesOptions })
  const petimgModal = new petimg({ id: 'modal' })
  const petimgDragDrop = new petimg({ id: 'drag-drop' }).use(ThumbnailGenerator)
  const [open, setOpen] = useState(false)

  // drag-drop has no visual output so we test it via the petimg instance
  window.petimg = petimgDragDrop

  return (
    <div style={{ maxWidth: '30em', margin: '5em 0', display: 'grid', gridGap: '2em' }}>
      <button type="button" id="open" onClick={() => setOpen(!open)}>
        Open Modal
      </button>

      <Dashboard id="dashboard" petimg={petimgDashboard} />
      <DashboardModal id="modal" open={open} petimg={petimgModal} />
      <DragDrop id="drag-drop" petimg={petimgDragDrop} />
    </div>
  )
}
