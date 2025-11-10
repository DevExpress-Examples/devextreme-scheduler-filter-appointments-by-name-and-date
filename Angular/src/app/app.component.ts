import { Component } from '@angular/core';
import { DxSchedulerModule } from 'devextreme-angular';
import { DataSource } from 'devextreme/common/data';
import { appointments } from './data/appointments';
import { FilterValues } from './interfaces';
import { FilterFormComponent } from './components/filter-form/filter-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [DxSchedulerModule, FilterFormComponent],
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
