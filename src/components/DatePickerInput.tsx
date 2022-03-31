import { Component, SyntheticEvent, MouseEvent, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  isStart: boolean;
  value: string;
  onChange: (isStart: boolean, dateStr: string) => void;
};

type State = {
  isOpen: boolean;
};

class DatePickerInput extends Component<Props, State> {
  state: State = {
    isOpen: false
  };

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange(this.props.isStart, e.currentTarget.value);
    this.setState({ isOpen: false });
  };
  handleClick = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  closeTheDatePicker = () => this.setState({ isOpen: false });

  handleDatePickerChange = (date: Date) => {
    this.props.onChange(true, format(date, 'yyyy-MM-dd'));
  };

  handleMouseEnter = (e: SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'cornflowerblue';
  };

  handleMouseLeave = (e: SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'currentColor';
  };

  render() {
    let selectedDate = new Date(this.props.value);

    // set to today, if the format is invalid
    if (isNaN(selectedDate.getTime())) selectedDate = new Date();

    const ExampleCustomInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
      <button className="example-custom-input" onClick={onClick} ref={ref}>
        <input
          className="text-black text-3xl font-bold inline"
          size={9}
          onChange={this.handleChange}
          type="text"
          value={value}
        />
        <i
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
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
          onChange={this.handleDatePickerChange}
          onClickOutside={this.closeTheDatePicker}
          showMonthDropdown
          customInput={<ExampleCustomInput />}
        />
      </div>
    );
  }
}

export default DatePickerInput;
