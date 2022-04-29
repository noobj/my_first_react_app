import { useContext } from 'react';
import { AppContext, DispatchType } from '../../App';

export function SortButton() {
  const appContext = useContext(AppContext);

  const handleClick = () => {
    appContext.dispatch({ type: DispatchType.Sort, value: !appContext.state.sortByDate });
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
