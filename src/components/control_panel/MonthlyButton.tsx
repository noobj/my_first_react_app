import { SyntheticEvent, useContext } from 'react';
import { format, startOfMonth, endOfMonth, sub, add } from 'date-fns';
import { AppContext, DispatchType } from '../../App';

export function MonthlyButton(props: { isLast: boolean }) {
  const color = props.isLast ? 'lime' : 'indigo';
  const appContext = useContext(AppContext);

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const baseDate = props.isLast
      ? sub(new Date(appContext.state.start), { months: 1 })
      : add(new Date(appContext.state.start), { months: 1 });

    const start = format(startOfMonth(baseDate), 'yyyy-MM-dd');
    const end = format(endOfMonth(baseDate), 'yyyy-MM-dd');

    appContext.dispatch({ type: DispatchType.Date, isStart: true, value: start });
    appContext.dispatch({ type: DispatchType.Date, isStart: false, value: end });
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
