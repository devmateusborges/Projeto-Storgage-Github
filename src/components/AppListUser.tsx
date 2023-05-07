import { AppUser, addUserSelect, removeProfileUseres } from "@/store/utilStore";
import { ChevronRight, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

export function AppListUser() {
  const [userList, setUserList] = useState<AppUser[]>([]);

  const { getLocalStorage } = useLocalStorage();
  const select = useSelector((state: RootState) => state.util.perfil);
  const dispatch = useDispatch();
  //=============================

  useEffect(() => {
    handler();
  }, [select]);

  useEffect(() => {
    handler();
  }, []);

  //=============================
  const handler = async () => {
    const userList: any[] = await getLocalStorage("profile", "get");
    setUserList(userList);
  };
  //=============================
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-2 ">
      <div className="w-full flex items-center justify-center ">
        <h1>Perfil Salvos</h1>
      </div>
      {userList?.map((userList, index) => (
        <div
          key={userList.id + index}
          className="w-full flex flex-row gap-x-3   bg-zinc-400/20 p-2 cursor-pointer hover:bg-zinc-600 rounded-lg"
        >
          <h1>{userList.name}</h1>
          <div>
            <button
              className="bg-zinc-500 p-2 rounded-full"
              onClick={() => {
                dispatch(removeProfileUseres(userList.id)), handler();
              }}
            >
              <Trash className="text-sm hover:text-green-500" size={15} />
            </button>
            <button
              className="ml-2 bg-zinc-500 p-2 rounded-full"
              onClick={() => dispatch(addUserSelect(userList.name))}
            >
              <ChevronRight
                className="text-sm hover:text-green-500"
                size={15}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
