import { useContext } from 'react';
import { fetchOrRefreshAuth } from '../../helper';
import { AppContext, DispatchType } from '../../App';

function SyncButton() {
  const appContext = useContext(AppContext);

  const handleClick = () => {
    fetchOrRefreshAuth(`/sync`).then(async (res) => {
      if (res.status === 401) appContext.dispatch({ type: DispatchType.Logout });

      if (res.status === 301) window.location.href = await res.text();

      if (res.status === 200) longPolling(await res.json());
    });
  };

  const longPolling = async (taskId: string) => {
    await fetchOrRefreshAuth(`/sync/check?taskId=${taskId}`).then(async (res) => {
      if (res.status === 401) appContext.dispatch({ type: DispatchType.Logout });

      if (res.status !== 200) {
        console.log(res);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await longPolling(taskId);
      }

      if (res.status === 200) {
        const body = await res.json();
        if (body === '1') {
          alert('Sync Done');

          window.location.href = '/';
        } else alert('Sync Failed');
      }
    });

    return;
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
