import { formatToCurrency } from '../helper';
import { Category } from '../interfaces/Category.interface';

type Props = {
  category: Category;
};

export default function CategoryList(props: Props) {
  return (
    <div
      className="grid-cols-4 grid font-bold text-xl font-sans"
      style={{ color: props.category.color }}
    >
      <span>{props.category.name}</span>
      <span>{`${props.category.percentage}%`}</span>
      <span>{`${formatToCurrency(props.category.sum)}`}</span>
    </div>
  );
}
