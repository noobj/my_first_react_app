import { Entry } from './Entry.interface';

export interface Category {
  name: string;
  color: string;
  _id: string;
  percentage: string;
  entries: Entry[];
  sum: number;
}
