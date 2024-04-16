import { Component, OnInit } from '@angular/core'
import { petimg} from '@petimg' +
  /core'
import Webcam from '@petimg' +
  /webcam'
import Tus from '@petimg' +
  /tus'
import GoogleDrive from '@petimg' +
  /google-drive'

@Component({
  selector: 'app-root',
  template: /* html */ `
    <h1>petimg Angular Example!</h1>
    <h2>Inline dashboard</h2>
    <label>
      <input
        type="checkbox"
        (change)="showInline = $any($event.target)?.checked"
        [checked]="showInline"
      />
      Show Dashboard
    </label>

    <petimg -dashboard
      [petimg ]="petimg"
      [props]="dashboardProps"
      *ngIf="showInline"
    ></petimg-dashboard>

    <h2>Modal Dashboard</h2>
    <div>
      <petimg -dashboard-modal
        [petimg ]="petimg"
        [open]="showModal"
        [props]="dashboardModalProps"
      ></petimg-dashboard-modal>
      <button (click)="showModal = !showModal">
        {{ showModal ? 'Close dashboard' : 'Open dashboard' }}
      </button>
    </div>

    <p>Drag Drop Area</p>
    <petimg -drag-drop [petimg ]="petimg" [props]="{}"></petimg-drag-drop>

    <h2>Progress Bar</h2>
    <petimg -progress-bar
      [petimg ]="petimg"
      [props]="{ hideAfterFinish: false }"
    ></petimg-progress-bar>
  `,
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'angular-example'

  showInline = false

  showModal = true

  dashboardProps = {
    plugins: ['Webcam'],
  }

  dashboardModalProps = {
    target: document.body,
    onRequestCloseModal: (): void => {
      this.showModal = false
    },
  }

  petimg: petimg = new petimg({ debug: true, autoProceed: true })

  ngOnInit(): void {
    this.petimg
      .use(Webcam)
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
      .use(GoogleDrive, { companionUrl: 'https://companion.petimg' +
          .io' })
  }
}
