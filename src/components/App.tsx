import { Component } from 'react';
import { format, endOfMonth, startOfMonth, startOfYear } from 'date-fns';
import { Category } from '../interfaces/Category.interface';
import ControlPanel from './ControlPanel';
import { MainContent } from './MainContent';

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

  render() {
    return (
      <>
        <ControlPanel
          start={this.state.start}
          end={this.state.end}
          changeHandler={this.changeHandler}
        />
        <MainContent categories={this.state.categories} total={this.state.total} />
      </>
    );
  }
}
