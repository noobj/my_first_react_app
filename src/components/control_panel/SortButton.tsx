import { useContext } from 'react';
import { AppContext, DispatchType, SortColumn } from '../../App';

export function SortButton() {
  const appContext = useContext(AppContext);

  const handleClick = () => {
    const sortColumnLength = Object.keys(SortColumn).length / 2;
    const nextSortColumn = (appContext.state.sortColumn + 1) % sortColumnLength;
    appContext.dispatch({ type: DispatchType.Sort, value: nextSortColumn });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`rounded-lg font-semibold text-l ml-3 p-1 bg-yellow-500 hover:bg-yellow-600`}
      >
        Sort
      </button>
    </>
  );
}
