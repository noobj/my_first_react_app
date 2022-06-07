import { screen, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import DatePickerInput from '../DatePickerInput';
import { reducer, AppContext } from '../../../App';
import { useReducer } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';

const initialState = {
  start: format(startOfMonth(new Date('2022-06-08')), 'yyyy-MM-dd'),
  end: format(endOfMonth(new Date('2022-06-08')), 'yyyy-MM-dd'),
  sortByDate: false,
  isLogined: true,
  searchString: ''
};

test('Start date picker input', () => {
  const { result } = renderHook(() => useReducer(reducer, initialState));
  let [state, dispatch] = result.current;
  const { rerender } = render(
    <AppContext.Provider value={{ state, dispatch }}>
      <DatePickerInput isStart={true} />
    </AppContext.Provider>
  );
  let datePickerInput = screen.getByTestId<HTMLButtonElement>('datePickerInput');
  datePickerInput.click();
  const a = screen.getAllByRole('option')[0];
  a.click();

  [state, dispatch] = result.current;
  rerender(
    <AppContext.Provider value={{ state, dispatch }}>
      <DatePickerInput isStart={true} />
    </AppContext.Provider>
  );
  datePickerInput = screen.getByTestId<HTMLButtonElement>('datePickerInput');

  expect((datePickerInput.firstChild as HTMLInputElement).value).toEqual('05-29');
  expect(result.current[0].start).toEqual('2022-05-29');
});

test('End date picker input', () => {
  const { result } = renderHook(() => useReducer(reducer, initialState));
  let [state, dispatch] = result.current;
  const { rerender } = render(
    <AppContext.Provider value={{ state, dispatch }}>
      <DatePickerInput isStart={false} />
    </AppContext.Provider>
  );
  let datePickerInput = screen.getByTestId<HTMLButtonElement>('datePickerInput');
  datePickerInput.click();
  const a = screen.getAllByRole('option')[30];
  a.click();

  [state, dispatch] = result.current;
  rerender(
    <AppContext.Provider value={{ state, dispatch }}>
      <DatePickerInput isStart={false} />
    </AppContext.Provider>
  );
  datePickerInput = screen.getByTestId<HTMLButtonElement>('datePickerInput');

  expect((datePickerInput.firstChild as HTMLInputElement).value).toEqual('06-28');
  expect(result.current[0].end).toEqual('2022-06-28');
});
