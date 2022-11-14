import {NgModule, Component, enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {CustomSchedulerComponent} from "./components/custom-scheduler/custom-scheduler.component";
import {FilterFormComponent} from "./components/filter-form/filter-form.component";
import {DxSchedulerModule, DxFormModule} from 'devextreme-angular';
import {OptionChangedEvent} from "devextreme/ui/form";
import {startViewDate, endViewDate} from './config';
import {Appointment, Service, data} from "./data";

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'demo-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [Service],
})

export class AppComponent {
  dataSource: Appointment[];
  currentDate: Date = new Date(2022, 9, 1);
  useDisable: boolean = false;
  startDate: Date = startViewDate;
  endDate: Date = endViewDate;
  filterValue: string = '';

  constructor(service: Service) {
    this.dataSource = service.getAppointments();
  }

  onFilterValueChange({event}: any) {
    this.filterValue = event.currentTarget.value.toLowerCase();

    this.dataSource = this.createFilteredAppointments(
      this.startDate,
      this.endDate,
      this.filterValue,
      this.useDisable
    )
  }

  onCheckboxChange() {
    this.useDisable = !this.useDisable;

    this.dataSource = this.createFilteredAppointments(
      this.startDate,
      this.endDate,
      this.filterValue,
      this.useDisable
    )
  }

  onStartDateChange(e: OptionChangedEvent) {
    this.startDate = e.value;

    this.dataSource = this.createFilteredAppointments(
      this.startDate,
      this.endDate,
      this.filterValue,
      this.useDisable
    )
  }

  onEndDateChange(e: OptionChangedEvent) {
    this.endDate = e.value;

    this.dataSource = this.createFilteredAppointments(
      this.startDate,
      this.endDate,
      this.filterValue,
      this.useDisable
    )
  }

  filterAppointments(startDate: Date, endDate: Date, filterValue: string, appointment: Appointment) {
    const isExistByDate = new Date(appointment.startDate) >= startDate && new Date(appointment.endDate) <= endDate;
    const isExistByText = appointment.text.toLowerCase().includes(filterValue);

    return isExistByDate && isExistByText;
  }

  createFilteredAppointments(startDate: Date, endDate: Date, filterValue: string, useDisable: boolean) {
    if (useDisable)
      return data.map(appointment => ({
        ...appointment,
        disabled: !this.filterAppointments(startDate, endDate, filterValue, appointment)
      }));
    return data.filter((appointment) => this.filterAppointments(startDate, endDate, filterValue, appointment));
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CustomSchedulerComponent,
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

platformBrowserDynamic().bootstrapModule(AppModule);
