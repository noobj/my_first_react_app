import LoginForm from './LoginForm';
import GoogleLoginButton from './GoogleLoginButton';

function Login() {
  return (
    <div className="justify-center dark:bg-gray-800 dark:text-white py-12 x-4 flex sm:px-6 lg:px-8">
      <div className="w-1/4 space-y-6 flex flex-col text-center">
        <img className="mx-auto h-12" src="./favicon-96x96.png" />
        <h2 className="text-3xl font-extrabold text-white-900">AhorroJS</h2>
        <LoginForm />
        <GoogleLoginButton />
        {/* <FacebookLoginButton /> */}
      </div>
    </div>
  );
}

export default Login;
