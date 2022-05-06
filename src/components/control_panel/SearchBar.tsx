import { ChangeEvent, useContext } from 'react';
import { AppContext, DispatchType } from '../../App';

export function SearchBar() {
  const appContext = useContext(AppContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    appContext.dispatch({ type: DispatchType.Search, value: e.target.value });
  };

  return (
    <>
      <input
        onChange={handleChange}
        className={`rounded-lg font-semibold text-l ml-3 p-1 text-black`}
        type="text"
        placeholder="Search Text"
      />
    </>
  );
}
