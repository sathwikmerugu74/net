import OTPLogin from "./OTPLogin";
import GoogleLoginButton from "./GoogleLoginButton";

function LoginOptions() {
  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-12 space-y-6">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <OTPLogin />
      <div className="text-center text-gray-400">OR</div>
      <GoogleLoginButton />
    </div>
  );
}

export default LoginOptions;
