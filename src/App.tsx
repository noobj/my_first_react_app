import { createContext, useEffect, useReducer, useState } from 'react';
import { format, endOfMonth, startOfMonth } from 'date-fns';
import ControlPanel from './components/control_panel/ControlPanel';
import { MainContent } from './components/main_content/MainContent';
import Login from './components/login/Login';
import { fetchOrRefreshAuth } from './helper';

type InitialStateType = {
  start: string;
  end: string;
  sortColumn: SortColumn;
  isLogined: boolean;
};

export enum SortColumn {
  Amount = 0,
  Date
}

const initialState = {
  start: format(startOfMonth(new Date()), 'yyyy-MM-dd HH:mm'),
  end: format(endOfMonth(new Date()), 'yyyy-MM-dd HH:mm'),
  sortColumn: SortColumn.Amount,
  isLogined: true
};

export enum DispatchType {
  Date = 1,
  Sort,
  Login
}

function reducer(
  state: InitialStateType,
  action: { type: DispatchType; isStart?: boolean; value: string | boolean | SortColumn }
) {
  switch (action.type) {
    // TODO: check types
    case DispatchType.Date:
      if (action.isStart !== undefined && typeof action.value === 'string')
        return action.isStart ? { ...state, start: action.value } : { ...state, end: action.value };
      break;
    case DispatchType.Sort:
      if (typeof action.value == 'number' && action.value in SortColumn)
        return { ...state, sortColumn: action.value };
      break;
    case DispatchType.Login:
      if (typeof action.value === 'boolean') return { ...state, isLogined: action.value };
      break;
    default:
      return state;
  }

  return state;
}

export const AppContext = createContext<{
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

  useEffect(() => {
    async function fetchEntries() {
      const params = new URLSearchParams();
      params.set('timeStart', state.start);
      params.set('timeEnd', state.end);
      params.set('entriesSortByDate', state.sortColumn.toString());
      setTotal(-1);

      const res = await fetchOrRefreshAuth(`/entries?${params.toString()}`, {
        credentials: 'include'
      });
      if (res.status === 401) {
        dispatch({ type: DispatchType.Login, value: false });

        return null;
      }

      dispatch({ type: DispatchType.Login, value: true });
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

    if (state.isLogined) fetchContent();
  }, [state.start, state.end, state.isLogined, state.sortColumn]);

  if (!state.isLogined)
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        <Login />
      </AppContext.Provider>
    );

  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
        <ControlPanel />
      </AppContext.Provider>
      <MainContent categories={categories} total={total} />
    </>
  );
}
