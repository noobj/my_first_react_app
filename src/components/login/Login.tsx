import LoginForm from './LoginForm';

function Login() {
  return (
    <div className="min-h-screen flex items-start justify-center dark:bg-gray-800 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xs w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="./favicon-96x96.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">AhorroJS</h2>
          <LoginForm />
          {/* <GoogleLoginButton /> */}
          {/* <FacebookLoginButton /> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
