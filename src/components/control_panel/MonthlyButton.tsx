import { SyntheticEvent, useContext } from 'react';
import { format, startOfMonth, endOfMonth, sub, add } from 'date-fns';
import { DateContext } from '../App';

export function MonthlyButton(props: { isLast: boolean }) {
  const color = props.isLast ? 'lime' : 'indigo';
  const dateContext = useContext(DateContext);

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const baseDate = props.isLast
      ? sub(new Date(dateContext.state.start), { months: 1 })
      : add(new Date(dateContext.state.start), { months: 1 });

    const start = format(startOfMonth(baseDate), 'yyyy-MM-dd');
    const end = format(endOfMonth(baseDate), 'yyyy-MM-dd');

    dateContext.dispatch({ isStart: true, value: start });
    dateContext.dispatch({ isStart: false, value: end });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`rounded-lg font-semibold text-l ml-3 p-1 bg-${color}-500 hover:bg-${color}-600`}
      >
        {props.isLast ? 'Last Month' : 'Next Month'}
      </button>
    </>
  );
}
