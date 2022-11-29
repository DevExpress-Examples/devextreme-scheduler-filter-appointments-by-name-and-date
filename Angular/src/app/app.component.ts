import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DxSchedulerModule, DxFormModule} from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";
import {FilterFormComponent} from './components/filter-form/filter-form.component';
import {FilterValues} from './interfaces';
import {Appointment, Service} from './data';

@Component({
  selector: 'demo-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [Service],
})

export class AppComponent {
  data$ = this.service.getValues();
  defaultData: Appointment[];
  dataSource: DataSource;
  currentDate: Date = new Date(2022, 9, 1);
  filterValues: FilterValues = {
    query: '',
    startDate: new Date(2022, 9, 1),
    endDate: new Date(2022, 9, 28)
  };


  constructor(public service: Service) {
    this.data$.subscribe(res=> {
      this.defaultData = res
    })
    this.dataSource = new DataSource({
      store: {
        type: 'array',
        data: this.defaultData,
      },
      paginate: false,
    })
  }

  onFilterValuesChange(newFilterValues: FilterValues): void {
    this.filterValues = newFilterValues;

    this.createFilteredAppointments(this.filterValues);
  }

  private createFilteredAppointments(filterValues: FilterValues) {
     this.dataSource.filter([
      ['text', 'contains', filterValues.query],
      "and",
      ['startDate', '>=', filterValues.startDate],
      "and",
      ['endDate', '<=', filterValues.endDate]
    ])
    return this.dataSource.load()
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
