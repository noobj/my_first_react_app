import { Entry } from '../../interfaces/Entry.interface';
import { formatToCurrency } from '../../helper';

type Props = {
  entries: Partial<Entry>[];
};

export function EntryList(props: Props) {
  const entryList = props.entries.map((entry, key) => {
    if (entry.amount === undefined) entry.amount = 0;
    const bigAmountColor = entry.amount > 1000 ? 'text-red-400' : '';

    return (
      <div key={key} className={'grid-cols-5 grid ' + bigAmountColor}>
        <li>{formatToCurrency(entry.amount)}</li>
        <span>{entry.date}</span>
        <span>{entry.descr}</span>
      </div>
    );
  });

  return <>{entryList}</>;
}
