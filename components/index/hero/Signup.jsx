import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Signup() {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
    };
    const jsonData = JSON.stringify(data);
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const result = await response.json();
    if (result.invalidUserName) {
      setValid(false);
    } else {
      const loginResponse = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const loginResult = await loginResponse.json();
      router.push("/dashboard");
    }
  }
  const [valid, setValid] = useState(true);
  return (
    <div
      className={"flex-col min-w-full max-h-full max-w-full text-center p-10"}
    >
      <h1 className="text-3xl font-bold ">CryptoRealm</h1>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className=" space-y-8 w-[100%] mt-10 text-2xl"
      >
        <div className="mb-0">
          <input
            className="input"
            type="text"
            name="username"
            placeholder="username"
          />
          {valid || (
            <p className="text-xs text-red-400 mb-0">username not available </p>
          )}
        </div>
        <input
          className="input"
          type="password"
          name="password"
          placeholder="password"
        />
        <br />
        <input
          type="email"
          className="input"
          name="email"
          placeholder="Email address"
        />
        <br />
        <input className="button" type="submit" value="Signup" />
      </form>
    </div>
  );
}
