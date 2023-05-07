"use client";
// https://api.github.com/users/devmateusborges
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  BookMarked,
  Github,
  UserPlus,
  ChevronRight,
  Trash,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { addProfileUsers, removeProfileUseres } from "@/store/utilStore";

import { create_UUID } from "@/utils/funcUtils";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { AppListUser } from "./AppListUser";
import { GithubService } from "@/service/service";

export function AppNavBar() {
  const [gitHub, setGitHub] = useState({
    name: "user",
    login: "usuario",
    public_repos: 0,
    followers: 0,
    avatar_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [addName, setaddName] = useState("");
  const dispatch = useDispatch();
  const select = useSelector((state: RootState) => state.util.userSelect);
  const { getLocalStorage } = useLocalStorage();

  //=====================================
  useEffect(() => {
    handlerApi();
  }, [select]);
  useEffect(() => {
    handlerApi();
  }, []);

  //=====================================

  const handlerApi = async () => {
    const userName: string = await getLocalStorage("selectUser", "get_string");
    const res = await GithubService.Profile(userName);
    setGitHub(res);
    setLoading(false);
  };

  //=====================================

  const onSubmit = (event: any) => {
    event.preventDefault();
    const newArr = {
      id: create_UUID(),
      name: event.target[0].value,
    };
    dispatch(addProfileUsers(newArr));
    setaddName("");
  };

  //=====================================
  return (
    <div className="w-full md:h-screen flex flex-col">
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-row items-center justify-center gap-2"
      >
        <input
          className="bg-white/20 rounded-lg p-2 outline-none border focus:border-green-500"
          type="text"
          placeholder="Buscar usuario"
          onChange={(e) => setaddName(e.target.value)}
          value={addName}
          required
        />
        <button
          type="submit"
          className="bg-green-500 p-2 rounded-lg hover:bg-green-700"
        >
          <UserPlus className="text-sm" />
        </button>
      </form>

      <div className="w-full flex flex-col items-center justify-center mt-2 md:gap-y-5  rounded-xl p-5 bg-zinc-700 shadow-lg shadow-zinc-850 ">
        <Image
          className="rounded-full border-violet-700 border-2"
          src={gitHub?.avatar_url}
          width={150}
          height={150}
          alt="Image perfil"
        />
        <div className="w-full flex flex-col divide-y divide-solid divide-zinc-400">
          <div className="w-full ">
            <h1 className="font-extrabold">
              {gitHub?.name ? gitHub?.name : ""}
            </h1>
            <h1 className="text-sm ">{gitHub?.login ? gitHub?.login : ""}</h1>
          </div>

          <div className="w-full flex md:mt-5">
            <div className="w-full flex flex-row items-center justify-center">
              <BookMarked className="text-zinc-200 text-sm" size={15} />
              <p className="text-sm ml-2">{gitHub.public_repos}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-center">
              <Users className="text-zinc-200 text-sm" size={15} />
              <p className="text-sm ml-2">{gitHub.followers}</p>
            </div>
          </div>
        </div>
      </div>

      <AppListUser />

      <div className="mt-5 w-full hidden md:grid grid-cols-2 items-center justify-center gap-2">
        <div className="flex flex-row bg-blue-600 items-center justify-center rounded-full p-2">
          <p>TypeScript</p>
        </div>
        <div className="flex flex-row bg-yellow-600 items-center justify-center rounded-full p-2">
          <p>JavaScript</p>
        </div>
        <div className="flex flex-row bg-stone-900 items-center justify-center rounded-full p-2">
          <p>Java</p>
        </div>
        <div className="flex flex-row bg-violet-700 items-center justify-center rounded-full p-2">
          <p>indefinido</p>
        </div>
      </div>
    </div>
  );
}
