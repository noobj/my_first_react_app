import { Component } from 'react';
import { format, endOfMonth, startOfMonth, startOfYear } from 'date-fns';
import DatePickerInput from './DatePickerInput';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Category } from '../interfaces/Category.interface';
import CategoryList from './CategoryList';

ChartJS.register(ArcElement, Tooltip, Legend);

type AppState = {
  start: string;
  end: string;
  total: number;
  categories: Category[];
  categoriesExclude: Set<string>;
  entriesSortByDate: boolean;
};

export default class App extends Component<unknown, AppState> {
  state: AppState = {
    start: format(startOfYear(new Date()), 'yyyy-MM-dd'),
    end: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
    total: 0,
    categories: [],
    categoriesExclude: new Set(),
    entriesSortByDate: false
  };

  fetchEntries = async () => {
    const params = new URLSearchParams();
    params.set('timeStart', this.state.start);
    params.set('timeEnd', this.state.end);
    params.set('categoriesExclude', Array.from(this.state.categoriesExclude).toString());
    params.set('entriesSortByDate', this.state.entriesSortByDate.toString());
    this.setState({ total: -1 });
    const response = await fetch(
      `https://192.168.56.101:3333/dev/entries?${params.toString()}`
    ).then((res) => res.json());

    const { categories, total } = response;

    return { categories, total };
  };

  async componentDidMount() {
    const { categories, total } = await this.fetchEntries();

    this.setState({ categories: categories });
    this.setState({ total: total });
  }

  changeHandler = (isStart: boolean, dateStr: string) => {
    const cbAfterDateChanged = () =>
      this.fetchEntries().then(({ categories, total }) => {
        this.setState({ categories: categories });
        this.setState({ total: total });
      });

    if (isStart) this.setState({ start: dateStr }, cbAfterDateChanged);
    else this.setState({ end: dateStr }, cbAfterDateChanged);
  };

  turnCategoriesToChartData = () => {
    const categoryNames = this.state.categories.map(({ name }: { name: string }) => name);
    const categoryPercentages = this.state.categories.map((v: Category) => v.percentage);
    const categoryColors = this.state.categories.map((v: Category) => v.color);

    return {
      labels: categoryNames,
      datasets: [
        {
          label: 'expense',
          backgroundColor: categoryColors,
          data: categoryPercentages
        }
      ]
    };
  };

  render() {
    const chartData = this.turnCategoriesToChartData();
    const categories = this.state.categories;
    const categoryLists = categories.map((category) => {
      return <CategoryList key={category._id} category={category} />;
    });

    return (
      <>
        <div className="border-b border-slate-900/10 dark:border-slate-300/10">
          <div className="m-2 relative flex items-center">
            <input
              type="image"
              src="./favicon-96x96.png"
              onClick={() => window.location.reload()}
              className="w-10 align-bottom mr-2"
            />
            <DatePickerInput
              isStart={true}
              value={this.state.start}
              onChange={this.changeHandler}
            />
            <i className="bi bi-arrow-right text-xl ml-3 mr-3" />
            <DatePickerInput isStart={false} value={this.state.end} onChange={this.changeHandler} />
          </div>
        </div>
        <div className="m-2">
          <h1 className="text-3xl font-bold">
            {this.state.total === -1 ? <>loading...</> : <>Total: {this.state.total}</>}
          </h1>
          <div className="flex flex-col sm:flex-row">
            <div className="flex-auto max-w-screen-sm">
              <Pie data={chartData} />
            </div>
            <div className="flex-auto flex-col">{categoryLists}</div>
          </div>
        </div>
      </>
    );
  }
}
