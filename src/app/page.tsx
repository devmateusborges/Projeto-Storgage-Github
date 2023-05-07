"use client";
import { AppCardRepo } from "@/components/AppCardRepo";
import { AppNavBar } from "@/components/AppNavBar";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { RootState } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { getLocalStorage } = useLocalStorage();
  const [selectUserName, setSelectUserName] = useState("");
  //=====================================
  useEffect(() => {
    veryLogin();
  }, []);

  //=====================================

  const veryLogin = async () => {
    const userName: string = await getLocalStorage("selectUser", "get_string");
    const name =
      userName == null
        ? await getLocalStorage("selectUser", "devmateusborges")
        : userName;

    setSelectUserName(name);
  };

  return (
    <main className="flex h-screen flex-col  p-2">
      <div className="w-[95%]  flex flex-col md:flex-row  gap-x-2">
        <div className="w-full md:w-[26%]  flex flex-col  items-center">
          <AppNavBar />
        </div>
        <div className="w-full  flex flex-col bg-zinc-700/20 rounded-lg p-2 ">
          <AppCardRepo />
        </div>
      </div>
    </main>
  );
}
