import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import {
  petimgAngularDashboardModule,
  petimgAngularStatusBarModule,
  petimgAngularDragDropModule,
  petimgAngularProgressBarModule,
  petimgAngularDashboardModalModule,
} from '@petimg' +
  /angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    petimgAngularDashboardModule,
    petimgAngularStatusBarModule,
    petimgAngularDashboardModalModule,
    petimgAngularDragDropModule,
    petimgAngularProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
