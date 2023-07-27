import React, { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  // handler function
  async function handleSubmit(event) {
    event.preventDefault();
    // preparing data for request
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    const jsonData = JSON.stringify(data);
    // sending request
    const promise = fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const t = toast.loading("Loging In ...");
    const response = await promise;
    const result = await response.json();
    // err handling
    if (result.invalidUserName) {
      toast.dismiss(t);
      setValid(false);
    } else if (response.status == 404) {
      toast.dismiss(t);
      toast.error("Something went wrong");
      console.log(result.err);
    } else {
      toast.dismiss(t);
      toast.success("Logged In");
      router.push("/dashboard");
      console.log(result);
    }
  }
  // for showing err
  const [valid, setValid] = useState(true);
  return (
    <div className={"flex-col text-center m-auto p-10"}>
      <h1 className="text-3xl font-bold ">CryptoRealm</h1>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className=" space-y-10 w-[100%] mt-10 text-2xl"
      >
        <input
          className="input"
          type="text"
          name="username"
          required
          placeholder="username"
        />
        <br />
        <input
          className="input"
          type="password"
          name="password"
          required
          placeholder="password"
        />
        <br />
        <div className="space-y-2">
          {valid || (
            <p className="text-xs text-red-500">invalid username or password</p>
          )}
          <input className="inline-block button" type="submit" value="login" />
        </div>
      </form>
    </div>
  );
}
