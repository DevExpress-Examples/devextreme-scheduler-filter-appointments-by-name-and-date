<template>
  <DxForm
      :label-mode='labelMode'
      :label-location='labelLocation'
  >
    <DxGroupItem>
      <DxSimpleItem
          editorType='dxTextBox'
          :editorOptions='filterInputOptions'
      >
        <DxLabel text='Text'/>
      </DxSimpleItem>
      <DxSimpleItem
          editorType='dxDateBox'
          :editorOptions='startDateOptions'
      >
        <DxLabel text='Start Date'/>
      </DxSimpleItem>
      <DxSimpleItem
          editorType='dxDateBox'
          :editorOptions='endDateOptions'
      >
        <DxLabel text='End Date'/>
      </DxSimpleItem>
      <DxSimpleItem
          editorType='dxCheckBox'
          :editorOptions='checkBoxOptions'
      />
    </DxGroupItem>
  </DxForm>
</template>

<script>
import {DxForm, DxGroupItem, DxLabel, DxSimpleItem} from 'devextreme-vue/form';
import {endViewDate, startViewDate} from '@/config';

export default {
  name: 'FilterForm',
  props: [
    'onFilterValueChange',
    'onCheckboxChange',
    'onStartDateChange',
    'onEndDateChange',
    'useDisable'
  ],
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxLabel
  },
  data() {
    return {
      labelMode: 'outside',
      labelLocation: 'left',
      filterInputOptions: {
        placeholder: 'Filter...',
        onKeyUp: this.onFilterValueChange
      },
      startDateOptions: {
        value: startViewDate,
        onValueChanged: this.onStartDateChange
      },
      endDateOptions: {
        value: endViewDate,
        onValueChanged: this.onEndDateChange
      },
      checkBoxOptions: {
        value: this.useDisable,
        text: 'Disable appointment are not filtered',
        onValueChanged: this.onCheckboxChange
      }
    };
  },
};
</script>
