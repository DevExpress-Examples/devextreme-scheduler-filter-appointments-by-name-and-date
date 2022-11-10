<template>
  <div class='container'>
    <CustomScheduler
        :dataSource='dataSource'
        :startDate='startDate'
        :endDate='endDate'
    />
    <FilterForm
        :onFilterValueChange='onFilterValueChange'
        :onCheckboxChange='onCheckboxChange'
        :onStartDateChange='onStartDateChange'
        :onEndDateChange='onEndDateChange'
        :useDisable='useDisable'
    />
  </div>
</template>

<script>
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import CustomScheduler from '@/components/CustomScheduler';
import FilterForm from '@/components/FilterForm';
import {
  startViewDate,
  endViewDate
} from './config.js'
import {data} from './data.js';
import './style.css';

export default {
  name: 'App',
  components: {
    CustomScheduler,
    FilterForm
  },
  data() {
    return {
      dataSource: data,
      useDisable: false,
      startDate: startViewDate,
      endDate: endViewDate,
      filterValue: '',
    };
  },
  methods: {
    onFilterValueChange({event}) {
      this.filterValue = event.currentTarget.value.toLowerCase();

      this.dataSource = this.createFilteredAppointments(
          this.startDate,
          this.endDate,
          this.filterValue,
          this.useDisable
      )
    },
    onCheckboxChange() {
      this.useDisable = !this.useDisable;

      this.dataSource = this.createFilteredAppointments(
          this.startDate,
          this.endDate,
          this.filterValue,
          this.useDisable
      )
    },
    onStartDateChange(e) {
      this.startDate = e.value;

      this.dataSource = this.createFilteredAppointments(
          this.startDate,
          this.endDate,
          this.filterValue,
          this.useDisable
      )
    },
    onEndDateChange(e) {
      this.endDate = e.value;

      this.dataSource = this.createFilteredAppointments(
          this.startDate,
          this.endDate,
          this.filterValue,
          this.useDisable
      )
    },
    filterAppointments(startDate, endDate, filterValue, appointment) {
      const isExistByDate = new Date(appointment.startDate) >= startDate && new Date(appointment.endDate) <= endDate;
      const isExistByText = appointment.text.toLowerCase().includes(filterValue);

      return isExistByDate && isExistByText;
    },
    createFilteredAppointments(startDate, endDate, filterValue, useDisable) {
      if (useDisable)
        return data.map(appointment => ({
          ...appointment,
          disabled: !this.filterAppointments(startDate, endDate, filterValue, appointment)
        }));
      return data.filter((appointment) => this.filterAppointments(startDate, endDate, filterValue, appointment));
    }
  }
};
</script>
