<script setup lang="ts">
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { DxScheduler } from 'devextreme-vue/scheduler';
import DataSource from 'devextreme/data/data_source';
import FilterForm from './FilterForm/FilterForm.vue';
import type { FilterValues } from './FilterForm/interfaces';
import { appointments } from '../appointments';
import './style.css';

const views = ['month'];
const currentDate = new Date(2022, 9, 1);

const dataSource = new DataSource({
  store: {
    type: 'array',
    data: appointments,
  },
  paginate: false,
});

function filterAppointments(e: FilterValues): void {
  dataSource.filter([
    ['text', 'contains', e.text],
    'and',
    ['startDate', '>=', e.startDate],
    'and',
    ['endDate', '<=', e.endDate]
  ]);
  dataSource.load();
}
</script>
<template>
  <div class="container">
    <DxScheduler
      :data-source="dataSource"
      :views="views"
      :current-date="currentDate"
      current-view="month"
      :width="'80%'"
    />
    <FilterForm
      @filterValuesChanged="filterAppointments"
    />
  </div>
</template>
