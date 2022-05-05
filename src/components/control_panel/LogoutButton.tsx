import { useContext } from 'react';
import { AppContext, DispatchType } from '../../App';
import { fetchOrRefreshAuth } from '../../helper';

function LogoutButton() {
  const appContext = useContext(AppContext);

  const handleClick = async () => {
    const res = await fetchOrRefreshAuth(`/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (res.status === 401) {
      appContext.dispatch({ type: DispatchType.Logout });

      return null;
    }

    appContext.dispatch({ type: DispatchType.Logout });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`rounded-lg font-semibold text-l ml-3 p-1 bg-red-500 hover:bg-red-600`}
      >
        Logout
      </button>
    </>
  );
}

export default LogoutButton;
