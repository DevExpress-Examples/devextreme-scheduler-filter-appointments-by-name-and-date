import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DxSchedulerModule, DxFormModule} from 'devextreme-angular';
import {FilterFormComponent} from './components/filter-form/filter-form.component';
import {FilterValues} from './interfaces';
import {Appointment, data} from './data';

@Component({
  selector: 'demo-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  dataSource = data;
  currentDate: Date = new Date(2022, 9, 1);
  filterValues: FilterValues = {
    query: '',
    startDate: new Date(2022, 9, 1),
    endDate: new Date(2022, 9, 28),
    useDisable: false,
  };

  onFilterValuesChange(newFilterValues: FilterValues): void {
    this.filterValues = newFilterValues;

    this.dataSource = this.createFilteredAppointments(this.filterValues);
  }

  private createFilteredAppointments(filterValues: FilterValues) {
    const { useDisable} = filterValues;
    if (useDisable)
      return data.map(appointment => ({
        ...appointment,
        disabled: !this.isAppointmentVisible(appointment, filterValues)
      }));
    return data.filter((appointment) => this.isAppointmentVisible(appointment, filterValues));
  }

  private isAppointmentVisible(appointment: Appointment, filterValues: FilterValues) {
    const { startDate, endDate, query} = filterValues;
    const isExistByDate = new Date(appointment.startDate) >= startDate && new Date(appointment.endDate) <= endDate;
    const isExistByText = appointment.text.toLowerCase().includes(query);

    return isExistByDate && isExistByText;
  }
}

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

platformBrowserDynamic().bootstrapModule(AppModule);
