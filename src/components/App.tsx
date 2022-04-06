import { useEffect, useState } from 'react';
import { format, endOfMonth, startOfMonth, startOfYear } from 'date-fns';
import ControlPanel from './ControlPanel';
import { MainContent } from './MainContent';

export function App() {
  const [start, setStart] = useState(format(startOfYear(new Date()), 'yyyy-MM-dd'));
  const [end, setEnd] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoriesExclude, setCategoriesExclude] = useState(new Set());
  const [entriesSortByDate, setEntriesSortByDate] = useState(false);

  async function fetchEntries() {
    const params = new URLSearchParams();
    params.set('timeStart', start);
    params.set('timeEnd', end);
    params.set('categoriesExclude', Array.from(categoriesExclude).toString());
    params.set('entriesSortByDate', entriesSortByDate.toString());
    setTotal(-1);

    const response = await fetch(
      `https://192.168.56.101:3333/dev/entries?${params.toString()}`
    ).then((res) => res.json());

    const { categories, total } = response;

    return [categories, total];
  }

  useEffect(() => {
    fetchEntries().then(([categoriesResult, total]) => {
      setCategories(categoriesResult);
      setTotal(total);
    });
  }, [start, end]);

  const changeHandler = async (isStart: boolean, dateStr: string) => {
    if (isStart) setStart(dateStr);
    else setEnd(dateStr);
  };

  return (
    <>
      <ControlPanel start={start} end={end} changeHandler={changeHandler} />
      <MainContent categories={categories} total={total} />
    </>
  );
}
