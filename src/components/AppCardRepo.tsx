"use client";
import { GithubService } from "@/service/service";
import { RootState } from "@/store";
import { dateFormat } from "@/utils/funcUtils";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "./hooks/useLocalStorage";

interface AppCardRepo {
  name: string;
}

export function AppCardRepo() {
  const [gitHub, setGitHub] = useState<any[]>([]);
  const select = useSelector((state: RootState) => state.util.userSelect);
  const Loading = useSelector((state: RootState) => state.util.loading);
  const { getLocalStorage } = useLocalStorage();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //=====================================
  useEffect(() => {
    handlerApi();
  }, [select]);
  //=====================================
  useEffect(() => {
    handlerApi();
  }, []);

  //=====================================

  const handlerApi = async () => {
    const userName: string = await getLocalStorage("selectUser", "get_string");
    const res = await GithubService.Repo(userName);
    setGitHub(res);
  };

  //=====================================

  const handlerFilter = async (filter: string) => {
    const filteArr = await gitHub.filter((github) =>
      github.name.toLowerCase().includes(filter.toLowerCase())
    );
    if (filteArr.length > 0 && filter != "") {
      setGitHub(filteArr);
    } else if (filter == "") {
      handlerApi();
    } else {
      handlerApi();
    }
  };

  //=====================================
  return (
    <div className="w-full">
      <div className="w-full flex m-2 items-center justify-center">
        <input
          className="w-[50%] rounded-lg p-2 outline-none bg-zinc-600  border focus:border-green-500"
          type="text"
          onChange={(e) => handlerFilter(e.target.value)}
          placeholder="Pesquisar"
        />
      </div>
      <div className="w-full   grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 items-center ">
        {gitHub.map((project, index) => (
          <Link
            key={project.name + "3251" + index}
            href={`https://github.com/${select}/${project.name}`}
            className={`w-full h-[100%] flex flex-col items-center justify-center border cursor-pointer gap-y-2 ${
              (project.language == "TypeScript" &&
                "border-blue-800 hover:bg-blue-800/40") ||
              (project.language == "JavaScript" &&
                "border-yellow-600 hover:bg-yellow-600/40 ") ||
              (project.language == "PHP" &&
                "border-blue-900 hover:bg-blue-900/40") ||
              (project.language == "Java" &&
                "border-stone-900 hover:bg-stone-900/40 ") ||
              (!project.language && "border-violet-700 hover:bg-violet-700/40")
            } rounded-xl p-3`}
          >
            <div className="w-full flex items-center justify-center">
              <div
                className={`w-[35%] flex items-center justify-center ${
                  (project.language == "TypeScript" && "bg-blue-800") ||
                  (project.language == "JavaScript" && "bg-yellow-600") ||
                  (project.language == "PHP" && "bg-blue-900") ||
                  (project.language == "Java" && "bg-stone-900") ||
                  (!project.language && "bg-violet-700/40")
                } rounded-full p-3`}
              >
                <p className="font-extrabold text-2xl">
                  {project.language ? project.language : "Indefinido"}
                </p>
              </div>
            </div>

            <div className="w-full bg-zinc-400/20 p-2 rounded-lg">
              <h1 className="font-bold text-zinc-200 text-lg">
                {project.name}
              </h1>
            </div>

            <div className="w-full flex flex-row items-center justify-center gap-x-1">
              <p className="bg-zinc-400/20 p-2 rounded-lg">
                📅{dateFormat(project.updated_at)}
              </p>
              <p className="bg-green-400/20 p-2 rounded-lg">
                {project.private ? "Privado" : "Publico"}
              </p>
            </div>
          </Link>
        ))}

        {Loading &&
          arr.map((item, index) => (
            <div
              key={item + "3251" + index}
              className={`w-full h-[100%] flex flex-col items-center justify-center border cursor-pointer gap-y-2 rounded-xl p-3`}
            >
              <div className="w-full flex items-center justify-center">
                <div
                  className={`w-[35%] flex items-center justify-center  rounded-full p-3`}
                >
                  <p className="font-extrabold text-2xl bg-stone-400/20 h-5 animate-pulse p-2 rounded-lg">
                    Loading
                  </p>
                </div>
              </div>

              <div className="w-full bg-zinc-400/20 p-2 rounded-lg animate-pulse">
                <h1 className="font-bold text-zinc-200 text-lg bg-stone-400/20 h-5 animate-pulse"></h1>
              </div>

              <div className="w-full flex flex-row items-center justify-center gap-x-1">
                <p className=" w-[40%] p-3 rounded-lg bg-stone-400/20 h-5 animate-pulse"></p>
                <p className="w-[15%] p-3 rounded-lg bg-stone-400/20 h-5 animate-pulse"></p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
