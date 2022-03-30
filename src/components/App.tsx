import { Component } from 'react';
import { format, endOfMonth, startOfMonth } from 'date-fns';
import DatePickerInput from './DatePickerInput';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Category } from '../interfaces/Category.interface';

ChartJS.register(ArcElement, Tooltip, Legend);

type AppState = {
  start: string;
  end: string;
  total: number;
  chartData: any;
  categoriesExclude: Set<string>;
  entriesSortByDate: boolean;
};

export default class App extends Component<unknown, AppState> {
  state: AppState = {
    start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    end: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
    total: 0,
    chartData: {
      datasets: []
    },
    categoriesExclude: new Set(),
    entriesSortByDate: false
  };

  fetchAndSetEntries = async () => {
    const params = new URLSearchParams();
    params.set('timeStart', this.state.start);
    params.set('timeEnd', this.state.end);
    params.set('categoriesExclude', Array.from(this.state.categoriesExclude).toString());
    params.set('entriesSortByDate', this.state.entriesSortByDate.toString());
    this.setState({ total: -1 });
    const response = await fetch(
      `https://192.168.56.101:3333/dev/entries?${params.toString()}`
    ).then((res) => res.json());

    const categories = response.categories;
    const total = response.total;

    const categoryNames = categories.map(({ name }: { name: string }) => name);
    const categoryPercentages = categories.map((v: Category) => v.percentage);
    const categoryColors = categories.map((v: Category) => v.color);

    const data = {
      labels: categoryNames,
      datasets: [
        {
          label: 'expense',
          backgroundColor: categoryColors,
          data: categoryPercentages
        }
      ]
    };

    this.setState({ chartData: data });
    this.setState({ total: total });
    return { chartData: data, total };
  };

  async componentDidMount() {
    await this.fetchAndSetEntries();
  }

  changeHandler = async (isStart: boolean, dateStr: string) => {
    if (isStart) this.setState({ start: dateStr }, this.fetchAndSetEntries);
    else this.setState({ end: dateStr }, this.fetchAndSetEntries);
  };

  render() {
    return (
      <>
        <DatePickerInput isStart={true} value={this.state.start} onChange={this.changeHandler} />
        <i className="bi bi-arrow-right text-xl ml-3 mr-3" />
        <DatePickerInput isStart={false} value={this.state.end} onChange={this.changeHandler} />
        <h1 className="text-3xl font-bold">
          {this.state.total === -1 ? <>loading...</> : <>Total: {this.state.total}</>}
        </h1>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-auto max-w-screen-sm">
            <Pie data={this.state.chartData} />
          </div>
        </div>
      </>
    );
  }
}
