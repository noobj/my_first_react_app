import { SyntheticEvent, useContext, useState } from 'react';
import { AppContext } from '../App';

function LoginForm() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const appContext = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  function handleAccountChange(event: SyntheticEvent<HTMLInputElement>) {
    setAccount(event.currentTarget.value);
  }

  function handlePasswordChange(event: SyntheticEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  function handleDefaultSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function handleSubmitClick() {
    const url = '/auth/login';

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      credentials: 'include',
      body: new URLSearchParams({
        account: account,
        password: password
      })
    });

    const body = await res.json();
    if (res.status !== 200) {
      alert(body.message);
      return;
    }

    appContext.setIsLogined(true);
  }

  return (
    <>
      <form onSubmit={handleDefaultSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="account" className="sr-only">
              Account
            </label>
            <input
              id="account"
              name="account"
              type="text"
              onChange={handleAccountChange}
              required
              className="text-center appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Account"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handlePasswordChange}
              autoComplete="on"
              required
              className="text-center appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
      </form>
      <button
        type="submit"
        onClick={handleSubmitClick}
        className="group relative py-2.5 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-red-200 group-hover:text-red-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        Sign in
      </button>
    </>
  );
}

export default LoginForm;
