import { useContext } from 'react';
import { fetchOrRefreshAuth } from '../../helper';
import { AppContext, DispatchType } from '../../App';

function SyncButton() {
  const appContext = useContext(AppContext);

  const handleClick = () => {
    fetchOrRefreshAuth(`/entries/sync`, { method: 'POST' })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 401) appContext.dispatch({ type: DispatchType.Login, value: false });

        if (res.status === 301) window.location.href = res.message;

        if (res.status === 200) alert(res.message);
      });
  };

  return (
    <>
      <input
        title="Click to sync newest entries from Google drive."
        type="image"
        src="./google_drive.png"
        onClick={handleClick}
        className="absolute right-2 w-10 h-10"
      />
    </>
  );
}

export default SyncButton;
