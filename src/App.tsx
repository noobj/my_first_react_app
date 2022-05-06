import { createContext, useEffect, useReducer, useState } from 'react';
import { format, endOfMonth, startOfMonth } from 'date-fns';
import ControlPanel from './components/control_panel/ControlPanel';
import { MainContent } from './components/main_content/MainContent';
import Login from './components/login/Login';
import { Category } from './interfaces/Category.interface';
import { fetchOrRefreshAuth } from './helper';
import { Entry } from './interfaces/Entry.interface';

const initialState = {
  start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
  end: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
  sortByDate: false,
  isLogined: true,
  searchString: ''
};

type InitialStateType = typeof initialState;

export enum DispatchType {
  Date = 1,
  SortByDate,
  SortByAmount,
  Login,
  Logout,
  Search
}

type ActionType =
  | { type: DispatchType.Date; isStart: boolean; value: string }
  | {
      type:
        | DispatchType.Login
        | DispatchType.Logout
        | DispatchType.SortByAmount
        | DispatchType.SortByDate;
    }
  | {
      type: DispatchType.Search;
      value: string;
    };

function reducer(state: InitialStateType, action: ActionType) {
  switch (action.type) {
    case DispatchType.Date:
      if (typeof action.value === 'string')
        return action.isStart ? { ...state, start: action.value } : { ...state, end: action.value };
      break;
    case DispatchType.SortByAmount:
      return { ...state, sortByDate: false };
    case DispatchType.SortByDate:
      return { ...state, sortByDate: true };
    case DispatchType.Login:
      return { ...state, isLogined: true };
    case DispatchType.Logout:
      return { ...state, isLogined: false };
    case DispatchType.Search:
      return { ...state, searchString: action.value };
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [categoriesExclude, setCategoriesExclude] = useState(new Set());

  useEffect(() => {
    async function fetchEntries() {
      const params = new URLSearchParams();
      params.set('timeStart', state.start);
      params.set('timeEnd', state.end);
      setTotal(-1);

      const res = await fetchOrRefreshAuth(`/entries?${params.toString()}`, {
        credentials: 'include'
      });

      if (res.status === 401) {
        dispatch({ type: DispatchType.Logout });

        return null;
      }

      const { categories, total } = await res.json();
      return { categories, total };
    }

    async function fetchContent() {
      const result = await fetchEntries();
      if (result === null) return;

      const categories = result.categories;
      let total = result.total;
      let newCategories = sortCategories(categories);

      setCategories(newCategories);
      setTotal(total);

      if (state.searchString !== '') {
        const result = filterCategories(categories);
        newCategories = sortCategories(result.categories);
        total = result.total;
        setFilteredCategories(newCategories);
        setFilteredTotal(total);
      }
    }

    if (state.isLogined) fetchContent();
  }, [state.start, state.end, state.isLogined]);

  useEffect(() => {
    const newCategories = sortCategories(categories);

    if (state.searchString !== '') setFilteredCategories(sortCategories(filteredCategories));

    setCategories(newCategories);
  }, [state.sortByDate]);

  useEffect(() => {
    if (state.searchString === '') return;

    const { categories: newCategories, total } = filterCategories(categories);

    setFilteredCategories(newCategories);
    setFilteredTotal(total);
  }, [state.searchString]);

  function filterCategories(categories: Category[]) {
    const filteredCategories = categories.reduce<Category[]>((collection, category) => {
      const filteredEntries = category.entries.filter(
        (entry) => entry.descr.match(new RegExp(state.searchString)) != null
      );

      if (filteredEntries.length === 0) return collection;

      category.entries = filteredEntries;
      category.sum = category.entries.reduce((sum, v) => sum + v.amount, 0);
      return [...collection, category];
    }, []);

    const total = filteredCategories.reduce((sum, v) => sum + v.sum, 0);

    return {
      categories: filteredCategories,
      total
    };
  }

  function sortCategories(categories: Category[]) {
    let sortFunction: (a: Entry, b: Entry) => number;
    if (state.sortByDate)
      sortFunction = (a: Entry, b: Entry) =>
        +format(new Date(b.date), 't') - +format(new Date(a.date), 't');
    else sortFunction = (a: Entry, b: Entry) => b.amount - a.amount;
    return categories.map((category) => {
      category.entries = category.entries.sort(sortFunction);
      return category;
    });
  }

  if (!state.isLogined)
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        <Login />
      </AppContext.Provider>
    );

  const categoriesForContent = state.searchString === '' ? categories : filteredCategories;
  const totalForContent = state.searchString === '' ? total : filteredTotal;

  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
        <ControlPanel />
      </AppContext.Provider>
      <MainContent categories={categoriesForContent} total={totalForContent} />
    </>
  );
}
