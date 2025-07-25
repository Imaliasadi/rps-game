import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import SignUpForm from "../components/auth/EmailSignUpForm";

function SignUp() {
  return (
    <div>
      <SignUpForm />
      <GoogleAuthButton />
    </div>
  );
}

export default SignUp;
