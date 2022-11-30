import {Component} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {FilterValues} from './interfaces';
import {appointments} from './data/appointments'

@Component({
  selector: 'demo-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  dataSource: DataSource = new DataSource({
    store: {
      type: 'array',
      data: appointments,
    },
    paginate: false
  })
  currentDate: Date = new Date(2022, 9, 1);
  filterValues: FilterValues = {
    query: '',
    startDate: new Date(2022, 9, 1),
    endDate: new Date(2022, 9, 28)
  };

  onFilterValuesChange(newFilterValues: FilterValues): void {
    this.filterValues = newFilterValues;

    this.createFilteredAppointments(this.filterValues);
  }

  private createFilteredAppointments(filterValues: FilterValues) {
     this.dataSource.filter([
      ['text', 'contains', filterValues.query],
      'and',
      ['startDate', '>=', filterValues.startDate],
      'and',
      ['endDate', '<=', filterValues.endDate]
    ])
    return this.dataSource.load()
  }
}
