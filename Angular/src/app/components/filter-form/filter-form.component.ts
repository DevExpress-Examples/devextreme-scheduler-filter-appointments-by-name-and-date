import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {OptionChangedEvent} from "devextreme/ui/form";
import {startViewDate, endViewDate} from "../../config";
import {ICheckBoxOptions, IDateOptions, IFilterInputOptions} from "./config";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['filter-form.component.css'],
})

export class FilterFormComponent implements OnInit {
  @Output() onFilterValueChange = new EventEmitter<OptionChangedEvent>();
  @Output() onCheckboxChange = new EventEmitter<OptionChangedEvent>();
  @Output() onStartDateChange = new EventEmitter<OptionChangedEvent>();
  @Output() onEndDateChange = new EventEmitter<OptionChangedEvent>();
  @Input() useDisable: boolean;

  filterInputOptions: IFilterInputOptions;
  startDateOptions: IDateOptions;
  endDateOptions: IDateOptions;
  checkBoxOptions: ICheckBoxOptions;

  ngOnInit(): void {
    this.filterInputOptions = {
      placeholder: 'Filter...',
      onKeyUp: (e: OptionChangedEvent) => this.onFilterValueChange.emit(e)
    }
    this.startDateOptions = {
      value: startViewDate,
      onValueChanged: (e: OptionChangedEvent) => this.onStartDateChange.emit(e)
    }
    this.endDateOptions = {
      value: endViewDate,
      onValueChanged: (e: OptionChangedEvent) => this.onEndDateChange.emit(e)
    }
    this.checkBoxOptions = {
      value: this.useDisable,
      text: 'Disable appointment are not filtered',
      onValueChanged: () => this.onCheckboxChange.emit()
    }
  }
}

