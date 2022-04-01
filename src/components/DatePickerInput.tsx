import { SyntheticEvent, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  isStart: boolean;
  value: string;
  onChange: (isStart: boolean, dateStr: string) => void;
};

function DatePickerInput(props: Props) {
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    props.onChange(props.isStart, e.currentTarget.value);
  };

  const handleDatePickerChange = (date: Date) => {
    props.onChange(true, format(date, 'yyyy-MM-dd'));
  };

  const handleMouseEnter = (e: SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'cornflowerblue';
  };

  const handleMouseLeave = (e: SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'currentColor';
  };

  let selectedDate = new Date(props.value);

  // set to today, if the format is invalid
  if (isNaN(selectedDate.getTime())) selectedDate = new Date();

  const ExampleCustomInput = forwardRef<HTMLButtonElement, any>(({ value }, ref) => (
    <button className="example-custom-input" ref={ref}>
      <input
        className="text-black text-2xl font-semibold inline rounded-lg text-center"
        size={11}
        onChange={handleChange}
        type="text"
        value={value}
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
        selected={selectedDate}
        onChange={handleDatePickerChange}
        showMonthDropdown
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}

export default DatePickerInput;
