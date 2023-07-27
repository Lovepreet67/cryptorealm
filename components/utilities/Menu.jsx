"use client";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  async function logout() {
    console.log("inside logout function");
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    });
    console.log(response.status);
    router.push("/");
  }
  return (
    <div
      className="absolute right-1 top-20 md:right-10 md:top-10 shadow-xl px-3 py-1 border-[1.5px] border-neutral-500 cursor-pointer rounded-full z-10 "
      onClick={logout}
    >
      <p>Logout</p>
    </div>
  );
}
