import { screen, render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import DatePickerInput from '../DatePickerInput';
import { reducer, initialState, AppContext } from '../../../App';
import { useReducer } from 'react';
import TestUtils from 'react-dom/test-utils';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { act } from 'react-dom/test-utils';

test('Start date picker input', () => {
  const [state, dispatch] = renderHook(() => useReducer(reducer, initialState)).result.current;
  render(
    <AppContext.Provider value={{ state, dispatch }}>
      <DatePickerInput isStart={true} />
    </AppContext.Provider>
  );
  const datePickerInput = screen.getByTestId<HTMLInputElement>('datePickerInput');
  datePickerInput.click();
  const a = screen.getByLabelText('Choose Tuesday, June 7th, 2022');
  a.click();

  screen.debug(a);
  console.log(state);
});

// test('End date picker input', () => {
//   const [state, dispatch] = renderHook(() => useReducer(reducer, initialState)).result.current;
//   render(
//     <AppContext.Provider value={{ state, dispatch }}>
//       <DatePickerInput isStart={false} />
//     </AppContext.Provider>
//   );
//   expect(screen.getByTestId('datePickerInput')).toHaveDisplayValue(
//     format(endOfMonth(new Date()), 'MM-dd')
//   );
// });
