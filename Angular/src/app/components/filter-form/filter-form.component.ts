import {Component, OnInit, Output, Input, EventEmitter, NgZone} from '@angular/core';
import {OptionChangedEvent} from 'devextreme/ui/form';
import {FilterValues} from '../../interfaces';
import {ICheckBoxOptions, IDateOptions, IFilterInputOptions, OnKeyUpEvent} from './interfaces';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['filter-form.component.css'],
})

export class FilterFormComponent implements OnInit {
  @Input() filterValues: FilterValues;
  @Output() filterValuesChange = new EventEmitter<FilterValues>();
  @Input() useDisable: boolean;

  filterInputOptions: IFilterInputOptions;
  startDateOptions: IDateOptions;
  endDateOptions: IDateOptions;
  checkBoxOptions: ICheckBoxOptions;

  constructor(private zone: NgZone) {
  }

  ngOnInit(): void {
    this.filterInputOptions = {
      value: this.filterValues.query,
      placeholder: 'Filter...',
      onKeyUp: (event: OnKeyUpEvent) => {
        const query = event?.event?.currentTarget?.value?.toLowerCase() || '';
        this.emitNewFilterValues({query});
      }
    }
    this.startDateOptions = {
      value: this.filterValues.startDate,
      onValueChanged: ({value}: OptionChangedEvent) => {
        this.zone.run(() => {
          this.emitNewFilterValues({startDate: value});
        });
      }
    }
    this.endDateOptions = {
      value: this.filterValues.endDate,
      onValueChanged: ({value}: OptionChangedEvent) => {
        this.zone.run(() => {
          this.emitNewFilterValues({endDate: value});
        });
      }
    }
    this.checkBoxOptions = {
      value: this.filterValues.useDisable,
      text: 'Disable appointment are not filtered',
      onValueChanged: ({value}: OptionChangedEvent) => {
        this.emitNewFilterValues({useDisable: value});
      }
    }
  }

  private emitNewFilterValues(newValues: Partial<FilterValues>): void {
    this.filterValuesChange.emit({
      ...this.filterValues,
      ...newValues,
    });
  }
}

