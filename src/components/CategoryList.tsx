import { Component } from 'react';
import { formatToCurrency } from '../helper';
import { Category } from '../interfaces/Category.interface';

type Props = {
  category: Category;
};

export default class CategoryList extends Component<Props> {
  render() {
    return (
      <div
        className="grid-cols-4 grid font-bold text-xl font-sans"
        style={{ color: this.props.category.color }}
      >
        <span>{this.props.category.name}</span>
        <span>{`${this.props.category.percentage}%`}</span>
        <span>{`${formatToCurrency(this.props.category.sum)}`}</span>
      </div>
    );
  }
}
