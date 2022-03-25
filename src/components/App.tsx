import { Component } from 'react';
import { format, endOfMonth, startOfMonth } from 'date-fns';
import DatePickerInput from './DatePickerInput';

type AppState = {
  start: string;
  end: string;
};

export default class App extends Component<unknown, AppState> {
  state: AppState = {
    start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    end: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  };

  changeHandler = (isStart: boolean, dateStr: string) => {
    if (isStart) this.setState({ start: dateStr });
    else this.setState({ end: dateStr });
  };

  render() {
    return (
      <>
        <DatePickerInput isStart={true} value={this.state.start} onChange={this.changeHandler} />
        <i className="bi bi-arrow-right text-xl ml-3 mr-3" />
        <DatePickerInput isStart={false} value={this.state.end} onChange={this.changeHandler} />
      </>
    );
  }
}
