import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../firebase/fireBase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

// Validation schema with zod
const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Maximum password is 16 characters")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
});

type FormData = z.infer<typeof formSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const onSubmit = async (data: FormData) => {
    setFirebaseError("");
    setSuccessMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Send verification email
      await sendEmailVerification(userCredential.user);

      setSuccessMessage(
        "Registration successful! Please check your email box to verify your account (don't forget spam folder), then comeback and login with your email and password. "
      );
    } catch (error) {
      if (error instanceof Error) setFirebaseError(error.message);
      else setFirebaseError("somthing went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-cyan-700 shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      {successMessage && (
        <div className="text-green-600 text-center font-medium">{successMessage}</div>
      )}

      {firebaseError && !successMessage && (
        <div className="text-red-500 text-center font-medium">{firebaseError}</div>
      )}
    </div>
  );
};

export default SignUp;
