import { PrimaryButton } from "../../utility";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// own function
import auth from "../../apiclient/auth.ts";
import { useNavigate } from "react-router-dom";

// types for the forms
export interface LoginFormData {
  username: string;
  password: string;
}
const LoginFormSchema: ZodType<LoginFormData> = z.object({
  username: z.string().min(1, { message: "Please Enter username" }),
  password: z.string().min(1, { message: "Please Enter password" }),
});
export interface SignupFormData extends LoginFormData {
  email: string;
  passwordCopy: string;
}
const SignupFormSchema: ZodType<SignupFormData> = z
  .object({
    username: z.string().min(1, { message: "Please Enter username" }),
    password: z.string().min(1, { message: "Please Enter password" }),
    passwordCopy: z.string().min(1, { message: "Confirm password" }),
    email: z.string().email({ message: "Please enter valid email" }),
  })
  .refine((data) => data.passwordCopy == data.password, {
    message: "Passwords not matching",
    path: ["passwordCopy"],
  });

function Login({ visible }: { visible: boolean }) {
  const navigate = useNavigate();
  // use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginFormSchema) });

  const loginHandler = useCallback(
    async (data: LoginFormData) => {
      const result = await auth.login(data);
      if (result?.err?.length > 0)
        return setError("username", { message: result.err });
      navigate("/dashboard");
    },
    [navigate, setError],
  );
  return (
    <div
      className={
        "flex md:gap-10 justify-center shadow-md rounded-xl p-10 transform duration-500 z-20 " +
        (visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0")
      }
    >
      <div
        className={
          "flex flex-col justify-center items-center gap-y-5 bg-white shadow-md rounded-xl p-10 py-3 md:p-0 md:shadow-none md:rounded-none "
        }
      >
        <h3 className={"font-bold text-xl"}>Welcome Back!</h3>
        <input
          className={"border-b-2 outline-none"}
          placeholder={"Username"}
          type={"text"}
          {...register("username")}
        />
        <input
          className={"border-b-2 outline-none"}
          placeholder={"Password"}
          type={"password"}
          unselectable={"on"}
          {...register("password")}
        />
        <p className={"self-start text-rose-500 -my-3"}>
          {errors.username?.message || errors.password?.message || "\u2800"}
        </p>
        <PrimaryButton title={"Login"} onClick={handleSubmit(loginHandler)} />
      </div>
    </div>
  );
}

function Signup({ visible }: { visible: boolean }) {
  const navigate = useNavigate();
  // use form hook
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<SignupFormData>({ resolver: zodResolver(SignupFormSchema) });

  const signupHandler = useCallback(
    async (data) => {
      const result = await auth.signup(data);
      if (result?.err?.length > 0)
        return setError("username", {
          message: result.err,
        });
      //   store jwt in the local storage
      navigate("/dashboard", {});
    },
    [navigate, setError],
  );

  return (
    <div
      className={
        "flex md:gap-10 justify-center shadow-md rounded-xl p-10 py-3 md:py-7 transform  duration-500 z-20  " +
        (visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")
      }
    >
      <div
        className={
          "flex flex-col justify-center items-center gap-y-5 bg-white shadow-md rounded-xl p-10 py-3 md:p-0 md:shadow-none md:rounded-none  "
        }
      >
        <h3 className={"font-bold text-xl"}>Enter Realm!</h3>
        <input
          className={"border-b-2 outline-none "}
          placeholder={"Username"}
          type={"text"}
          {...register("username")}
        />
        <input
          className={"border-b-2 outline-none"}
          placeholder={"Email"}
          type={"email"}
          {...register("email")}
        />
        <input
          className={"border-b-2 outline-none"}
          placeholder={"Password"}
          type={"password"}
          unselectable
          {...register("password")}
        />
        <input
          className={"border-b-2 outline-none"}
          placeholder={"Re enter Password"}
          type={"password"}
          unselectable
          {...register("passwordCopy")}
        />
        <p className={"self-start text-rose-500 -my-3"}>
          {errors.email?.message ||
            errors.username?.message ||
            errors.password?.message ||
            errors.passwordCopy?.message ||
            "\u2800"}
        </p>
        <PrimaryButton
          title={"Sign Up"}
          onClick={handleSubmit(signupHandler)}
        />
      </div>
    </div>
  );
}

function HeroImage({ state }: { state: string }) {
  const [component, setComponent] = useState(state);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setComponent(state);
      setTimeout(() => setVisible(true), 100);
    }, 400);
  }, [state]);

  return (
    <div
      className={" h-full w-full  flex items-center justify-center self-center"}
    >
      {component == "image" ? (
        <div
          className={
            "hidden md:flex md:gap-10 justify-center transform  duration-500 " +
            (visible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0")
          }
        >
          <img className={"w-[25%]"} src={"/images/bitcoin.svg"} />
          <img className={"w-[25%]"} src={"/images/ethereum-1.svg"} />
        </div>
      ) : component == "login" ? (
        <Login visible={visible} />
      ) : (
        <Signup visible={visible} />
      )}
    </div>
  );
}

export default HeroImage;
