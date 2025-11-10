import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { DxDateBoxTypes } from 'devextreme-angular/ui/date-box';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { DxFormModule } from 'devextreme-angular';
import { type FilterValues } from '../../interfaces';

type EditorProps = DxDateBoxTypes.Properties | DxTextBoxTypes.Properties;

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['filter-form.component.css'],
  standalone: true,
  imports: [DxFormModule],
})

export class FilterFormComponent {
  @Output() filterValuesChanged = new EventEmitter<FilterValues>();

  filterValues: FilterValues;

  filterInputOptions: EditorProps;

  startDateOptions: EditorProps;

  endDateOptions: EditorProps;

  constructor() {
    this.filterValues = {
      text: '',
      startDate: new Date(2022, 9, 1),
      endDate: new Date(2022, 9, 28),
    };

    this.filterInputOptions = {
      value: this.filterValues.text,
      valueChangeEvent: 'keyup',
      placeholder: 'Filter...',
      onValueChanged: (e: DxTextBoxTypes.ValueChangedEvent): void => {
        this.emitNewFilterValues({ text: e.value });
      },
    };

    this.startDateOptions = {
      value: this.filterValues.startDate,
      onValueChanged: (e: DxDateBoxTypes.ValueChangedEvent): void => {
        this.emitNewFilterValues({ startDate: e.value });
      },
    };

    this.endDateOptions = {
      value: this.filterValues.endDate,
      onValueChanged: (e: DxDateBoxTypes.ValueChangedEvent): void => {
        this.emitNewFilterValues({ endDate: e.value });
      },
    };
  }

  private emitNewFilterValues(newValues: Partial<FilterValues>): void {
    this.filterValuesChanged.emit({
      ...this.filterValues,
      ...newValues,
    });
  }
}
