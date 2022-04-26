import { createContext, useEffect, useReducer, useState } from 'react';
import { format, endOfMonth, startOfMonth } from 'date-fns';
import ControlPanel from './control_panel/ControlPanel';
import { MainContent } from './MainContent';
import Login from './login/Login';

type InitialStateType = {
  start: string;
  end: string;
};

const initialState = {
  start: format(startOfMonth(new Date()), 'yyyy-MM-dd HH:mm'),
  end: format(endOfMonth(new Date()), 'yyyy-MM-dd HH:mm')
};

function reducer(
  state: { start: string; end: string },
  action: { isStart: boolean; value: string }
) {
  switch (action.isStart) {
    case true:
      return { ...state, start: action.value };
    case false:
      return { ...state, end: action.value };
    default:
      return state;
  }
}

export const DateContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoriesExclude, setCategoriesExclude] = useState(new Set());
  const [entriesSortByDate, setEntriesSortByDate] = useState(false);
  const [isLogined, setIsLogined] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      const params = new URLSearchParams();
      params.set('timeStart', state.start);
      params.set('timeEnd', state.end);
      setTotal(-1);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;

      const res = await fetch(`${backendUrl}/entries?${params.toString()}`, {
        credentials: 'include'
      });
      if (res.status === 401) {
        setIsLogined(false);

        return null;
      }

      setIsLogined(true);
      const { categories, total } = await res.json();
      return { categories, total };
    }

    async function fetchContent() {
      const result = await fetchEntries();
      if (result === null) return;

      const { categories, total } = result;
      setCategories(categories);
      setTotal(total);
    }

    fetchContent();
  }, [state]);

  if (!isLogined) return <Login />;

  return (
    <>
      <DateContext.Provider value={{ state, dispatch }}>
        <ControlPanel />
      </DateContext.Provider>
      <MainContent categories={categories} total={total} />
    </>
  );
}
