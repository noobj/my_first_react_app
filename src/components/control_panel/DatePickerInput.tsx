import { SyntheticEvent, forwardRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { AppContext } from '../App';

type Props = {
  isStart: boolean;
};

function DatePickerInput(props: Props) {
  const appContext = useContext(AppContext);
  const defaultValue = props.isStart ? appContext.state.start : appContext.state.end;

  const handleDatePickerChange = (date: Date) => {
    appContext.dispatch({ isStart: props.isStart, value: format(date, 'yyyy-MM-dd') });
  };

  const handleMouseEnter = (e: SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'cornflowerblue';
  };

  const handleMouseLeave = (e: SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'currentColor';
  };

  // eslint-disable-next-line react/prop-types
  const ExampleCustomInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      <input
        className="text-black text-2xl font-semibold inline rounded-lg text-center"
        size={11}
        type="text"
        value={value}
        readOnly={true}
      />
      <i
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bi bi-calendar-fill text-3xl ml-2"
      />
    </button>
  ));
  ExampleCustomInput.displayName = 'whatever';

  return (
    <div className="inline-block w-fit">
      <DatePicker
        dateFormat="yyyy-MM-dd"
        className="text-black"
        selected={new Date(defaultValue)}
        onChange={handleDatePickerChange}
        showMonthDropdown
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}

export default DatePickerInput;
