import { Entry } from './Entry.interface';

export interface Category {
  name: string;
  color: string;
  _id: number;
  percentage: string;
  entries: Partial<Entry>[];
  sum: number;
}
