import { formatToCurrency } from '../../helper';
import { Category } from '../../interfaces/Category.interface';
import { EntryList } from './EntryList';

type Props = {
  category: Category;
  onClick: () => void;
  categoryOpened: number;
};

export default function CategoryList(props: Props) {
  return (
    <>
      <div
        onClick={props.onClick}
        className="grid-cols-4 grid font-bold text-xl font-sans"
        style={{ color: props.category.color }}
      >
        <span>{props.category.name}</span>
        <span>{`${props.category.percentage}%`}</span>
        <span>{`${formatToCurrency(props.category.sum)}`}</span>
      </div>
      {props.categoryOpened === props.category._id && (
        <EntryList entries={props.category.entries}></EntryList>
      )}
    </>
  );
}
