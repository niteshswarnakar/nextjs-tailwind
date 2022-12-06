import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    //use effect ta run vaxaina aile samma because session is always undefined
    console.log("session vaneko : ", session);
    console.log("hamro user : ", session?.user);
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (formData) => {
    console.log("entered email : ", formData.email);
    console.log("entered password : ", formData.password);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (err) {
      console.log(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onClick={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <div>
            <input
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              className="mt-1 w-96"
              type="email"
              id="email"
              autoFocus
            />
            {errors.email && (
              <div className="text-red-500">
                {JSON.stringify(errors.email.message)}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <div>
            <input
              {...register("password", {
                required: "Please enter your password",
                minLength: { value: 6, message: "at least 6 characters" },
              })}
              className="mt-1 w-96"
              type="password"
              id="password"
            />
            {errors.password && (
              <div className="text-red-500">
                {JSON.stringify(errors.password.message)}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 ">
          <button type="submit" className="primary-button">
            Login
          </button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account ? &nbsp;
          <Link href="/register" legacyBehavior>
            <a className="primary-button-outline">register</a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
