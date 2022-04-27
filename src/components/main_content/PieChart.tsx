import { Component } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Category } from '../../interfaces/Category.interface';

ChartJS.register(ArcElement, Tooltip, Legend);

let data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [122, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ]
    }
  ]
};

type Props = {
  start: string;
  end: string;
  categoriesExclude: Set<string>;
  entriesSortByDate: boolean;
};

type State = {
  total: number;
  chartData: any;
};

class PieChart extends Component<Props> {
  state: State = {
    total: 0,
    chartData: {
      datasets: []
    }
  };

  componentDidUpdate() {
    const params = new URLSearchParams();
    params.set('timeStart', this.props.start);
    params.set('timeEnd', this.props.end);
    params.set('categoriesExclude', Array.from(this.props.categoriesExclude).toString());
    params.set('entriesSortByDate', this.props.entriesSortByDate.toString());
    fetch(`https://192.168.56.101:3333/dev/entries?${params.toString()}`)
      .then((res) => res.json())
      .then((response) => {
        const categories = response.categories;
        const total = response.total;

        const categoryNames = categories.map(({ name }: { name: string }) => name);
        const categoryPercentages = categories.map((v: Category) => v.percentage);
        const categoryColors = categories.map((v: Category) => v.color);

        data = {
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
      });
  }

  render() {
    return <Pie data={this.state.chartData} />;
  }
}

export default PieChart;
