<script setup lang="ts">
import { ref } from 'vue';
import { DxForm, DxGroupItem, DxLabel, DxSimpleItem } from 'devextreme-vue/form';
import { type DxDateBoxTypes } from 'devextreme-vue/date-box';
import { type DxTextBoxTypes } from 'devextreme-vue/text-box';
import type { FilterValues } from './interfaces';

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'filterValuesChanged', values: FilterValues): void
}>();

const filterValues = ref({
  text: '',
  startDate: new Date(2022, 9, 1),
  endDate: new Date(2022, 9, 28),
});

const textEditorOptions = ref<DxTextBoxTypes.Properties>({
  placeholder: 'Filter...',
  valueChangeEvent: 'keyup',
  value: filterValues.value.text,
  onValueChanged: (e: DxTextBoxTypes.ValueChangedEvent) => {
    filterValues.value.text = e.value as string;
    emit('filterValuesChanged', filterValues.value);
  },
});

const startEditorOptions = ref<DxDateBoxTypes.Properties>({
  type: 'date',
  value: filterValues.value.startDate,
  onValueChanged: (e: DxDateBoxTypes.ValueChangedEvent) => {
    filterValues.value.startDate = e.value as Date;
    emit('filterValuesChanged', filterValues.value);
  },
});

const endEditorOptions = ref<DxDateBoxTypes.Properties>({
  type: 'date',
  value: filterValues.value.endDate,
  onValueChanged: (e: DxDateBoxTypes.ValueChangedEvent) => {
    filterValues.value.endDate = e.value as Date;
    emit('filterValuesChanged', filterValues.value);
  },
});
</script>
<template>
  <DxForm
    label-mode="outside"
  >
    <DxGroupItem caption="Filter Appointments">
      <DxSimpleItem
        editor-type="dxTextBox"
        :editor-options="textEditorOptions"
      >
        <DxLabel text="Text"/>
      </DxSimpleItem>
      <DxSimpleItem
        editor-type="dxDateBox"
        :editor-options="startEditorOptions"
      >
        <DxLabel text="Start Date"/>
      </DxSimpleItem>
      <DxSimpleItem
        editor-type="dxDateBox"
        :editor-options="endEditorOptions"
      >
        <DxLabel text="End Date"/>
      </DxSimpleItem>
    </DxGroupItem>
  </DxForm>
</template>
