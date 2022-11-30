import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DxSchedulerModule, DxFormModule} from 'devextreme-angular';
import {AppComponent} from './app.component';
import {FilterFormComponent} from './components/filter-form/filter-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterFormComponent,
  ],
  imports: [
    BrowserModule,
    DxSchedulerModule,
    DxFormModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
