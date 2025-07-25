import EmailPasswordLogin from "../components/auth/EmailPasswordLoginForm";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import GitHubSignIn from "../components/auth/GithubAuth";

function Login() {
  return (
    <div className=" flex flex-col min-h-screen absolute inset-0 items-center justify-center bg-gradient-to-b from-[#1f3756] to-[#141539]">
      <EmailPasswordLogin />
      <div className="flex gap-3 mx-3">
        <GitHubSignIn />
        <GoogleAuthButton />
      </div>
    </div>
  );
}

export default Login;
