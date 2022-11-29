<template>
  <div class='container'>
    <CustomScheduler
        :dataSource='dataSource'
    />
    <FilterForm
        :onFilterValueChange='onFilterValueChange'
        :onStartDateChange='onStartDateChange'
        :onEndDateChange='onEndDateChange'
    />
  </div>
</template>

<script>
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DataSource from 'devextreme/data/data_source';
import CustomScheduler from '@/components/CustomScheduler';
import FilterForm from '@/components/FilterForm';
import {
  startViewDate,
  endViewDate
} from './config.js'
import {data} from './data.js';
import './style.css';

const defaultData = new DataSource({
  store: {
    type: 'array',
    data: data,
  },
  paginate: false,
})

export default {
  name: 'App',
  components: {
    CustomScheduler,
    FilterForm
  },
  data() {
    return {
      dataSource: defaultData,
      startDate: startViewDate,
      endDate: endViewDate,
      filterValue: '',
    };
  },
  methods: {
    onFilterValueChange({event}) {
      this.filterValue = event.currentTarget.value.toLowerCase();

      this.filterAppointments(this.filterValue, this.startDate, this.endDate);
    },
    onStartDateChange(e) {
      this.startDate = e.value;

      this.filterAppointments(this.filterValue, this.startDate, this.endDate);
    },
    onEndDateChange(e) {
      this.endDate = e.value;

      this.filterAppointments(this.filterValue, this.startDate, this.endDate);
    },
    filterAppointments(filterValue, startDate, endDate) {
      defaultData.filter([
        ['text', 'contains', filterValue],
        "and",
        ['startDate', '>=', startDate],
        "and",
        ['endDate', '<=', endDate]
      ])
      defaultData.load()
    }
  }
};
</script>
