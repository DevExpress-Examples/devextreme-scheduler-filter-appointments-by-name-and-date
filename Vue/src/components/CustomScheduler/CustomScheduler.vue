<template>
  <DxScheduler
      :data-source='dataSource'
      :views='views'
      :current-date='currentDate'
      current-view='month'
      :width='width'
  />
</template>

<script>
import {DxScheduler} from 'devextreme-vue/scheduler';
import {
  views,
  currentDate,
} from './config';

export default {
  name: 'CustomScheduler',
  props: [
    'dataSource',
    'startDate',
    'endDate'
  ],
  components: {
    DxScheduler,
  },
  data() {
    return {
      views: views,
      currentDate: currentDate,
      width: '80%',
    };
  }
};
</script>
