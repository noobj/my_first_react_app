import { Component, SyntheticEvent, MouseEvent } from 'react';
import onClickOutside from 'react-onclickoutside';
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
  };
  handleClick = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleDatePickerChange = (date: Date) => {
    this.props.onChange(true, format(date, 'yyyy-MM-dd'));
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <>
        <input
          className="text-black"
          onChange={this.handleChange}
          type="text"
          value={this.props.value}
          onClick={this.handleClick}
        />
        {this.state.isOpen && (
          <DatePicker
            dateFormat="yyyy-MM-dd"
            className="text-black"
            selected={new Date(this.props.value)}
            onChange={this.handleDatePickerChange}
            onClickOutside={this.handleClick}
            inline
          />
        )}
      </>
    );
  }
}

export default DatePickerInput;
