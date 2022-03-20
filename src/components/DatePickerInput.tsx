import { Component, SyntheticEvent, MouseEvent } from 'react';
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

  render() {
    let selectedDate = new Date(this.props.value);

    // set to today, if the format is invalid
    if (isNaN(selectedDate.getTime())) selectedDate = new Date();

    return (
      <div className="w-min">
        <input
          className="text-black text-3xl font-bold inline"
          size={9}
          onChange={this.handleChange}
          type="text"
          value={this.props.value}
          onClick={this.handleClick}
        />
        <p className="inline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-calendar-minus"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
        </p>
        {this.state.isOpen && (
          <DatePicker
            dateFormat="yyyy-MM-dd"
            className="text-black"
            selected={selectedDate}
            onChange={this.handleDatePickerChange}
            onClickOutside={this.closeTheDatePicker}
            showMonthDropdown
            inline
          />
        )}
      </div>
    );
  }
}

export default DatePickerInput;
