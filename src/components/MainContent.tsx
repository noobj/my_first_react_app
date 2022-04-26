import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Category } from '../interfaces/Category.interface';
import CategoryList from './CategoryList';
import { formatToCurrency } from '../helper';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  categories: Category[];
  total: number;
};

export function MainContent(props: Props) {
  const categoryLists = props.categories.map((category) => {
    return <CategoryList key={category._id} category={category} />;
  });

  return (
    <div className="m-2">
      <h1 className="text-3xl font-bold">
        {props.total === -1 ? <>loading...</> : <>Total: {`${formatToCurrency(props.total)}`}</>}
      </h1>
      <div className="flex sm:flex-row">
        <div className="flex-auto max-w-screen-sm">
          <Pie data={turnCategoriesToChartData(props.categories)} />
        </div>
        <div className="grow flex-col">{categoryLists}</div>
      </div>
    </div>
  );
}

function turnCategoriesToChartData(categories: Category[]) {
  const categoryNames = categories.map(({ name }: { name: string }) => name);
  const categoryPercentages = categories.map((v: Category) => v.percentage);
  const categoryColors = categories.map((v: Category) => v.color);

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
}
