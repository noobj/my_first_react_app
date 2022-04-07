function GoogleLoginButton() {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  function handleClick() {
    const url = '/auth/login/google';
    fetch(`${baseUrl}${url}`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(async (res) => {
        const body = await res.json();
        const redirUrl = body.message;
        if (res.status !== 200) throw new Error(body.message);
        window.location.href = redirUrl;
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <>
      <button
        id="loginGoogle"
        onClick={handleClick}
        className="group relative py-2.5 text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-red-200 group-hover:text-red-100" viewBox="0 0 20 20">
            <g fill="none">
              <path
                d="M17.876 10.284c0-.574-.052-1.127-.147-1.657H10.1v3.134h4.36a3.726 3.726 0 01-1.617 2.444v2.033h2.618c1.531-1.41 2.415-3.487 2.415-5.954z"
                fill="#4285F4"
              ></path>
              <path
                d="M10.1 18.2c2.187 0 4.02-.725 5.36-1.962l-2.617-2.033c-.725.486-1.653.773-2.743.773-2.11 0-3.895-1.424-4.532-3.339H2.862v2.099A8.097 8.097 0 0010.1 18.2z"
                fill="#34A853"
              ></path>
              <path
                d="M5.568 11.639a4.869 4.869 0 01-.254-1.539c0-.534.092-1.053.254-1.539V6.462H2.862A8.097 8.097 0 002 10.1c0 1.307.313 2.544.862 3.638l2.706-2.099z"
                fill="#FBBC05"
              ></path>
              <path
                d="M10.1 5.222c1.19 0 2.257.408 3.096 1.21L15.52 4.11C14.117 2.803 12.283 2 10.1 2a8.097 8.097 0 00-7.238 4.462l2.706 2.099c.637-1.915 2.422-3.34 4.532-3.34z"
                fill="#EA4335"
              ></path>
              <path d="M2 2h16.2v16.2H2z"></path>
            </g>
          </svg>
        </span>
        Login via Google
      </button>
    </>
  );
}

export default GoogleLoginButton;
