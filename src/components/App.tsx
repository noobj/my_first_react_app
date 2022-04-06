import { useEffect, useState } from 'react';
import { format, endOfMonth, startOfMonth, startOfYear } from 'date-fns';
import ControlPanel from './ControlPanel';
import { MainContent } from './MainContent';
import Login from './login/Login';

export function App() {
  const [start, setStart] = useState(format(startOfYear(new Date()), 'yyyy-MM-dd'));
  const [end, setEnd] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoriesExclude, setCategoriesExclude] = useState(new Set());
  const [entriesSortByDate, setEntriesSortByDate] = useState(false);
  const [isLogined, setIsLogined] = useState(true);

  async function fetchEntries() {
    const params = new URLSearchParams();
    params.set('timeStart', start);
    params.set('timeEnd', end);
    params.set('categoriesExclude', Array.from(categoriesExclude).toString());
    params.set('entriesSortByDate', entriesSortByDate.toString());
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

  useEffect(() => {
    async function fetchContent() {
      const result = await fetchEntries();
      if (result === null) return;

      const { categories, total } = result;
      setCategories(categories);
      setTotal(total);
    }

    fetchContent();
  }, [start, end]);

  const changeHandler = async (isStart: boolean, dateStr: string) => {
    if (isStart) setStart(dateStr);
    else setEnd(dateStr);
  };

  if (!isLogined) return <Login />;

  return (
    <>
      <ControlPanel start={start} end={end} changeHandler={changeHandler} />
      <MainContent categories={categories} total={total} />
    </>
  );
}
