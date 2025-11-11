import { useCallback, useMemo } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import Scheduler, { type SchedulerTypes } from 'devextreme-react/scheduler';
import DataSource from 'devextreme/data/data_source';
import FilterForm from './components/FilterForm/FilterForm';
import type { FilterValues } from './components/FilterForm/interfaces';
import { appointments } from './appointments';

const currentDate: Date = new Date(2022, 9, 1);

const views: SchedulerTypes.ViewType[] = ['month'];

function App(): JSX.Element {
  const filterValuesChanged = useCallback((newFilterValues: FilterValues) => {
    filterAppointments(newFilterValues);
  }, []);

  const filterAppointments = useCallback((filterValues: FilterValues): void => {
    dataSource.filter([
      ['text', 'contains', filterValues.text],
      'and',
      ['startDate', '>=', filterValues.startDate],
      'and',
      ['endDate', '<=', filterValues.endDate],
    ]);
    dataSource.load().catch(() => { });
  }, []);

  const dataSource = useMemo<DataSource>(
    (): DataSource => new DataSource({
      store: {
        type: 'array',
        data: appointments,
      },
      paginate: false,
    }),
    [],
  );

  return (
    <div className='container'>
      <Scheduler
        dataSource={dataSource}
        views={views}
        defaultCurrentView={views[0]}
        defaultCurrentDate={currentDate}
        width='80%'
      />
      <FilterForm
        filterValuesChanged={filterValuesChanged}
      />
    </div>
  );
}

export default App;
