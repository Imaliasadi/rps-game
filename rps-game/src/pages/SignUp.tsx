import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import SignUpForm from "../components/auth/EmailSignUpForm";
import GitHubSignIn from "../components/auth/GithubAuth";

function SignUp() {
  return (
    <div className="min-h-screen absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#1f3756] to-[#141539]">
      <div className="sm:w-xl">
        <SignUpForm />
        <div className="flex gap-3 mx-3">
          <GitHubSignIn />
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
