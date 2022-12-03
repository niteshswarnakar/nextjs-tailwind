import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (email, password) => {
    console.log(email, " - ", password);
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
          <button className="primary-button">Login</button>
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
