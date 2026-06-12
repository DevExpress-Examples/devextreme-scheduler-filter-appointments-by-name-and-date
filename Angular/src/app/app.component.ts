import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataSource } from 'devextreme/common/data';
import { appointments } from './data/appointments';
import { FilterValues } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})

export class AppComponent {
  dataSource: DataSource = new DataSource({
    store: {
      type: 'array',
      data: appointments,
    },
    paginate: false,
  });

  currentDate: Date = new Date(2022, 9, 1);

  onFilterValuesChanged(newFilterValues: FilterValues): void {
    this.filterAppointments(newFilterValues);
  }

  private filterAppointments(filterValues: FilterValues): void {
    this.dataSource.filter([
      ['text', 'contains', filterValues.text],
      'and',
      ['startDate', '>=', filterValues.startDate],
      'and',
      ['endDate', '<=', filterValues.endDate],
    ]);
    this.dataSource.load().catch(() => {});
  }
}
