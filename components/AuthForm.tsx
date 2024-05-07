"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function AuthForm({ type }: { type: string }) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);
    console.log(values);
    setisLoading(false);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" alt="logo" width={36} height={36} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>

          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">plaidLink</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
                    <CustomInput
                      control={form.control}
                      label="First Name"
                      name="firstName"
                      placeholder="ex: John"
                    />

                    <CustomInput
                      control={form.control}
                      label="Last Name"
                      name="lastName"
                      placeholder="ex: Doe"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    label="Address"
                    name="address1"
                    placeholder="Enter your specific address"
                  />

                  <div className="flex gap-4 flex-col md:flex-row">
                    <CustomInput
                      control={form.control}
                      label="Town"
                      name="town"
                      placeholder="ex: Nairobi"
                    />

                    <CustomInput
                      control={form.control}
                      label="Postal Code"
                      name="postalCode"
                      placeholder="ex: 12567"
                    />
                  </div>

                  <div className="flex gap-4 flex-col md:flex-row">
                    <CustomInput
                      control={form.control}
                      label="Date of Birth"
                      name="dateOfBirth"
                      placeholder="yyyy-mm-dd"
                    />
                    <CustomInput
                      control={form.control}
                      label="ID Number"
                      name="idNumber"
                      placeholder="1234****"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      &nbsp;
                      {type === "sign-in" ? "Signing in..." : "Signing up..."}
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Dont't have an account?"
                : "Already have an account?"}
            </p>

            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default AuthForm;
